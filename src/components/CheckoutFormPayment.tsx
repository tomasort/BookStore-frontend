import { Input } from '@/components/Input';
import { useState } from 'react';

export default function CheckoutFormPayment() {
    const [sameAsShipping, setSameAsShipping] = useState(true);
    return (
        <>
            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <h2 className="col-span-full text-lg font-medium text-gray-900">Payment</h2>
                <div className="col-span-full">

                    <div className="mt-1">
                        <Input
                            type="text"
                            id="name-on-card"
                            name="name-on-card"
                            autoComplete="cc-name"
                            placeholder="Name on card"
                        />
                    </div>
                </div>

                <div className="col-span-full">

                    <div className="mt-1">
                        <Input
                            type="text"
                            id="card-number"
                            name="card-number"
                            autoComplete="cc-number"
                            placeholder="Card number"
                        />
                    </div>
                </div>

                <div className="col-span-8 sm:col-span-9">

                    <div className="mt-1">
                        <Input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            placeholder="MM / YY"
                        />
                    </div>
                </div>

                <div className="col-span-4 sm:col-span-3">

                    <div className="mt-1">
                        <Input
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            placeholder="CVC"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex space-x-2">
                <div className="flex h-5 items-center">
                    <input
                        id="same-as-shipping"
                        name="same-as-shipping"
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                </div>
                <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                    Billing address is the same as shipping address
                </label>
            </div>
            {!sameAsShipping && (
                <div className="mt-7 grid grid-cols-12 gap-x-4 gap-y-6">
                    <div className="col-span-full">
                        <div className="mt-1">
                            <Input
                                type="text"
                                id="address"
                                name="address"
                                autoComplete="street-address"
                                placeholder="Billing address"
                            />
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-4">

                        <div className="mt-1">
                            <Input
                                type="text"
                                id="city"
                                name="city"
                                autoComplete="address-level2"
                                placeholder="City"
                            />
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-4">
                        <div className="mt-1">
                            <Input
                                type="text"
                                id="region"
                                name="region"
                                autoComplete="address-level1"
                                placeholder="State / Province"
                            />
                        </div>
                    </div>

                    <div className="col-span-full sm:col-span-4">
                        <div className="mt-1">
                            <Input
                                type="text"
                                id="postal-code"
                                name="postal-code"
                                autoComplete="postal-code"
                                placeholder="Postal code"
                            />
                        </div>
                    </div>

                </div>

            )}


        </>
    )
}
