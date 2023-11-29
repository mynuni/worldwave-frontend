import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: underline;
`;