import styled from "styled-components";

const TabsContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: var(--dark);

  .tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .tab * {
    color: var(--light);
  }
`;

export function Tabs() {
  return (
    <TabsContainer>
      <div className="tab">
        <span className="material-symbols-rounded">home</span>
        <span className="logo">Dashboard</span>
      </div>
      <div className="tab">
        <span className="material-symbols-rounded">payments</span>
        <span className="logo">Transactions</span>
      </div>
      <div className="tab">
        <span className="material-symbols-rounded">settings_heart</span>
        <span className="logo">Settings</span>
      </div>
    </TabsContainer>
  );
}
