import {useEffect, useState} from "react";

const useDetectClose = (ref, initialState) => {
    const [isOpen, setIsOpen] = useState(initialState);
    console.log(isOpen);

    useEffect(() => {
        const pageClickEvent = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        };
    }, [isOpen, ref]);

    return [isOpen, setIsOpen];
}

export default useDetectClose;