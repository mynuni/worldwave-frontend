import React, {useState} from 'react';
import styled from "styled-components";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import button from "../common/Button/Button";
import COLOR from "../../constants/color";
import PostEditor from "./PostEditor";

const FeedSearchBar = ({sort, setSort}) => {

    const [editorOpen, setEditorOpen] = React.useState(false);
    const handleEditorOpen = () => setEditorOpen(true);
    const handleEditorClose = () => setEditorOpen(false);

    return (
        <FeedNavigationBar>
            <Box sx={{minWidth: 200}}>
                <FormControl fullWidth>
                    <Select
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
            <PostWriteButton onClick={handleEditorOpen}>글 작성</PostWriteButton>
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
  border-bottom: 1px solid silver;
  height: 60px;
`;

export const PostWriteButton = styled(button)`
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  width: 100px;
  height: 40px;
`;