import React, {useCallback, useState} from 'react';
import CustomModal from "../components/common/Modal/CustomModal";

const useModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(() => true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(() => false);
    }, []);

    return {
        Modal: isOpen ? ({children}) => (<CustomModal open={open} handleClose={close}>{children}</CustomModal>) : () => null,
        open,
        close,
        isOpen,
    };
};

export default useModal;