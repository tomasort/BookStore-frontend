// TODO: Validate the discount code
// TODO: make it so that the discount code can be applied to the total through a callback prop
export default function DiscountCodeForm() {
    return (
        <form>
            <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700">
                Discount code
            </label>
            <div className="mt-1 flex space-x-4">
                <input
                    type="text"
                    id="discount-code"
                    name="discount-code"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                    type="submit"
                    className="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                    Apply
                </button>
            </div>
        </form>
    )
}
