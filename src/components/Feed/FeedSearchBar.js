import React from 'react';
import styled from "styled-components";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import button from "../common/Button/Button";
import COLOR from "../../constants/color";
import PostEditor from "./PostEditor";
import {NavLink} from "react-router-dom";
import {CLIENT_PATHS} from "../../constants/path";
import {useRecoilValue} from "recoil";
import {userSelector} from "../../recoil/user";

const FeedSearchBar = ({sort, setSort}) => {

    const user = useRecoilValue(userSelector);
    const [editorOpen, setEditorOpen] = React.useState(false);
    const handleEditorOpen = () => setEditorOpen(true);
    const handleEditorClose = () => setEditorOpen(false);

    return (
        <FeedNavigationBar>
            <Box sx={{minWidth: 200}}>
                <FormControl fullWidth>
                    <Select
                        sx={{height: 40}}
                        id="demo-simple-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <MenuItem value={"createdAt"}>최신순</MenuItem>
                        <MenuItem value={"like"}>좋아요 많은 순</MenuItem>
                        <MenuItem value={"comment"}>댓글 많은 순</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <ButtonWrap>
                <NavLink to={CLIENT_PATHS.MEMBER + user.id}>나의 피드</NavLink>
                <PostWriteButton onClick={handleEditorOpen}>글 작성</PostWriteButton>
            </ButtonWrap>
            <PostEditor open={editorOpen} onClose={handleEditorClose}/>
        </FeedNavigationBar>
    );
};

export default FeedSearchBar;

export const FeedNavigationBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
`;

export const PostWriteButton = styled(button)`
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  width: 100px;
  height: 40px;
`;

const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    
    a {
        text-decoration: none;
        color: ${COLOR.BLACK_100};
        background-color: ${COLOR.WHITE};
        border: 1px solid ${COLOR.GRAY_200};
        width: 100px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        
        &:hover {
            background-color: ${COLOR.GRAY_100};
        }
    }
`;