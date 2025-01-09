import { useState, useEffect, useCallback } from 'react';
import { TaskModel } from '@/components/utils/types';
import { getTaskByProjectId } from '@/services/task/task.service';

export const useTasksProject = (id: string | undefined) => {
    const [tasks, setTasks] = useState<TaskModel[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTask, setSearchTask] = useState('')
    const [update, setUpdate] = useState(false)

    // get tasks function
    const fetchTasks = useCallback(async () => {
        if (id) {
            setLoading(true);
            setError(null);
            try {
                const response = await getTaskByProjectId(id, searchTask);
                setTasks(response);
            } catch (err) {
                setError('Error to get task');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    }, [id, searchTask]);

    // get tasks when id changed
    useEffect(() => {
        fetchTasks();
    }, [id, fetchTasks]);

    // Refrest data function
    const refresh = () => {
        fetchTasks();
    };
    return { tasks, loading, error, refresh, searchTask, setSearchTask, update, setUpdate };
};
