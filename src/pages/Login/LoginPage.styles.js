import styled from "styled-components";
import COLOR from "../../constants/color";

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  border: 1px solid ${COLOR.GRAY_200};
  border-radius: 6px;
  padding: 40px;
  gap: 14px;
`;

export const FooterWrap = styled.div`
  width: 100%;
  margin-top: 70px;
`;