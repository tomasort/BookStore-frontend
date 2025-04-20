import { Input } from '@/components/Input';

export default function ZellePayment() {
    return (
        <>
            <h2 className="col-span-full text-lg font-medium text-gray-900 mt-4">Zelle Payment</h2>
            <div className="col-span-full">
                <div className="mt-1">
                    <Input
                        type="text"
                        id="zelle-name"
                        name="zelle-name"
                        autoComplete="name"
                        placeholder="Name"
                    />
                </div>
            </div>
            <div className="col-span-full">
                <div className="mt-1">
                    <Input
                        type="text"
                        id="zelle-last-name"
                        name="zelle-last-name"
                        autoComplete="last-name"
                        placeholder="Last Name"
                    />
                </div>
            </div>
            <div className="col-span-full">
                <div className="mt-1">
                    <Input
                        type="text"
                        id="zelle-email"
                        name="zelle-email"
                        autoComplete="email"
                        placeholder="Email used for Zelle"
                    />
                </div>
            </div>
            <div className="col-span-full">
                <div className="mt-1">
                    <Input
                        type="text"
                        id="zelle-phone"
                        name="zelle-phone"
                        autoComplete="phone"
                        placeholder="Phone number used for Zelle"
                    />
                </div>
            </div>
            <div className="col-span-full">
                <div className="mt-1">
                    <Input
                        type="text"
                        id="zelle-confirmation"
                        name="zelle-confirmation"
                        placeholder="Zelle confirmation number"
                    />
                </div>
            </div>
        </>
    )
}
