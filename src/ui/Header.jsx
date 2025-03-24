import styled from "styled-components";

const H1 = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;
function Header() {
  return (
    <H1>
      <p>Header</p>
    </H1>
  );
}

export default Header;
