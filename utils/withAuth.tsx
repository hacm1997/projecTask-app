"use client";

import React, { JSX, useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export function withAuth<T extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<T>
) {
    return function AuthenticatedComponent(props: T) {
        const { user, isLoading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!isLoading && !user) {
                router.push("/"); // Redirige si no está autenticado
            }
        }, [user, isLoading, router]);

        if (isLoading || !user) {
            return <div>Loading...</div>; // Muestra un estado de carga
        }

        return <Component {...props} />;
    };
}
