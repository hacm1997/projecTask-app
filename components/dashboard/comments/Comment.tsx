import { CommentModel } from '@/components/utils/types';
import { createComment, getComments } from '@/services/comment/comment.service';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

interface Props {
    taskId: string;
}
export const Comment = ({ taskId }: Props) => {
    const [comments, setComments] = useState<CommentModel[]>([])
    const [isComment, setIsComment] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (taskId !== '') {
            getComments(taskId).then((response) => {
                setComments(response)
            }).catch((error) => {
                console.error(error)
                setComments([])
            })
        }
    }, [taskId, refresh])

    const hanlderContent = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(ev.target.value)
    }

    const saveComment = () => {
        setLoading(true)
        if (content !== '') {
            createComment(taskId, content).then(() => {
                setRefresh(!refresh)
                setLoading(false)
                setContent("")
                setIsComment(!isComment)
            }).catch((err) => {
                console.error(err)
                toast.error('Error al crear el comentario, intente mas tarde!')
                setLoading(false)
            })
        } else {
            toast.warning('Primero debe ingresar un comentario!')
            setLoading(false)
        }
    }

    return (
        <>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4 items-center justify-between'>
                    <h4 className='font-semibold text-[#14171F] text-[16px]'>
                        Comentarios
                    </h4>
                    {!isComment ?
                        <button className='bg-[#754db4] p-1 rounded-[8px]' onClick={() => setIsComment(!isComment)}>
                            Nuevo comentario
                        </button>
                        :
                        <div className='flex gap-2'>
                            <button className='bg-transparent border-[1px] px-2 text-[#14171F] border-[#14171F] p-1 rounded-[8px]' onClick={() => setIsComment(!isComment)}>
                                Cancelar
                            </button>
                            <button className='bg-[#754db4] p-1 rounded-[8px]' onClick={saveComment} disabled={loading}>
                                Guardar comentario
                            </button>
                        </div>
                    }
                </div>
                {isComment &&
                    <div className='w-full'>
                        <textarea placeholder='Escribir comentario...' onChange={hanlderContent}
                            className='bg-transparent border-[1px] border-[#14171F] text-[#14171F] p-2 rounded-[8px] w-full min-h-[100px]'
                        />
                    </div>
                }

                <div className='max-h-[470px] overflow-y-auto flex flex-col gap-4'>
                    {Array.isArray(comments) && comments.length > 0 && comments.map((item) => (
                        <div key={item._id} className='w-full flex justify-between items-center bg-slate-100 p-4 border-[1px] border-[#754db4] rounded-md'>
                            <div className='flex flex-col gap-1 justify-between w-full'>
                                <div className='flex justify-between'>
                                    <span className='font-bold text-[#754db4] text-[14px]'>
                                        {item.user_name}
                                    </span>
                                    <span className='text-[#14171F] text-[14px]'>
                                        {format(new Date(item.createdAt), 'dd MMM yyyy HH:mm:ss')}
                                    </span>
                                </div>
                                <p className='text-[#14171F]'>
                                    {item.content}
                                </p>
                            </div>

                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}
