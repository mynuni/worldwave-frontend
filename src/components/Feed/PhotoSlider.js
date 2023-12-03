import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import Button from "../common/Button/Button";

const PhotoSlider = ({
                         attachedFiles,
                         editMode,
                         updateData,
                         setUpdateData,
                         onDeleted
                     }) => {

    const baseUrl = process.env.REACT_APP_STATIC_IMAGES_BASE_URL;
    const [selectedImage, setSelectedImage] = useState("");
    const filesToDisplay = attachedFiles || [];
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        if (filesToDisplay.length > 0) {
            setSelectedImage(baseUrl + filesToDisplay[0].storedFileName);
        } else {
            setSelectedImage("");
        }
    }, [filesToDisplay]);

    return (<Container>
        <SelectedImageContainer>
            <SelectedImageWrap>
                {selectedImage && (<SelectedImage
                    src={selectedImage}
                    alt="NO IMAGE"
                />)}
            </SelectedImageWrap>
        </SelectedImageContainer>
        <ImagePreviewContainer>
            {filesToDisplay.length > 0 && filesToDisplay.map((file) => (
                <ImagePreviewWrap key={file.id}>
                    <ImagePreview
                        src={baseUrl + file.storedFileName}
                        alt={"NO IMAGE"}
                        onClick={() => handleImageClick(baseUrl + file.storedFileName)}
                        $isSelected={selectedImage === file.storedFileName}
                        editMode={editMode}
                    />
                    {editMode && (
                        <ImagePreviewDeleteButton onClick={() => {
                            onDeleted(file.id);
                            setUpdateData({
                                ...updateData,
                                deletedFiles: [...updateData.deletedFiles, file.id]
                            });
                        }}>삭제</ImagePreviewDeleteButton>)}
                </ImagePreviewWrap>))}
        </ImagePreviewContainer>
    </Container>);
};

export default PhotoSlider;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedImageContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: lightgray;
  width: 100%;
  height: 400px;
`;

const SelectedImage = styled.img`
  width: 100%;
  height: 400px;
`;

const SelectedImageWrap = styled.div`
`;

const ImagePreviewContainer = styled.div`
  margin: 10px 0;
  display: flex;

`;

const ImagePreview = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 2px;
  border: 3px solid ${props => props.$isSelected ? COLOR.BLUE : COLOR.WHITE};
  cursor: pointer;
`;

const ImagePreviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2px;
`;

const ImagePreviewDeleteButton = styled(Button)`
  background-color: ${COLOR.RED};
  color: ${COLOR.WHITE};
  padding: 2px 4px;
  width: 100%;
  margin-top: 4px;
`;