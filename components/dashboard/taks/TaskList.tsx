import { TaskDetailModal } from '@/components/utils/TaskDetailModal';
import { useAuth } from '@/contexts/authContext';
import { useTasksProject } from '@/hooks/useTasksProject';
import { removeTask } from '@/services/task/task.service';
import { format } from 'date-fns';
import React, { useState } from 'react'
import { IoAlertCircle } from "react-icons/io5";
import { toast } from 'sonner';

interface Props {
    projectId: string;
}
export const TaskList = ({ projectId }: Props) => {
    const { tasks, loading, refresh, setSearchTask } = useTasksProject(projectId);
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false)
    const [taskId, setTaskId] = useState('')

    const handleDeleteTask = (taskId: string) => {
        const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
        if (isConfirmed) {
            removeTask(projectId, taskId)
                .then(() => {
                    toast.success('Tarea eliminada con éxito');
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Algo salió mal, intenta de nuevo');
                })
                .finally(() => {
                    refresh();
                });
        }
    };

    const openModal = (taskId: string) => {
        setTaskId(taskId)
        setShowModal(!showModal)
    }

    const handlerSearchTask = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target
        if (value.length > 3) {
            setSearchTask(value)
        }
        if (value.length === 0) {
            setSearchTask('')
        }
    }
    return (
        <>
            <div className="px-0 md:px-0 w-full">
                <div className="pb-4 flex gap-4 items-center justify-between">
                    <h3 className="text-left text-[20px] font-semibold">
                        Lista de Tareas
                    </h3>
                    <input type="text" placeholder='Buscar tarea...' onChange={handlerSearchTask}
                        className='bg-transparent border-[1px] border-[#9764E9] rounded-[8px] p-2'
                    />
                    <button className="py-2 px-4 rounded-lg bg-[#9764E9] hover:bg-[#754db4]" onClick={() => setShowModal(true)}>
                        Nueva tarea
                    </button>
                </div>

                <div className="relative flex flex-col rounded-lg bg-[#14171F] p-4">
                    {!loading ? (
                        <nav className="flex min-w-[240px] flex-col gap-4 p-1.5 h-[65vh] overflow-y-auto">
                            {tasks?.length > 0 ? (
                                tasks.map((item) => {
                                    const dueDate = new Date(item.dueDate);
                                    const today = new Date();
                                    const isOverdue = dueDate < today;
                                    return (
                                        <div
                                            key={item._id}
                                            role="button"
                                            onClick={() => openModal(item._id)}
                                            title={item.title}
                                            className="text-white flex flex-col md:flex-row gap-2 md:gap-4 w-full items-center rounded-md py-2 md:p-2 md:pl-3 transition-all hover:bg-[#4C4E53] shadow-sm border border-[#9233E9]"
                                        >
                                            <div className="flex flex-col gap-[2px] w-[250px] pl-2">
                                                <div className="flex gap-4 items-center justify-center md:justify-normal">
                                                    <p className="font-bold text-[18px]">{item.title}</p>
                                                </div>
                                                {/* <div className="flex gap-2 items-center text-[14px] justify-center md:justify-normal">
                                                    <p>Colaboradores: {item?.collaborators?.length}</p>
                                                </div> */}
                                                <p className="text-[12px]">
                                                    Creado: {new Date(item.createdAt).toLocaleString()}
                                                </p>
                                                <p className="text-[14px]">
                                                    Estado: <span className={`font-bold ${item.status === 'in-progress' ? 'text-yellow-400' : 'text-green-600'}`}>{item.status}</span>
                                                </p>
                                            </div>
                                            {/* <div className="text-[14px] md:pl-32 text-center">
                                            <span>{item.description}</span>
                                        </div> */}
                                            <div className="text-[16px] md:pl-32 text-center font-semibold">
                                                <p>
                                                    Fecha de vencimiento <br />
                                                    {format(new Date(item.dueDate), 'dd MMM yyyy')}<br />
                                                    <span className='flex justify-center'>
                                                        {isOverdue &&
                                                            <IoAlertCircle color='red' size={24} />
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="md:ml-auto md:grid md:place-items-center md:justify-center md:justify-self-end">
                                                {user?.role === "admin" && (
                                                    <button
                                                        className="rounded-md border border-transparent p-2.5 text-center font-bold text-[20px] transition-all text-white hover:bg-[#9233E9]  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                        type="button"
                                                        onClick={() => handleDeleteTask(item._id)}
                                                    >
                                                        x
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="flex justify-center items-center">
                                    <p className="font-bold text-[36px] text-center">
                                        No se obtuvieron resultados
                                    </p>
                                </div>
                            )}
                        </nav>
                    ) : (
                        <div className="flex justify-center items-center">
                            <span className="text-white text-[34px] font-semibold">
                                Cargando Lista de Tareas...
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <TaskDetailModal showModal={showModal} closeModal={() => setShowModal(!showModal)} taskId={taskId} projectId={projectId} setTaskId={setTaskId} />
        </>
    );
}
