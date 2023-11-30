import { useEffect, useRef, useState } from 'react';

function useDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleOutsideClick = (e) => {
        const current = dropdownRef.current;
        if (isOpen && current && !current.contains(e.target)) setIsOpen(false);
    };

    return { isOpen, dropdownRef, toggleDropdown };
}

export default useDropdown;