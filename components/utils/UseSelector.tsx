import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface User {
    _id: string;
    name: string;
}

interface UserSelectorProps {
    userSelected: string;
    setUserSelected: (value: string) => void;
    prevValue: string;
    setPrevValue: (value: string) => void;
    user: User[];
    handlerSearchUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlerSelectUser: (id: string, name: string) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({
    userSelected,
    setUserSelected,
    prevValue,
    setPrevValue,
    user,
    handlerSearchUser,
    handlerSelectUser,
}) => {
    return (
        <div className="w-full">
            {userSelected !== '' ? (
                <div className="flex gap-2 items-center pl-2">
                    <span className="font-bold text-[16px] text-black">{userSelected}</span>
                    <IoIosCloseCircle
                        className="cursor-pointer"
                        size={18}
                        color="red"
                        onClick={() => {
                            setUserSelected("");
                            setPrevValue("");
                        }}
                    />
                </div>
            ) : (
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    onChange={handlerSearchUser}
                    className="p-2 border-[1px] border-gray-500 rounded-lg text-black w-full"
                />
            )}

            {user.length > 0 && (
                <ul className="bg-[#14171F] bottom-0 p-2 rounded-[4px]">
                    {user.map((userItem, index) => (
                        <li
                            key={index}
                            className="cursor-pointer"
                            onClick={() => handlerSelectUser(userItem._id, userItem.name)}
                        >
                            {userItem.name}
                        </li>
                    ))}
                </ul>
            )}

            {prevValue.length > 0 && user.length === 0 && (
                <ul className="bg-[#14171F] bottom-0 p-2 rounded-[4px]">
                    <li className="text-[12px]">Sin resultados</li>
                </ul>
            )}
        </div>
    );
};

export default UserSelector;
