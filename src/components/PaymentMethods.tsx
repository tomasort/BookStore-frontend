import { useQuery } from "@tanstack/react-query";

interface PaymentMethodsProps {
    selectedMethod: string;
    setSelectedMethod: (method: string) => void;
}

async function getCheckoutMethods(): Promise<string[]> {
    const response = await fetch(`/api/checkout/methods`);
    const methods: string[] = await response.json();
    return methods;
}

export default function PaymentMethods({ selectedMethod, setSelectedMethod }: PaymentMethodsProps) {
    const { data: PaymentMethods, isLoading } = useQuery({
        queryKey: ["checkoutMethods"],
        queryFn: getCheckoutMethods,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="payment-methods">
            <h2 className="text-lg font-medium">Payment Methods</h2>
            <ul>
                {PaymentMethods && PaymentMethods.map((method) => (
                    <li key={method}>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method}
                                checked={selectedMethod === method}
                                onChange={() => setSelectedMethod(method)}
                            />
                            {method}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
