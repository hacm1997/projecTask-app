import { CollaboratorType } from '@/components/utils/types'
import UserSelector from '@/components/utils/UseSelector'
import { useAuth } from '@/contexts/authContext'
import { useSearchUser } from '@/hooks/useSearchUser'
import { useTasksProject } from '@/hooks/useTasksProject'
import { addColab, removeColab } from '@/services/project/project.service'
import { ProjectModel } from '@/utils/types'
import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { toast } from 'sonner'

interface Props {
    project: ProjectModel
    colab: CollaboratorType[]
}
export const Collaborators = ({ project, colab }: Props) => {
    const { refresh } = useTasksProject(project._id)
    const { searchUser, user, setUsers, prevValue, setPrevValue, userSelected, setUserSelected, userIDSelected, setUserIDSelected } = useSearchUser()
    const { user: authenticatedUser } = useAuth()

    const removeCollaborator = (userId: string) => {
        const isConfirmed = window.confirm('¿Estás seguro de que deseas remover el usuario?');
        if (isConfirmed) {
            removeColab(project._id, userId).then(() => {
                toast.success('Colaborador eliminado con exito')
                window.location.reload()
            }).catch(() => {
                toast.error('Error al eliminar el colaborador, intentalo mas tarde')
                console.error('Error removing collaborator')
            }).finally(() => {
                refresh()
            })
        }
    }
    const handlerSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setPrevValue(value)
        if (value.length > 3) {
            searchUser(value)
        }
        if (value.length === 0) {
            setUsers([])
            setPrevValue('')
        }
    }
    const handlerSelectUser = (userId: string, name: string) => {
        setUserIDSelected(userId)
        setUserSelected(name)
        setUsers([])
    }
    const addCollaborator = async () => {
        const newCollaborator: string[] = [userIDSelected]
        const colabs = {
            projectId: project._id,
            collaboratorId: newCollaborator
        }
        await addColab(colabs).then(() => {
            refresh()
            toast.success('Colaborador agregado con exito')
            setUserSelected("")
            setUsers([])
            window.location.reload()
        }).catch(() => {
            toast.error('Error al agregar el colaborador, intentalo mas tarde')
            console.error('Error adding collaborator')
        })
    }
    return (
        <div className='flex flex-col gap-1'>
            <div className='flex flex-col'>
                <h4 className='font-semibold text-[18px] pb-2'>Agregar colaborador</h4>
                <div className='flex gap-2 pb-4'>
                    <UserSelector
                        handlerSearchUser={handlerSearchUser}
                        handlerSelectUser={handlerSelectUser}
                        prevValue={prevValue}
                        setPrevValue={setPrevValue}
                        setUserSelected={setUserSelected}
                        user={user}
                        userSelected={userSelected}
                    />
                    {userSelected !== '' &&
                        <button type='button' className="py-1 px-2 rounded-lg bg-[#9764E9] hover:bg-[#754db4]" onClick={addCollaborator}>
                            Agregar
                        </button>
                    }
                </div>
            </div>

            <hr />
            <h4 className='font-semibold text-[18px] pt-2'>Lista de colaboradores</h4>

            <ul className='flex flex-col gap-1 pl-2 pt-3 max-h-full overflow-y-auto'>
                {colab.map((collaborator) => (
                    <li key={collaborator._id} className='flex items-center gap-2'>
                        {collaborator.name}
                        {authenticatedUser?.role === "admin" &&
                            <IoIosCloseCircle className="cursor-pointer"
                                size={18} color="red" title='Remover del proyecto'
                                onClick={() => removeCollaborator(collaborator._id)}
                            />
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}
