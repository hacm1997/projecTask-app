import React, { useState } from "react";
import { TaskDetailModalProps } from "./types";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { Spinner } from "./Spinner";
import { useSearchUser } from "@/hooks/useSearchUser";
import UserSelector from "./UseSelector";
import { useTask } from "@/hooks/useTask";
import { updateTask } from "@/services/task/task.service";
import { useTasksProject } from "@/hooks/useTasksProject";
import { Comment } from "../dashboard/comments/Comment";

export const TaskDetailModal = ({ showModal, closeModal, taskId, projectId, setTaskId }: TaskDetailModalProps) => {
    const [isLoading, setIsLoading] = useState(false)
    // const [dataform, setDataForm] = useState<TaskFormModel>({
    //     title: '', description: '', assignedTo: '', dueDate: '',
    //     project: '', status: 'in-progress'
    // })
    const { dataform, setDataForm, asignedUserName } = useTask(taskId)
    const { searchUser, user, setUsers, prevValue, setPrevValue, userSelected, setUserSelected } = useSearchUser()
    const { refresh } = useTasksProject(projectId);

    const handleDataForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDataForm({
            ...dataform,
            [name]: value
        })
    }

    const handleDataFormTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setDataForm({
            ...dataform,
            [name]: value
        })
    }

    const handlerSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setPrevValue(value)
        if (value.length > 3) {
            searchUser(value)
        }
    }

    const handlerSelectUser = (userId: string, name: string) => {
        setDataForm({
            ...dataform,
            assignedTo: userId
        })
        setUserSelected(name)
        setUsers([])
    }

    const clearData = () => {
        setDataForm({
            title: '', description: '', assignedTo: '', dueDate: '',
            project: '', status: 'in-progress'
        })
    }

    const handlerSelectStatus = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        if (ev.target.value === 'in-progress' || ev.target.value === 'completed') {
            setDataForm({
                ...dataform,
                status: ev.target.value
            })
        }
    }

    const handleUpdateTask = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        updateTask(taskId, dataform).then(() => {
            toast.success('Tarea actualizada con exito')
            closeModal()
            clearData()
            setPrevValue("")
            setUserSelected("")
            setTaskId("")
            setIsLoading(false)
            refresh()
            window.location.reload()
        }).catch((error) => {
            console.error(error)
            toast.error('Error al actualizar la tarea, intente mas tarde')
            setIsLoading(false)
        })
    }

    return (
        <div
            className={`fixed ${showModal ? "block" : "hidden"
                } z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 `}
        >
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md md:top-16 md:max-w-[70%] p-4">
                <div className="flex justify-end p-2">
                    <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                        <IoMdClose size={25} />
                    </button>

                </div>
                <h3 className="text-xl text-center font-bold text-black mb-6">
                    Administrar Tarea
                </h3>
                <div className="flex gap-5 ">
                    <div className="w-[55%]">

                        <div className="p-6 pt-0 text-center">

                            <form className="mb-6" onSubmit={handleUpdateTask}>
                                <div className="flex flex-col gap-2 text-start">
                                    <label className="text-black">Nombre de la tarea</label>
                                    <input
                                        type="text"
                                        placeholder="project task app"
                                        name="title"
                                        value={dataform.title}
                                        onChange={handleDataForm}
                                        required
                                        className="p-2 border-[1px] border-gray-500 rounded-lg text-black"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 text-start mt-4">
                                    <label className="text-black">Descripción de la tarea</label>
                                    <textarea
                                        placeholder="La mejor app para administrar tareas"
                                        name="description"
                                        value={dataform.description}
                                        onChange={handleDataFormTextArea}
                                        required
                                        className="p-2 border-[1px] border-gray-500 rounded-lg text-black"
                                        rows={4}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 text-start pt-3">
                                    <label className="text-black">Fecha de vencimiento</label>
                                    <input
                                        type="date"
                                        placeholder="Elija una fecha"
                                        name="dueDate"
                                        value={dataform.dueDate ? new Date(dataform.dueDate).toISOString().slice(0, 10) : ""}
                                        onChange={handleDataForm}
                                        required
                                        className="p-2 border-[1px] border-gray-500 rounded-lg text-black"
                                    />
                                </div>
                                <div className="flex flex-col gap-2 text-start pt-3">
                                    <label className="text-black">Usuario asignado: <span className="font-bold">{asignedUserName}</span></label>
                                    <label className="text-black">Cambiar usuario por:</label>
                                    <UserSelector
                                        handlerSearchUser={handlerSearchUser}
                                        handlerSelectUser={handlerSelectUser}
                                        prevValue={prevValue}
                                        setPrevValue={setPrevValue}
                                        setUserSelected={setUserSelected}
                                        user={user}
                                        userSelected={userSelected}
                                    />
                                </div>

                                <div className="flex items-center gap-4 text-black pt-4">
                                    <span className="font-bold text-[14px] text-black">Estado: </span>
                                    <div className="flex-col gap-2">
                                        <select name="status" onChange={handlerSelectStatus} value={dataform.status} className="p-1 border-[1px] border-black rounded-[8px]">
                                            <option value="in-progress">En progreso</option>
                                            <option value="completed">Completada</option>
                                        </select>
                                    </div>
                                </div>
                                {
                                    isLoading === true ?
                                        <div className="flex justify-center items-center mt-8">
                                            <Spinner />
                                        </div>
                                        :
                                        <div className="flex gap-2 items-center justify-center mt-6">
                                            <button className="text-white bg-[#9764E9] hover:bg-[#754db4] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                                Guardar cambios
                                            </button>
                                            <button
                                                type="button"
                                                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                                onClick={() => { closeModal(); clearData(); setUserSelected(""); setPrevValue("") }}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                }
                            </form>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-start pt-3 w-[40%]">
                        <Comment taskId={taskId} />
                    </div>
                </div>
            </div>
        </div>
    );
};
