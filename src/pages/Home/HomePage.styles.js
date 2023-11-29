import styled from "styled-components";
import COLOR from "../../constants/color";

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${COLOR.BLUE}
`;

export const Container = styled.div`
  display: flex;
`;

export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLOR.WHITE};
  padding: 24px;
  border: 1px solid ${COLOR.GRAY_100};
  border-radius: 6px;
  width: 350px;

  & {
    gap: 10px;
  }

`;

export const LoginButtonGroup = styled.div`
  flex: 1;
  
  & > div {
    margin: 12px;
  }
`;

export const LogoWrap = styled.div`
  margin: 20px 0;
`;

export const introStyles = {
    margin: "20px 0"
}