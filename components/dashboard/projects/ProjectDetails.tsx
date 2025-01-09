import { ProjectModel } from '@/utils/types'
import React from 'react'
import { format } from "date-fns";
import { TaskList } from '../taks/TaskList';
import { Collaborators } from './Collaborators';

interface Props {
    project: ProjectModel
}
export const ProjectDetails = ({ project }: Props) => {
    return (
        <div className='flex flex-wrap justify-center gap-5'>
            <div className='lg:w-[20%] bg-[#14171F] rounded-lg p-5 flex flex-col gap-2'>
                <h1 className='text-3xl font-bold'>{project.name}</h1>
                <p>{project.description}</p>
                <p>Total de tarea: {project.tasks.length}</p>
                <p>Total de colaboradores: {project.collaborators.length}</p>
                <p>Creado en: {format(new Date(project.createdAt), "MMM dd yyyy")}</p>

                <hr className='mt-4' />
                <div className='pt-4'>
                    <Collaborators project={project} colab={project.collaborators} />
                </div>
            </div>
            <div className='lg:w-[70%]'>
                <TaskList projectId={project._id} />
            </div>
        </div>
    )
}
