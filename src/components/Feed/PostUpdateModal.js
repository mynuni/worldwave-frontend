import React, {useEffect, useRef, useState} from 'react';
import {Box, Modal, TextField} from "@mui/material";
import Button from "../common/Button/Button";
import COLOR from "../../constants/color";
import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: `1px solid ${COLOR.GRAY_100}`,
    backgroundColor: COLOR.WHITE,
    boxShadow: 24,
    p: 2,
};

const PostUpdateModal = ({postId, content, attachedFiles, editModalOpen, handleClose}) => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const fileInputRef = useRef();
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    const [newFiles, setNewFiles] = useState([]);
    const [newFileUrls, setNewFileUrls] = useState([]);
    const [oldFileUrls, setOldFileUrls] = useState([]);
    const [oldFileDeleteList, setOldFileDeleteList] = useState([]);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [oldFiles, setOldFiles] = useState(attachedFiles);

    useEffect(() => {
        if (attachedFiles && Array.isArray(attachedFiles)) {
            const existingFilePreviews = attachedFiles.map(file => process.env.REACT_APP_STATIC_IMAGES_BASE_URL + file.storedFileName);
            setOldFileUrls(existingFilePreviews);
        }
    }, [attachedFiles]);

    useEffect(() => {
        generatePreviewImages(newFiles);
    }, []);

    const handleFileChange = (e) => {
        const files = e.target.files;
        const totalFiles = files.length + oldFiles.length + newFileUrls.length;
        if (totalFiles > 3) {
            alert("사진 첨부는 최대 3장까지 가능합니다.");
            return;
        }

        // 확장자가 allowedFileTypes에 포함되어 있지 않으면 return
        const selectedFilesArray = Array.from(files);
        const validFiles = selectedFilesArray.filter(file => allowedFileTypes.includes(file.type));

        if (validFiles.length !== selectedFilesArray.length) {
            alert('jpg, jpeg, png 형식의 이미지만 첨부할 수 있습니다.');
            return;
        }

        setNewFiles((newFiles) => [...newFiles, ...Array.from(files)]);
        generatePreviewImages(files);
    };

    const generatePreviewImages = (files) => {
        const filesArray = Array.from(files);
        filesArray.forEach((file) => {
            setNewFileUrls((newFileUrls) => [...newFileUrls, URL.createObjectURL(file)]);
        });
    };

    const handleDeleteOldFile = (id) => {
        if (ensureMinimumImageCount()) {
            const updatedFiles = oldFiles.filter((file) => file.id !== id);
            setOldFiles(updatedFiles);
            setOldFileDeleteList((oldFileDeleteList) => [...oldFileDeleteList, id]);
        }
    };

    const handleDeleteNewFile = (id) => {
        if (ensureMinimumImageCount()) {
            setNewFiles((newFiles) => newFiles.filter((_, index) => index !== id));
            setNewFileUrls((newFileUrls) => newFileUrls.filter((_, index) => index !== id));
        }
    };

    const ensureMinimumImageCount = () => {
        if ((newFileUrls.length + oldFileUrls.length) <= 1) {
            alert("최소 하나의 사진이 필요합니다.");
            return false;
        }
        return true;
    }

    const handleChangeContent = (e) => {
        if (updatedContent.length > 100) {
            alert("100자 이내로 작성해주세요.");
            setUpdatedContent(updatedContent.slice(0, -1));
            return;
        }
        setUpdatedContent(e.target.value);
    }

    const handleUpdateSubmit = async () => {
        const formData = new FormData();
        formData.append("content", updatedContent);
        newFiles.forEach(file => {
            formData.append("newFiles", file);
        });
        oldFileDeleteList.forEach(id => {
            formData.append("deleteFileIds", id);
        });

        try {
            await axios.patch(process.env.REACT_APP_UPLOAD_FILE_BASE_URL + "/" + postId, formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                    "Content-Type": "multipart/form-data",
                }
            });
            alert("게시글이 수정되었습니다.");
            setNewFiles([]);
            setNewFileUrls([]);
            setOldFileUrls([]);
            setOldFileDeleteList([]);
            setUpdatedContent("");
            handleClose();
        } catch (error) {
            alert("파일 업로드에 실패했습니다.");
        }
    }

    return (
        <Modal
            open={editModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <StyledFileAttachButton onClick={() => fileInputRef.current.click()}>사진 추가</StyledFileAttachButton>
                <div>
                    <input
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        type="file"
                        multiple
                        style={{display: 'none'}}
                    />
                    <ImageSlider
                        images={imagePreviews}
                        oldImages={oldFileUrls}
                        attachFiles={oldFiles}
                        newImagePath={newFileUrls}
                        editMode={true}
                        handleDeleteOldFile={handleDeleteOldFile}
                        handleDeleteNewFile={handleDeleteNewFile}
                    />
                    <TextField defaultValue={content}
                               value={updatedContent}
                               onChange={handleChangeContent}
                               rows={4}
                               multiline
                               fullWidth/>
                    <span>{updatedContent.length}/100자</span>
                    <StyledEditButton onClick={handleUpdateSubmit}>수정하기</StyledEditButton>
                </div>
            </Box>
        </Modal>

    );
};

export default PostUpdateModal;

const StyledEditButton = styled(Button)`
    background-color: ${COLOR.BLUE};
    color: ${COLOR.WHITE};
    padding: 10px 20px;
    width: 100%;
    margin-top: 10px;

`;

const StyledFileAttachButton = styled(Button)`
    background-color: ${COLOR.BLUE};
    color: ${COLOR.WHITE};
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
`;