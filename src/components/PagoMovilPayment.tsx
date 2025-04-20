import { Input } from '@/components/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select';
import { useState } from 'react';

// Bank data - in a real application, this would be fetched from an API
const PAGO_MOVIL_BANKS: Bank[] = [
    { code: "0156", name: "100% BANCO" },
    { code: "0196", name: "ABN AMRO BANK" },
    { code: "0172", name: "BANCAMIGA" },
    { code: "0171", name: "BANCO ACTIVO BANCO COMERCIAL" },
    { code: "0166", name: "BANCO AGRICOLA" },
    { code: "0175", name: "BANCO BICENTENARIO" },
    { code: "0128", name: "BANCO CARONI" },
    { code: "0164", name: "BANCO DE DESARROLLO DEL MICROEMPRESARIO" },
    { code: "0102", name: "BANCO DE VENEZUELA" },
    { code: "0114", name: "BANCO DEL CARIBE" },
    { code: "0149", name: "BANCO DEL PUEBLO SOBERANO" },
    { code: "0163", name: "BANCO DEL TESORO" },
    { code: "0176", name: "BANCO ESPIRITO SANTO" },
    { code: "0115", name: "BANCO EXTERIOR" },
    { code: "0003", name: "BANCO INDUSTRIAL DE VENEZUELA" },
    { code: "0173", name: "BANCO INTERNACIONAL DE DESARROLLO" },
    { code: "0105", name: "MERCANTIL" },
    { code: "0191", name: "BANCO NACIONAL DE CREDITO" },
    { code: "0116", name: "BANCO OCCIDENTAL DE DESCUENTO" },
    { code: "0138", name: "BANCO PLAZA" },
    { code: "0108", name: "BANCO PROVINCIAL BBVA" },
    { code: "0104", name: "BANCO VENEZOLANO DE CREDITO" },
    { code: "0168", name: "BANCRECER" },
    { code: "0134", name: "BANESCO" },
    { code: "0177", name: "BANFANB" },
    { code: "0146", name: "BANGENTE" },
    { code: "0174", name: "BANPLUS" },
    { code: "0190", name: "CITIBANK" },
    { code: "0121", name: "CORP BANCA" },
    { code: "0157", name: "DELSUR" },
    { code: "0151", name: "FONDO COMUN" },
    { code: "0601", name: "INSTITUTO MUNICIPAL DE CRÉDITO POPULAR" },
    { code: "0169", name: "MIBANCO" },
    { code: "0137", name: "SOFITASA" }
];

// Bank data structure
interface Bank {
    code: string;
    name: string;
}

export default function PagoMovil() {
    const [selectedBank, setSelectedBank] = useState<string>('');
    return (
        <>
            <h2 className="col-span-full text-lg font-medium text-gray-900 mt-4">Pago Móvil</h2>

            {/* Bank Selection */}
            <div className="col-span-full">
                <label htmlFor="bank" className="block text-sm font-medium text-gray-700">
                    Select Bank
                </label>
                <div className="mt-1">
                    <Select value={selectedBank} onValueChange={(value) => setSelectedBank(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a bank" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[20rem]">
                            {PAGO_MOVIL_BANKS.map((bank) => (
                                <SelectItem key={bank.code} value={bank.code}>
                                    {bank.code} - {bank.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="col-span-full">
                {/* TODO: add a select input for the 4 number carrier code */}
                <div className="mt-1">
                    <Input
                        type="text"
                        id="pago-movil-phone"
                        name="pago-movil-phone"
                        autoComplete="tel"
                        placeholder="Phone number"
                    />
                </div>
            </div>
            <div className="col-span-full">
                <div className="mt-1">
                    <Input
                        type="text"
                        id="pago-movil-confirmation"
                        name="pago-movil-confirmation"
                        placeholder="Transaction confirmation"
                    />
                </div>
            </div>
        </>

    )

}
