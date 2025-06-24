import React, { useState, useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './Css/PaymentForm.css';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      setErrorMessage(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Send paymentMethod.id to your server to process the payment
      setPaymentSuccess(true);
      clearCart(); // Clear the cart after successful payment
      setTimeout(() => {
        navigate('/'); // Redirect to Body.js after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="payment-form">
      {!paymentSuccess ? (
        <form onSubmit={handleSubmit}>
          <CardElement options={CARD_OPTIONS} className="CardElement" />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      ) : (
        <div className="payment-success">Payment Successful!</div>
      )}
    </div>
  );
}

export default PaymentForm;
