import { useAuth } from "@/contexts/authContext";
import { getProjects, getProjectsByUserMember } from "@/services/project/project.service";
import { ProjectModel } from "@/utils/types";
import { useState, useEffect } from "react";

export const useProjects = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                if (user && user.role === 'admin') {
                    const res = await getProjects();
                    setProjects(res);
                } else {
                    if (user && user.role) {
                        const collaborator = [user?.id]
                        const res = await getProjectsByUserMember(collaborator);
                        setProjects(res);
                    }
                }
                setError(null);
            } catch (err) {
                console.error("Error fetching projects info:", err);
                setError("Failed to fetch projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user]);

    return { projects, loading, error };
};
