import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: black;
  
  & * {
    color: white;
  }
`;

export function Nav() {
  return <NavContainer>
    <div>menu</div>
    <div>moondih</div>
    <div>right</div>
  </NavContainer>;
}
