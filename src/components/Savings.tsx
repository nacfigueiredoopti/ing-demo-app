import React, { useState } from 'react';
import styled from 'styled-components';
import { useTrackEvent } from '@optimizely/react-sdk';
import { Events } from '../optimizely.config';

const SavingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Card = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Title = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  color: ${props => props.theme.colors.text.primary};
`;

const CardTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 20px;
`;

const InterestRate = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.colors.success};
  margin: ${props => props.theme.spacing.md} 0;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin: ${props => props.theme.spacing.md} 0;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: ${props => props.theme.spacing.md};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const Modal = styled.div<{ $show: boolean }>`
  display: ${props => props.$show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 500px;
  width: 90%;
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text.primary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 16px;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const SecondaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.primary};

  &:hover {
    background-color: #D0D0D0;
  }
`;

export const Savings: React.FC = () => {
  const [trackEvent] = useTrackEvent();

  const [showModal, setShowModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleCreateGoal = () => {
    if (goalName && targetAmount) {
      // Track the savings goal creation
      trackEvent(Events.SAVINGS_GOAL_CREATED, {
        goalName,
        targetAmount: parseFloat(targetAmount)
      });

      alert(`Savings goal "${goalName}" created for €${targetAmount}!`);
      setShowModal(false);
      setGoalName('');
      setTargetAmount('');
    }
  };

  return (
    <SavingsContainer>
      <Title>Savings Products</Title>

      <Grid>
        <Card>
          <CardTitle>Orange Savings Account</CardTitle>
          <InterestRate>2.5%</InterestRate>
          <Description>
            Flexible savings account with competitive interest rates.
            No minimum balance required. Withdraw anytime without fees.
          </Description>
          <Button onClick={() => alert('Opening new account...')}>
            Open Account
          </Button>
        </Card>

        <Card>
          <CardTitle>Fixed-Term Deposit</CardTitle>
          <InterestRate>3.8%</InterestRate>
          <Description>
            Lock in higher rates with a 12-month term deposit.
            Guaranteed returns with FDIC protection up to €100,000.
          </Description>
          <Button onClick={() => alert('Opening fixed-term deposit...')}>
            Open Account
          </Button>
        </Card>

        <Card>
          <CardTitle>Goal-Based Savings</CardTitle>
          <InterestRate>2.8%</InterestRate>
          <Description>
            Create custom savings goals and track your progress.
            Auto-save with round-ups and recurring deposits.
          </Description>
          <Button onClick={() => setShowModal(true)}>
            Create Savings Goal
          </Button>
        </Card>
      </Grid>

      <Card>
        <CardTitle>Investment Savings</CardTitle>
        <Description>
          Grow your wealth with our investment products. Choose from
          diversified portfolios managed by experts or build your own.
        </Description>
        <InterestRate>Avg. 8-12% Annual Returns</InterestRate>
        <Button onClick={() => alert('Learn more about investments...')}>
          Explore Investment Options
        </Button>
      </Card>

      <Modal $show={showModal}>
        <ModalContent>
          <Title style={{ fontSize: '24px' }}>Create Savings Goal</Title>
          <FormGroup>
            <Label htmlFor="goalName">Goal Name</Label>
            <Input
              id="goalName"
              type="text"
              placeholder="e.g., Vacation, New Car"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="targetAmount">Target Amount (€)</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </FormGroup>
          <ButtonGroup>
            <SecondaryButton onClick={() => setShowModal(false)}>
              Cancel
            </SecondaryButton>
            <Button onClick={handleCreateGoal}>
              Create Goal
            </Button>
          </ButtonGroup>
        </ModalContent>
      </Modal>
    </SavingsContainer>
  );
};
