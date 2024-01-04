import React, {useEffect, useRef, useState} from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import Button from "../common/Button/Button";
import COLOR from "../../constants/color";
import Text from "../common/Text/Text";
import axios from "axios";

const PostEditor = ({open, onClose}) => {

        const [attachedFiles, setAttachedFiles] = useState([]);
        const [content, setContent] = useState("");
        const fileInputRef = useRef(null);
        const [previewImage, setPreviewImage] = useState(null);
        const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

        const handleFileChange = (e) => {
            const files = e.target.files;
            const selectedFilesArray = Array.from(files);

            const totalFiles = attachedFiles.length + selectedFilesArray.length;
            if (totalFiles <= 3) {
                // 허용된 파일 형식만 추가
                const validFiles = selectedFilesArray.filter(file => allowedFileTypes.includes(file.type));

                if (validFiles.length === selectedFilesArray.length) {
                    setAttachedFiles(attachedFiles.concat(validFiles));
                } else {
                    alert('jpg, jpeg, png 형식의 이미지만 첨부할 수 있습니다.');
                }
            } else {
                alert('사진 첨부는 최대 3장까지 가능합니다.');
            }
        };

        const removeFile = (index) => {
            const updatedFiles = [...attachedFiles];
            updatedFiles.splice(index, 1);
            setAttachedFiles(updatedFiles);

            if (index === 0) {
                setPreviewImage(null);
            }
        };

        const handlePreviewClick = (file) => {
            setPreviewImage(URL.createObjectURL(file));
        };

        useEffect(() => {
            if (attachedFiles.length > 0) {
                setPreviewImage(URL.createObjectURL(attachedFiles[0]));
            }
        }, [attachedFiles]);

        const handleSubmitPost = async () => {
            if (content.trim().length === 0) {
                alert("내용을 입력해주세요.");
                return;
            }

            if (attachedFiles.length === 0) {
                alert("사진을 첨부해주세요.");
                return;
            }

            const formData = new FormData();
            formData.append("content", content);
            attachedFiles.forEach(file => {
                formData.append("files", file);
            });

            try {
                const response = await axios.post(process.env.REACT_APP_UPLOAD_FILE_BASE_URL, formData, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                        "Content-Type": "multipart/form-data",
                    }
                });
                alert("게시글이 작성되었습니다.");
                setAttachedFiles([]);
                setContent("");
                setPreviewImage(null);
                onClose();
            } catch (error) {
                alert(error.response.data.message);
            }
        };

        return (
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditContainer>
                        <FileAttachButton onClick={() => fileInputRef.current.click()}>사진 첨부</FileAttachButton>
                        <input
                            type="file"
                            multiple
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                        <ImagesPreviewContainer>
                            {previewImage ? (
                                <ImagesPreviewWrap>
                                    <ImagesPreview src={previewImage} alt="NO IMAGE"/>
                                </ImagesPreviewWrap>) : (<Text bold>NO IMAGE</Text>
                            )}
                        </ImagesPreviewContainer>
                        <AttachedImagesContainer>
                            {attachedFiles.map((file, index) => (
                                <AttachedImagesWrap key={index}>
                                    <AttachedImage
                                        src={URL.createObjectURL(file)}
                                        alt="NO IMAGE"
                                        onClick={() => handlePreviewClick(file)}
                                    />
                                    <DeleteImageButton onClick={() => removeFile(index)}>삭제</DeleteImageButton>
                                </AttachedImagesWrap>
                            ))}
                        </AttachedImagesContainer>
                        <StyledTextArea onBlur={(e) => setContent(e.target.value)}
                                        placeholder="사진에 대한 소개나 하고 싶은 말을 입력해주세요."/>
                        <SubmitButton onClick={handleSubmitPost}>작성</SubmitButton>
                        <CancelButton onClick={() => {
                            onClose();
                            setPreviewImage(null);
                            setAttachedFiles([]);
                        }}>취소</CancelButton>
                    </EditContainer>
                </Box>
            </Modal>
        );
    }
;

export default PostEditor;

export const AttachedImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${COLOR.GRAY_100};
  border-radius: 6px;
  width: 100%;
  margin-top: 6px;
`;

export const AttachedImagesWrap = styled.div`
  width: 60px;
  height: 85px;
  margin: 4px;
`;

export const AttachedImage = styled.img`
  width: 100%;
  height: 60px;
  display: block;
`;

export const DeleteImageButton = styled(Button)`
  width: 100%;
  height: 20px;
  margin-top: 4px;
  display: block;
  background-color: ${COLOR.RED};
  color: white;
`;

export const ImagesPreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px;
  max-height: 300px;
  background-color: lightgray;
`;

export const ImagesPreviewWrap = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
`;

export const ImagesPreview = styled.img`
  max-width: 100%;
  height: auto;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: "white",
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileAttachButton = styled.button`
  width: 100%;
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  padding: 8px 0;
  margin-bottom: 4px;
`;

const StyledTextArea = styled.textarea`
  margin-top: 10px;
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 6px;
  resize: none;
  border: 1px solid ${COLOR.GRAY_200};

  &:focus {
    border: 1px solid ${COLOR.BLUE};
    outline: 1px solid ${COLOR.BLUE};
  }

  font-size: 16px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 40px;
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  margin: 8px 0 4px 0;
`;

const CancelButton = styled(Button)`
  width: 100%;
  height: 40px;
  background-color: ${COLOR.GRAY_200};
`;