import { useProjects } from '@/hooks/useProjects';

export const ProjectList = () => {
    const { projects, loading } = useProjects();
    return (
        <div className='w-[80%]'>

            <div className='py-4'>
                <h3 className='text-left'>
                    Lista de Proyectos
                </h3>
            </div>

            <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200">
                {!loading ?
                    <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                        {projects.length > 0 ? projects.map((item) => (
                            <div
                                key={item._id}
                                role="button"
                                className="text-slate-800 flex w-full items-center rounded-md p-2 pl-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                            >
                                {item.name}
                                <div className="ml-auto grid place-items-center justify-self-end">
                                    <button className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                        x
                                    </button>
                                </div>
                            </div>
                        ))
                            :
                            <div>
                                <p className='font-bold text-[36px] text-center'>No se obtuvieron resultados</p>
                            </div>
                        }
                    </nav>
                    :
                    <div className='flex justify-center'>
                        <span className='text-white text-[34px] font-semibold'>Cargando proyectos...</span>
                    </div>
                }
            </div>

        </div>
    )
}
