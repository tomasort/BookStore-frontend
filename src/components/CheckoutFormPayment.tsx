import PaymentMethodOption from '@/components/PaymentMethodOption';
import { useState } from 'react';
import CardPayment from './CardPayment';
import ZellePayment from './ZellePayment';
import PagoMovilPayment from './PagoMovilPayment';

type PaymentMethod = 'card' | 'zelle' | 'pagoMovil';

export default function CheckoutFormPayment() {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    return (
        <>
            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <h2 className="col-span-full text-lg font-medium text-gray-900">Payment</h2>

                {/* Payment Method Section */}
                <div className="col-span-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <PaymentMethodOption
                            method="card"
                            label="Credit/Debit Card"
                            selected={paymentMethod === 'card'}
                            onClick={() => setPaymentMethod('card')}
                        />
                        <PaymentMethodOption
                            method="zelle"
                            label="Zelle"
                            selected={paymentMethod === 'zelle'}
                            onClick={() => setPaymentMethod('zelle')}
                        />
                        <PaymentMethodOption
                            method="pagoMovil"
                            label="Pago Móvil"
                            selected={paymentMethod === 'pagoMovil'}
                            onClick={() => setPaymentMethod('pagoMovil')}
                        />
                    </div>
                </div>

                {/* Card Details Section */}
                {paymentMethod === 'card' && (
                    <CardPayment />
                )}

                {/* Zelle Payment Section */}
                {paymentMethod === 'zelle' && (
                    <ZellePayment />
                )}

                {/* Pago Móvil Section */}
                {paymentMethod === 'pagoMovil' && (
                    <PagoMovilPayment />
                )}

            </div>


        </>
    )
}
