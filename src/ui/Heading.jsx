import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-weight: 3rem;
      font-size: 30px;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-weight: 2rem;
      font-size: 20px;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-weight: 1rem;
      font-size: 10px;
    `}
`;

export default Heading;
