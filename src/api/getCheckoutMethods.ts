export default async function getCheckoutMethods(): Promise<string[]> {
    const response = await fetch(`/api/checkout/methods`);
    const methods: string[] = await response.json();
    return methods;
}
