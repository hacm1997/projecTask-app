import { useState, useEffect, useCallback } from 'react';
import { getProjectsById } from "@/services/project/project.service";
import { ProjectModel } from "@/utils/types";

export const useProjectById = (id: string | undefined) => {
    const [project, setProject] = useState<ProjectModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // get project function
    const fetchProject = useCallback(async () => {
        if (id) {
            setLoading(true);
            setError(null);
            try {
                const response = await getProjectsById(id);
                setProject(response);
            } catch (err) {
                setError('Error to get project');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    }, [id]);

    // get project when id changed
    useEffect(() => {
        fetchProject();
    }, [id, fetchProject]);

    // Refrest data function
    const refresh = () => {
        fetchProject();
    };

    return { project, loading, error, refresh };
};
