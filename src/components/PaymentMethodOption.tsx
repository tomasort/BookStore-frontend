type PaymentMethod = 'card' | 'zelle' | 'pagoMovil';

// Payment Method Option Component
interface PaymentMethodOptionProps {
    method: PaymentMethod;
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function PaymentMethodOption({ method, label, selected, onClick }: PaymentMethodOptionProps) {
    return (
        <div
            onClick={onClick}
            className={`border rounded-md p-4 cursor-pointer transition-colors ${selected
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-300 hover:border-gray-400'
                }`}
        >
            <div className="flex items-center justify-center h-full">
                <span className="text-center font-medium">{label}</span>
            </div>
        </div>
    );
}
