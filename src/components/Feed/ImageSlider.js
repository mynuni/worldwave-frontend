import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import COLOR from "../../constants/color";
import Button from "../common/Button/Button";

const ImageSlider = ({
                         oldImages = [],
                         attachFiles = [],
                         newImagePath = [],
                         editMode,
                         handleDeleteOldFile,
                         handleDeleteNewFile,
                     }) => {

    const [selectedImage, setSelectedImage] = useState("");
    useEffect(() => {
        if (oldImages.length > 0) {
            setSelectedImage(oldImages[0]);
        } else {
            setSelectedImage("");
        }
    }, [oldImages, newImagePath]);

    return (
        <Container>
            <ImagePreviewContainer>
                <ImagePreviewWrap>
                    {selectedImage && (
                        <img src={selectedImage} alt="NO IMAGE"/>
                    )}
                </ImagePreviewWrap>
            </ImagePreviewContainer>
            <ImageListContainer>
                {/* 이전 이미지 목록 */}
                {attachFiles && attachFiles.map((image) => (
                    <ImageItem key={image.id}>
                        <ImageWrap onClick={() => setSelectedImage("/images/" + image.storedFileName)}>
                            <img src={"/images/" + image.storedFileName} alt="NO IMAGE"/>
                        </ImageWrap>
                        {editMode && (
                            <StyledDeleteButton size="small"
                                                onClick={() => handleDeleteOldFile(image.id)}>삭제</StyledDeleteButton>
                        )}
                    </ImageItem>
                ))}
                {/* 새로운 이미지 목록 */}
                {newImagePath && newImagePath.map((image, index) => (
                    <ImageItem key={index}>
                        <ImageWrap onClick={() => setSelectedImage(image)}>
                            <img src={image} alt="NO IMAGE"/>
                        </ImageWrap>
                        {editMode && (
                            <StyledDeleteButton size="small"
                                                onClick={() => handleDeleteNewFile(index)}>삭제</StyledDeleteButton>
                        )}
                    </ImageItem>
                ))}
            </ImageListContainer>
        </Container>
    );
};

export default ImageSlider;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${COLOR.GRAY_100};
  width: 100%;
  height: 400px;
`;

const ImagePreviewWrap = styled.div`
  height: 400px;
  width: auto;

  img {
    width: auto;
    height: 100%;
  }
`;

const ImageListContainer = styled.div`
  margin: 12px 0;
  display: flex;
  justify-content: center;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 4px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  border: 1px solid ${COLOR.GRAY_200};

  img {
    width: auto;
    height: 100%;
  }

`;

const StyledDeleteButton = styled(Button)`
  background-color: ${COLOR.RED};
  color: ${COLOR.WHITE};
  width: 50px;
  margin-top: 4px;
  font-size: 14px;
`;