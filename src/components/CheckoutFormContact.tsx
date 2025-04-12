import { Input } from "@/components/Input"

export default function CheckoutFormContact() {
    return (
        <div>
            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <h2 className="text-lg font-medium text-gray-900">Contact</h2>
                <div className="col-span-full">
                    <div className="mt-1">
                        <Input
                            type="email"
                            id="email-address"
                            name="email-address"
                            autoComplete="email"
                            placeholder="Email address"
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
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                </div>
                <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                    Email me with news and offers
                </label>
            </div>
            {/* 
                        TODO: don't show this if user is logged in 

                        */}
            <a href="/login" >Log in</a>
        </div>
    )
}
