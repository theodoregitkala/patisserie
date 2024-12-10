import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PaymentResult } from '../types';

interface PayPalButtonProps {
  amount: number;
  onSuccess: (result: PaymentResult) => void;
  onError?: (error: string) => void;
}

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb";

export const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": PAYPAL_CLIENT_ID,
      currency: "EUR",
      intent: "capture"
    }}>
      <div className="max-w-md mx-auto">
        <PayPalButtons
          style={{
            color: "gold",
            shape: "rect",
            label: "pay",
            height: 40
          }}
          createOrder={(_, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount.toString(),
                    currency_code: "EUR"
                  },
                  description: "Commande de gâteau personnalisé"
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (!actions.order) {
              onError?.('Une erreur est survenue lors du paiement');
              return;
            }

            try {
              const details = await actions.order.capture();
              if (details.status === 'COMPLETED') {
                onSuccess({
                  success: true,
                  transactionId: details.id
                });
              } else {
                throw new Error('Le paiement n\'a pas été complété');
              }
            } catch (error) {
              onError?.(error instanceof Error ? error.message : 'Le paiement a échoué');
            }
          }}
          onError={(err) => {
            console.error('PayPal Error:', err);
            onError?.('Une erreur est survenue lors du paiement');
          }}
          onCancel={() => {
            onError?.('Le paiement a été annulé');
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};