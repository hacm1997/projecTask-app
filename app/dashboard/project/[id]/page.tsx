'use client'

import { ProjectDetails } from "@/components/dashboard/projects/ProjectDetails";
import { MainLayout } from "@/components/layout/MainLayout";
import { useProjectById } from "@/hooks/useProjectById";
import { withAuth } from "@/utils/withAuth";
import { usePathname } from "next/navigation";

function Home() {
    const pathname = usePathname()
    const id = pathname ? pathname.split('/').pop() : '';
    const { project } = useProjectById(id)

    return (
        <MainLayout>
            {project &&
                <div className="px-0 lg:px-28 pt-40">
                    <ProjectDetails project={project} />
                </div>
            }
        </MainLayout>
    );
}

export default withAuth(Home);