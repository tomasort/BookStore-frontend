import { Input } from "./Input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
export default function CheckoutFormDelivery() {
    return (
        <div>
            <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <h2 className="col-span-full text-lg font-medium text-gray-900">Delivery</h2>

                <div className="col-span-full">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Mexico">Mexico</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="col-span-6">
                    <div className="mt-1">
                        <Input
                            type="text"
                            id="first-name"
                            name="first-name"
                            autoComplete="given-name"
                            placeholder="First name"
                        />
                    </div>
                </div>

                <div className="col-span-6">

                    <div className="mt-1">
                        <Input
                            type="text"
                            id="last-name"
                            name="last-name"
                            autoComplete="family-name"
                            placeholder="Last name"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <div className="mt-1">
                        <Input
                            type="text"
                            id="delivery-address"
                            name="delivery-address"
                            autoComplete="street-address"
                            placeholder="Delivery address"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <div className="mt-1">
                        <Input
                            type="text"
                            id="apartment"
                            name="apartment"
                            placeholder="Apartment, suite, etc."
                        />
                    </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                    <div className="mt-1">
                        <Input
                            type="text"
                            id="delivery-city"
                            name="delivery-city"
                            autoComplete="address-level2"
                            placeholder="City"
                        />
                    </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                    <div className="mt-1">
                        <Input
                            type="text"
                            id="delivery-state"
                            name="delivery-state"
                            autoComplete="address-level1"
                            placeholder="State / Province"
                        />
                    </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                    <div className="mt-1">
                        <Input
                            type="text"
                            id="delivery-zip"
                            name="delivery-zip"
                            autoComplete="postal-code"
                            placeholder="Postal code"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <div className="mt-1">
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            placeholder="Phone number"
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
                    Save this information for next time
                </label>
            </div>

        </div>
    )
}
