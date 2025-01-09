import { UserModel } from '@/components/utils/types'
import { getUsers } from '@/services/auth/auth.service'
import { useState } from 'react'

export const useSearchUser = () => {
    const [user, setUsers] = useState<UserModel[]>([])
    const [prevValue, setPrevValue] = useState('')
    const [userSelected, setUserSelected] = useState("")
    const [userIDSelected, setUserIDSelected] = useState("")

    const searchUser = async (name: string) => {
        getUsers(name).then((users) => {
            setUsers(users.data)
            setPrevValue("")
        }).catch((error) => {
            console.error(error)
            setPrevValue("")
        })
    }
    return { searchUser, user, setUsers, prevValue, setPrevValue, userSelected, setUserSelected, userIDSelected, setUserIDSelected };
}
