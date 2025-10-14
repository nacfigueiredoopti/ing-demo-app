import React from 'react';
import styled from 'styled-components';

const AccountsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Title = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.xl} 0;
  color: ${props => props.theme.colors.text.primary};
`;

const AccountCard = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AccountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const AccountInfo = styled.div``;

const AccountName = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 20px;
`;

const AccountNumber = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 14px;
`;

const Balance = styled.div`
  text-align: right;
`;

const BalanceLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 14px;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const BalanceAmount = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const TransactionList = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

const TransactionInfo = styled.div``;

const TransactionName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 4px;
`;

const TransactionDate = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
`;

const TransactionAmount = styled.div<{ $type: 'debit' | 'credit' }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$type === 'credit' ? props.theme.colors.success : props.theme.colors.text.primary};
`;

const transactions = [
  { id: 1, name: 'Salary Deposit', date: '2025-10-01', amount: 3500, type: 'credit' as const },
  { id: 2, name: 'Rent Payment', date: '2025-10-02', amount: -1200, type: 'debit' as const },
  { id: 3, name: 'Grocery Store', date: '2025-10-05', amount: -85.50, type: 'debit' as const },
  { id: 4, name: 'Transfer to Savings', date: '2025-10-06', amount: -500, type: 'debit' as const },
  { id: 5, name: 'Utility Bill', date: '2025-10-10', amount: -125.75, type: 'debit' as const },
  { id: 6, name: 'Restaurant', date: '2025-10-12', amount: -45.20, type: 'debit' as const },
  { id: 7, name: 'Online Purchase', date: '2025-10-14', amount: -89.99, type: 'debit' as const },
];

export const Accounts: React.FC = () => {
  return (
    <AccountsContainer>
      <Title>My Accounts</Title>

      <AccountCard>
        <AccountHeader>
          <AccountInfo>
            <AccountName>Primary Checking</AccountName>
            <AccountNumber>NL91 INGB 0001 2345 67</AccountNumber>
          </AccountInfo>
          <Balance>
            <BalanceLabel>Current Balance</BalanceLabel>
            <BalanceAmount>€4,532.50</BalanceAmount>
          </Balance>
        </AccountHeader>

        <TransactionList>
          <h4 style={{ marginBottom: '16px', color: '#767676' }}>Recent Transactions</h4>
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id}>
              <TransactionInfo>
                <TransactionName>{transaction.name}</TransactionName>
                <TransactionDate>{transaction.date}</TransactionDate>
              </TransactionInfo>
              <TransactionAmount $type={transaction.type}>
                {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      </AccountCard>

      <AccountCard>
        <AccountHeader>
          <AccountInfo>
            <AccountName>Emergency Fund</AccountName>
            <AccountNumber>NL91 INGB 0001 2345 68</AccountNumber>
          </AccountInfo>
          <Balance>
            <BalanceLabel>Current Balance</BalanceLabel>
            <BalanceAmount>€12,450.00</BalanceAmount>
          </Balance>
        </AccountHeader>

        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#E8F5E9', borderRadius: '8px' }}>
          <div style={{ fontSize: '14px', color: '#2E7D32' }}>
            <strong>Interest Rate:</strong> 2.5% APY
          </div>
          <div style={{ fontSize: '14px', color: '#2E7D32', marginTop: '8px' }}>
            <strong>Interest Earned This Month:</strong> €25.94
          </div>
        </div>
      </AccountCard>
    </AccountsContainer>
  );
};
