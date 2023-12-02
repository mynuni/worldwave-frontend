import React, {useEffect} from 'react';
import {Box, Modal} from "@mui/material";
import useMemberDetail from "../../hooks/query/useMemberDetail";
import MemberCard from "../People/MemberCard";
import COLOR from "../../constants/color";

const MemberDetailModal = ({memberId, open, handleClose}) => {

    const {data, fetchMemberDetail, isLoading, isError} = useMemberDetail(memberId);

    useEffect(() => {
        if (open) {
            fetchMemberDetail();
        }
    }, [open]);

    return (
        <Modal
            className={"member-info-modal"}
            open={open}
            onClick={(e) => e.stopPropagation()}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                {data &&
                    <MemberCard memberId={data.id}
                                nickname={data.nickname}
                                country={data.country}
                                gender={data.gender}
                                ageRange={data.ageRange}
                                followed={data.followed}
                                profileImage={data.profileImage}
                                successCallback={fetchMemberDetail}/>}
            </Box>
        </Modal>
    );
};

export default MemberDetailModal;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: COLOR.WHITE,
    border: '1px solid COLOR.GRAY_200',
    borderRadius: "6px",
    boxShadow: 24,
    p: 2,
};