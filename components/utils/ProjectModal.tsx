import React, { useState } from "react";
import { ProjectModalProps } from "./types";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";
import { createProject } from "@/services/project/project.service";
import { Spinner } from "./Spinner";
import { useProjects } from "@/hooks/useProjects";

export const ProjectModal = ({ showModal, closeModal }: ProjectModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setRefresh } = useProjects()
  const [dataform, setDataForm] = useState({
    name: '', description: ''
  })

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

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    createProject(dataform).then(() => {
      toast.success('Proyecto creado con exito')
      closeModal()
      setDataForm({
        name: '',
        description: ''
      })
    }).catch(error => {
      console.error(error)
      toast.error('Error la crear el proyecto, intente mas tarde')
    }).finally(() => {
      setIsLoading(false)
      setRefresh()
      window.location.reload()
    })
  }
  return (
    <div
      className={`fixed ${showModal ? "block" : "hidden"
        } z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 `}
    >
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
        <div className="flex justify-end p-2">
          <button
            onClick={closeModal}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <IoMdClose size={25} />
          </button>
        </div>

        <div className="p-6 pt-0 text-center">
          <h3 className="text-xl font-normal text-black mb-6">
            Nuevo Proyecto
          </h3>
          <form className="mb-6" onSubmit={handleCreateProject}>
            <div className="flex flex-col gap-2 text-start">
              <label className="text-black">Nombre del proyecto</label>
              <input
                type="text"
                placeholder="project task app"
                name="name"
                value={dataform.name}
                onChange={handleDataForm}
                required
                className="p-2 border-[1px] border-gray-500 rounded-lg text-black"
              />
            </div>

            <div className="flex flex-col gap-2 text-start mt-4">
              <label className="text-black">Descripción del proyecto</label>
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
            {
              isLoading === true ?
                <div className="flex justify-center items-center mt-8">
                  <Spinner />
                </div>
                :
                <div className="flex gap-2 items-center justify-center mt-6">
                  <button className="text-white bg-[#9764E9] hover:bg-[#754db4] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                    Crear Proyecto
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
};
