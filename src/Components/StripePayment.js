import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51Rd3HRRqJ35nY6n3OZvGFTBZ8GEX6KZKSUaHSYzjSfCprkMEu6mLQDVhCaBZPNMPZDELqOAxY652ziKz7c6bS58200TsDLy3uO'); // Replace with your actual test publishable key

function StripePayment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripePayment;
