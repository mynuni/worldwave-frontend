import styled from "styled-components";
import COLOR from "../../../constants/color";

export const Container = styled.div``;
export const InputWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const InputField = styled.input`
  width: ${props => props.width ? props.width : "100%"};
  height: ${props => props.height ? props.height : "100%"};
  font-size: 16px;
  padding: 14px;
  border: none;
  border-radius: 4px;
  outline: 1px solid ${(props) => props.error ? `${COLOR.RED}` : `${COLOR.GRAY_100}`};

  &:focus {
    outline: 1px solid ${(props) => props.error ? `${COLOR.RED}` : `${COLOR.BLUE}`};
  }

  &:not(:placeholder-shown) + span,
  &:focus + span {
    color: ${(props) => props.error ? `${COLOR.RED}` : `${COLOR.BLUE}`};
    transform: translateX(10px) translateY(-25px);
    padding: 0 6px;
    background-color: ${COLOR.WHITE};
  }

  &:not(:focus) + span {
    color: ${(props) => props.error ? `${COLOR.RED}` : `${COLOR.GRAY_100}`};
  }
`

export const Label = styled.span`
  position: absolute;
  left: 0;
  padding-left: 14px;
  pointer-events: none;
  transition: 0.1s ease;
`

export const ErrorMessage = styled.div`
  margin: 3px;
  color: ${COLOR.RED};
`;