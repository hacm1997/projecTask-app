import Cookies from 'js-cookie'
// import Link from 'next/link'
import { useState } from 'react'

interface Props {
    name?: string
    email?: string
    role?: string
}
export const ProfileMenu = ({ name }: Props) => {
    const [openMenu, setOpenMenu] = useState(false)

    const logOut = () => {
        Cookies.remove('auth.user')
        Cookies.remove('auth_email')
        window.location.href = '/'
    }
    return (
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse relative md:w-[170px]">
            <button onClick={() => setOpenMenu(!openMenu)} type="button" data-dropdown-toggle="language-dropdown-menu" className="inline-flex gap-2 items-center w-full font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                <div className="bg-[#9233E9] rounded-full p-1">
                    <span className="font-bold text-white">{name && name.slice(0, 2)}</span>
                </div>
                <p>{name && name}</p>
            </button>
            {openMenu &&
                <div className="absolute top-10 right-0 z-50 w-full text-center my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700" id="language-dropdown-menu">
                    <ul className="py-2 font-medium" role="none">
                        {/* <li>
                            <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                <div className="inline-flex items-center text-[14px]">
                                    <span className='pl-1 font-bold'>{role && role === 'admin' ? 'Administrator' : 'Team Member'}</span>
                                </div>
                            </Link>
                        </li> */}
                        {/* <li>
                            <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                <div className="inline-flex items-center text-[14px]">
                                    <span className='pl-1 font-bold'>Perfil</span>
                                </div>
                            </Link>
                        </li> */}
                        <li>
                            <a onClick={logOut} title='Login Out' className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                <div className="inline-flex items-center text-[14px]">
                                    <span className='pl-1 font-bold'>Cerrar Sesión</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}
