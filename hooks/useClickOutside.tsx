import { useState, useEffect, useRef } from 'react';

const useClickOutside = (initialState: boolean) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);  // Referencia para el botón de toggle

    const toggle = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Verificamos si el clic es fuera del menú y el botón de toggle
            if (
                ref.current &&
                !ref.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);  // Cerrar el menú si se hace clic fuera de ambos
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {
        isOpen,
        toggle,
        ref,
        buttonRef,  // Pasamos la referencia del botón
        setIsOpen,
    };
};

export default useClickOutside;