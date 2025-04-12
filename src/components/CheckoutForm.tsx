import { LockClosedIcon } from '@heroicons/react/20/solid'
import CheckoutFormContact from './CheckoutFormContact'
import CheckoutFormDelivery from './CheckoutFormDelivery';
import CheckoutFormShipping from './CheckoutFormShipping';
import CheckoutFormPayment from './CheckoutFormPayment';

interface CheckoutFormProps {
    total: number;
    shipping: number;
    setShipping: Function;
    paymentMethod: string;
    setPaymentMethod: Function;
}
export default function CheckoutForm({ total, shipping, setShipping, paymentMethod, setPaymentMethod }: CheckoutFormProps) {
    return (
        <>

            <form className="mt-6">
                <div >
                    <CheckoutFormContact />
                </div>
                <div className="mt-10 border-t border-gray-200 pt-10 ">
                    <CheckoutFormDelivery />
                </div>
                <div className="mt-10 border-t border-gray-200 pt-10 ">
                    <CheckoutFormShipping />
                </div>
                <div className="mt-10 border-t border-gray-200 pt-10 ">
                    <CheckoutFormPayment />
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Pay {total}
                </button>

            </form>
        </>

    )

}
