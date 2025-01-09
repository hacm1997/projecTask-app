"use client"

import { ProjectList } from "@/components/dashboard/projects/ProjectList";
import { MainLayout } from "@/components/layout/MainLayout";
import { withAuth } from "@/utils/withAuth";

function Home() {
    return (
        <MainLayout>
            <div className="px-0 md:px-32 pt-28 flex flex-col items-center">
                <ProjectList />
            </div>
        </MainLayout>
    );
}
export default withAuth(Home);