import { useAuth } from "@/contexts/authContext";
import { getProjects, getProjectsByUserMember } from "@/services/project/project.service";
import { ProjectModel } from "@/utils/types";
import { useState, useEffect, useCallback } from "react";

export const useProjects = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState<ProjectModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(false);

    // Función para cargar proyectos
    const fetchProjects = useCallback(async () => {
        setLoading(true); // Asegúrate de manejar el estado de carga
        try {
            if (user && user.role === "admin") {
                const res = await getProjects();
                setProjects(res);
            } else if (user && user.role) {
                const collaborator = [user.id];
                const res = await getProjectsByUserMember(collaborator);
                setProjects(res);
            }
            setError(null);
        } catch (err) {
            console.error("Error fetching projects info:", err);
            setError("Failed to fetch projects. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Efecto para cargar proyectos al cambiar `user` o `refresh`
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects, refresh]);

    // Función para forzar una recarga
    const triggerRefresh = () => setRefresh((prev) => !prev);

    return { projects, loading, error, refresh, setRefresh: triggerRefresh };
};
