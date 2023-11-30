import styled from "styled-components";
import COLOR from "../../../constants/color";
import Button from "../../common/Button/Button";
import {TextField} from "@mui/material";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 14px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 50px;
  background-color: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  transition: 0.2s ease;

  &:hover {
    filter: brightness(105%);
  }

  &:active {
    filter: brightness(95%);
  }
`;

export const Input = styled(TextField)`
`;