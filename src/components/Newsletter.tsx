import { Input } from './Input';
export default function Newsletter() {
    return (
        <>
            <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
            <p className="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
            <form className="mt-2 flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                    Email address
                </label>
                <Input
                    id="email-address"
                    type="text"
                    autoComplete="email"
                    required
                />
                <div className="ml-4 flex-shrink-0">
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign up
                    </button>
                </div>
            </form>

        </>
    )
}
