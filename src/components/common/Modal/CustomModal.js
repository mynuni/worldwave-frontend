import React from 'react';
import {Box, Modal} from "@mui/material";
import COLOR from "../../../constants/color";

const CustomModal = ({open, handleClose, children}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            onClick={(e) => e.stopPropagation()}
            BackdropProps={{style: {backgroundColor: "rgba(0,0,0,0)"}}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                {children}
            </Box>
        </Modal>
    );
};

export default CustomModal;

export const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: COLOR.WHITE,
    borderRadius: 2,
    boxShadow: 12,
};