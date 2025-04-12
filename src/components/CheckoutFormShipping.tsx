export default function CheckoutFormShipping() {
    return (
        <div >
            <h2 className="text-lg font-medium text-gray-900">Shipping Method</h2>
            <div className="mt-4 space-y-4">
                <div className="flex items-center">
                    <input
                        id="shipping-standard"
                        name="shipping-method"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="shipping-standard" className="ml-3 flex flex-1 items-center justify-between">
                        <span className="block text-sm font-medium text-gray-900">Standard Shipping</span>
                        <span className="block text-sm font-medium text-gray-900">$5.99</span>
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        id="shipping-express"
                        name="shipping-method"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="shipping-express" className="ml-3 flex flex-1 items-center justify-between">
                        <span className="block text-sm font-medium text-gray-900">Express Shipping</span>
                        <span className="block text-sm font-medium text-gray-900">$14.99</span>
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        id="shipping-next-day"
                        name="shipping-method"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="shipping-next-day" className="ml-3 flex flex-1 items-center justify-between">
                        <div>
                            <span className="block text-sm font-medium text-gray-900">Next Day Delivery</span>
                            <span className="block text-sm text-gray-500">Order by 5pm for delivery tomorrow</span>
                        </div>
                        <span className="block text-sm font-medium text-gray-900">$24.99</span>
                    </label>
                </div>
            </div>
        </div>
    )
}
