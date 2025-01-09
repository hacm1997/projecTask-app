import { ProjectModal } from "@/components/utils/ProjectModal";
import { useAuth } from "@/contexts/authContext";
import { useProjects } from "@/hooks/useProjects";
import { deleteProject } from "@/services/project/project.service";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const ProjectList = () => {
  const { projects, loading, setRefresh } = useProjects();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false)
  const handleDeleteProject = (id: string) => {
    deleteProject(id).then(() => {
      toast.success('Eliminado con exito')
      setRefresh()
    }).catch((err) => {
      console.error(err)
      toast.error('algo salio mal, intenta de nuevo')
    });
  }
  return (
    <>
      <div className="px-0 md:px-0 w-[90%] md:w-[80%]">
        <div className="py-4 flex gap-4 items-center justify-between">
          <h3 className="text-left text-[20px] font-semibold">
            Lista de Proyectos
          </h3>
          <button className="py-2 px-4 rounded-lg bg-[#9764E9] hover:bg-[#754db4]" onClick={() => setShowModal(true)}>
            Crear nuevo proyecto
          </button>
        </div>

        <div className="relative flex flex-col rounded-lg bg-[#14171F] shadow-sm border border-[#9233E9]">
          {!loading ? (
            <nav className="flex min-w-[240px] flex-col gap-4 p-1.5">
              {projects.length > 0 ? (
                projects.map((item) => (
                  <Link
                    key={item._id}
                    role="button"
                    href={`/dashboard/project/${item._id}`}
                    title={item.name}
                    className="text-white flex flex-col md:flex-row gap-2 md:gap-4 w-full items-center rounded-md py-2 md:p-2 md:pl-3 transition-all hover:bg-[#4C4E53]"
                  >
                    <div className="h-full p-4 rounded-full bg-[#9233E9]">
                      <span className="font-bold text-[18px]">
                        {item.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <div className="flex gap-4 items-center justify-center md:justify-normal">
                        <p className="font-bold text-[18px]">{item.name}</p>
                      </div>
                      <div className="flex gap-2 items-center text-[14px] justify-center md:justify-normal">
                        <p>Colaboradores: {item.collaborators.length}</p> -
                        <p>Tareas: {item.tasks.length}</p>
                      </div>
                      <p className="text-[12px]">
                        Creado: {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-[14px] md:pl-32 text-center">
                      <span>{item.description}</span>
                    </div>
                    <div className="md:ml-auto md:grid md:place-items-center md:justify-center md:justify-self-end">
                      {user?.role === "admin" && (
                        <button
                          className="rounded-md border border-transparent p-2.5 text-center font-bold text-[20px] transition-all text-white hover:bg-[#9233E9]  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => handleDeleteProject(item._id)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  </Link>
                ))
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
                Cargando proyectos...
              </span>
            </div>
          )}
        </div>
      </div>
      <ProjectModal showModal={showModal} closeModal={() => setShowModal(!showModal)} />
    </>
  );
};
