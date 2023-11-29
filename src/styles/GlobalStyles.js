import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    cursor: pointer;
    font-size: inherit;
    border: none;
    border-radius: 6px;
    height: 100%;
  }
  
  li {
    list-style: none;
  }
  
  
`;

export default GlobalStyles;