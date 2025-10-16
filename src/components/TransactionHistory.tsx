import React, { useState } from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 24px;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const FilterTab = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.text.secondary};
  border-bottom: 2px solid ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -2px;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.background};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const TransactionIcon = styled.div<{ $type: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: ${props => {
    switch (props.$type) {
      case 'income': return '#E8F5E9';
      case 'expense': return '#FFEBEE';
      case 'transfer': return '#E3F2FD';
      default: return '#F5F5F5';
    }
  }};
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TransactionName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  font-size: 16px;
`;

const TransactionMeta = styled.div`
  font-size: 13px;
  color: ${props => props.theme.colors.text.secondary};
`;

const TransactionAmount = styled.div<{ $type: string }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => {
    switch (props.$type) {
      case 'income': return '#00A755';
      case 'expense': return '#D32F2F';
      case 'transfer': return props.theme.colors.text.primary;
      default: return props.theme.colors.text.primary;
    }
  }};
`;

const TransactionDate = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 4px;
`;

interface Transaction {
  id: number;
  type: 'income' | 'expense' | 'transfer';
  icon: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  account?: string;
}

const allTransactions: Transaction[] = [
  { id: 1, type: 'income', icon: '💰', name: 'Salary Deposit', category: 'Income', amount: 3500, date: 'Oct 1, 2025', account: 'Primary Checking' },
  { id: 2, type: 'expense', icon: '🏠', name: 'Rent Payment', category: 'Housing', amount: -1250, date: 'Oct 2, 2025', account: 'Primary Checking' },
  { id: 3, type: 'expense', icon: '⚡', name: 'Electricity Bill', category: 'Utilities', amount: -120, date: 'Oct 3, 2025', account: 'Primary Checking' },
  { id: 4, type: 'expense', icon: '🍕', name: 'Pizza House', category: 'Food & Dining', amount: -32, date: 'Oct 4, 2025', account: 'Primary Checking' },
  { id: 5, type: 'transfer', icon: '💸', name: 'Transfer to Savings', category: 'Transfer', amount: -500, date: 'Oct 5, 2025', account: 'Emergency Fund' },
  { id: 6, type: 'expense', icon: '⛽', name: 'Gas Station', category: 'Transportation', amount: -65, date: 'Oct 6, 2025', account: 'Primary Checking' },
  { id: 7, type: 'expense', icon: '🛒', name: 'Supermarket', category: 'Food & Dining', amount: -145, date: 'Oct 7, 2025', account: 'Primary Checking' },
  { id: 8, type: 'expense', icon: '🎬', name: 'Netflix Subscription', category: 'Entertainment', amount: -15, date: 'Oct 8, 2025', account: 'Primary Checking' },
  { id: 9, type: 'expense', icon: '☕', name: 'Coffee Shop', category: 'Food & Dining', amount: -8, date: 'Oct 9, 2025', account: 'Primary Checking' },
  { id: 10, type: 'income', icon: '💼', name: 'Freelance Project', category: 'Income', amount: 800, date: 'Oct 10, 2025', account: 'Primary Checking' },
  { id: 11, type: 'expense', icon: '👕', name: 'Clothing Store', category: 'Shopping', amount: -120, date: 'Oct 11, 2025', account: 'Primary Checking' },
  { id: 12, type: 'expense', icon: '🏋️', name: 'Gym Membership', category: 'Health & Fitness', amount: -45, date: 'Oct 12, 2025', account: 'Primary Checking' },
  { id: 13, type: 'expense', icon: '🍔', name: 'Restaurant', category: 'Food & Dining', amount: -68, date: 'Oct 13, 2025', account: 'Primary Checking' },
  { id: 14, type: 'expense', icon: '📱', name: 'Mobile Phone Bill', category: 'Utilities', amount: -35, date: 'Oct 14, 2025', account: 'Primary Checking' }
];

export const TransactionHistory: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense' | 'transfer'>('all');

  const filteredTransactions = activeFilter === 'all'
    ? allTransactions
    : allTransactions.filter(t => t.type === activeFilter);

  return (
    <HistoryContainer>
      <SectionTitle>📋 Recent Transactions</SectionTitle>

      <FilterTabs>
        <FilterTab $active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
          All
        </FilterTab>
        <FilterTab $active={activeFilter === 'income'} onClick={() => setActiveFilter('income')}>
          Income
        </FilterTab>
        <FilterTab $active={activeFilter === 'expense'} onClick={() => setActiveFilter('expense')}>
          Expenses
        </FilterTab>
        <FilterTab $active={activeFilter === 'transfer'} onClick={() => setActiveFilter('transfer')}>
          Transfers
        </FilterTab>
      </FilterTabs>

      <TransactionList>
        {filteredTransactions.map(transaction => (
          <TransactionItem key={transaction.id}>
            <TransactionInfo>
              <TransactionIcon $type={transaction.type}>
                {transaction.icon}
              </TransactionIcon>
              <TransactionDetails>
                <TransactionName>{transaction.name}</TransactionName>
                <TransactionMeta>
                  {transaction.category} • {transaction.account}
                </TransactionMeta>
                <TransactionDate>{transaction.date}</TransactionDate>
              </TransactionDetails>
            </TransactionInfo>
            <TransactionAmount $type={transaction.type}>
              {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
            </TransactionAmount>
          </TransactionItem>
        ))}
      </TransactionList>
    </HistoryContainer>
  );
};
