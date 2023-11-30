import styled from "styled-components";
import COLOR from "../../../constants/color";
import {NavLink} from "react-router-dom";

export const ButtonWrap = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLOR.GRAY_200};
  border-radius: 6px;
  width: 100%;
  height: 60px;
  padding: 6px;
  cursor: pointer;
  user-select: none;
  background-color: white;
  transition: 0.2s ease;
  font-size: 16px;

  &:hover {
    filter: brightness(95%);
  }

  &:active {
    filter: brightness(90%);
  }

  & > img {
    flex: 0;
  }

  & > div, a {
    flex: 1;
    color: ${COLOR.BLACK_100};
  }

`;

export const StyledNavLink = styled(NavLink)`
  width: 100%;
`;