import styled from "styled-components";
import {ReactComponent as WorldMap} from "../../assets/world-map.svg";
import COLOR from "../../constants/color";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

export const StyledWorldMap = styled(WorldMap)`

  width: 100%;
  margin-bottom: auto;

  path {
    fill: ${COLOR.GRAY_300};
    cursor: not-allowed;
    stroke: gray;
  }

  ${props => props.providedCountries?.map(country => `
      path[data-id="${country}"] {
        fill: lightgray;
        cursor: pointer;
      }

      path[data-id="${country}"]:hover {
        fill: rgba(235, 235, 235, 0.7);
      }
    `)
  }
  
  path:hover {
    fill: gray;
  }

`;

export const CountryNameWrap = styled.div`
  position: absolute;
  background-color: ${COLOR.BLACK_100};
  color: ${COLOR.WHITE};
  padding: 8px 16px;
  border-radius: 4px;
`;