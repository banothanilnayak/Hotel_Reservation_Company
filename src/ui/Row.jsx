import styled, { css } from "styled-components";

const Row = styled.div`
  ${(params) =>
    params.direction === "horizental" &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}

  ${(params) =>
    params.direction === "vertical" &&
    css`
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    `}
`;

Row.defaultProps = {
  direction: "vertical",
};
export default Row;
