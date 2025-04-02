import styled from "styled-components";

const Errors = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function Error({ message }) {
  return <Errors>{message}</Errors>;
}

export default Error;
