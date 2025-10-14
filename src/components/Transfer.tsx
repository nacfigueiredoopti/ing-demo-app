import React, { useState } from 'react';
import styled from 'styled-components';
import { useTrackEvent } from '@optimizely/react-sdk';
import { Events } from '../optimizely.config';

const TransferContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Card = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Title = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  color: ${props => props.theme.colors.text.primary};
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

const Select = styled.select`
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

const Button = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: ${props => props.theme.spacing.lg};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background-color: #E8F5E9;
  color: #2E7D32;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-top: ${props => props.theme.spacing.lg};
  border-left: 4px solid #4CAF50;
`;

export const Transfer: React.FC = () => {
  const [trackEvent] = useTrackEvent();

  const [formData, setFormData] = useState({
    from: 'checking',
    to: '',
    amount: '',
    description: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Track the transfer completion event
    trackEvent(Events.TRANSFER_COMPLETED, {
      amount: parseFloat(formData.amount),
      fromAccount: formData.from,
      toAccount: formData.to
    });

    setSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        from: 'checking',
        to: '',
        amount: '',
        description: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = formData.to && formData.amount && parseFloat(formData.amount) > 0;

  return (
    <TransferContainer>
      <Card>
        <Title>Transfer Money</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="from">From Account</Label>
            <Select
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
            >
              <option value="checking">Primary Checking - €4,532.50</option>
              <option value="savings">Emergency Fund - €12,450.00</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="to">To Account (IBAN)</Label>
            <Input
              id="to"
              name="to"
              type="text"
              placeholder="NL91 ABNA 0417 1643 00"
              value={formData.to}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="amount">Amount (€)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Payment description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit" disabled={!isFormValid}>
            Transfer Money
          </Button>

          {success && (
            <SuccessMessage>
              Transfer successful! €{formData.amount} has been sent.
            </SuccessMessage>
          )}
        </form>
      </Card>
    </TransferContainer>
  );
};
