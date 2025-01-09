import { TaskFormModel } from '@/components/utils/types'
import { getUserId } from '@/services/auth/auth.service'
import { getTaskById } from '@/services/task/task.service'
import { useEffect, useState } from 'react'

export const useTask = (taskId: string) => {
    // const [task, setTask] = useState<TaskModel>()
    const [dataform, setDataForm] = useState<TaskFormModel>({
        title: '', description: '', assignedTo: '', dueDate: '',
        project: '', status: 'in-progress'
    })
    const [asignedUserName, setAsignedUserName] = useState('')

    const searchTask = (id: string) => {
        if (id) {
            getTaskById(id).then((taskItem) => {
                setDataForm(taskItem)
            }).catch((error) => {
                console.error(error)
            })
        }
    }

    useEffect(() => {
        if (dataform.assignedTo) {
            getUserId(dataform.assignedTo).then((user) => {
                setAsignedUserName(user.name)
            }).catch((error) => {
                console.error(error)
                setAsignedUserName('')
            })
        }
    }, [dataform.assignedTo])

    useEffect(() => {
        searchTask(taskId)
    }, [taskId])

    return { dataform, setDataForm, asignedUserName };
}
