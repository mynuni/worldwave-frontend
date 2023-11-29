import styled from "styled-components";
import COLOR from "../../constants/color";

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  border: 1px solid ${COLOR.GRAY_100};
  border-radius: 6px;
  gap: 20px;
  width: 350px;
`;
