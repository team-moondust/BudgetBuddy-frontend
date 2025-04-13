import styled from "styled-components";

const TransactionCardContainer = styled.div`
  border: 1px var(--dark) solid;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function prettyPrintDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  // Remove the comma before the time
  return date.toLocaleString("en-US", options).replace(",", "");
}

export function TransactionCard({ transaction }: { transaction: Transaction }) {
  return (
    <TransactionCardContainer>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4>{transaction.description}</h4>
        <p>{prettyPrintDate(transaction.purchase_date)}</p>
      </div>

      <h3
        className="logo"
        style={{ fontWeight: "normal", color: "var(--burnt-sienna)" }}
      >
        -${transaction.amount}
      </h3>
    </TransactionCardContainer>
  );
}
