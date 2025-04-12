// import { LockClosedIcon } from '@heroicons/react/20/solid'
// import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
// import { useState, useEffect } from 'react'

// export default function CheckoutForm({
//     total,
//     setShipping,
//     selectedPaymentMethod,
//     setSelectedPaymentMethod
// }) {
//     // Form state
//     const [formData, setFormData] = useState({
//         email: '',
//         address: '',
//         city: '',
//         region: '',
//         postalCode: '',
//         nameOnCard: '',
//         cardNumber: '',
//         expirationDate: '',
//         cvc: '',
//     })

//     // Step completion status
//     const [completedSteps, setCompletedSteps] = useState({
//         contact: false,
//         shipping: false,
//         payment: false
//     })

//     // Which step is currently expanded
//     const [expandedStep, setExpandedStep] = useState('contact')

//     // Track which fields have been modified
//     const [touchedFields, setTouchedFields] = useState({})

//     const handleInputChange = (e) => {
//         const { name, value } = e.target

//         // Update form data
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }))

//         // Mark field as touched
//         setTouchedFields(prev => ({
//             ...prev,
//             [name]: true
//         }))
//     }

//     // Check if contact section is complete
//     useEffect(() => {
//         const isContactComplete = formData.email && formData.email.includes('@')

//         setCompletedSteps(prev => ({
//             ...prev,
//             contact: isContactComplete
//         }))

//         // Auto-expand the next incomplete step
//         if (isContactComplete && expandedStep === 'contact') {
//             setExpandedStep('shipping')
//         }
//     }, [formData.email, expandedStep])

//     // Check if shipping section is complete
//     useEffect(() => {
//         const isShippingComplete =
//             formData.address &&
//             formData.city &&
//             formData.region &&
//             formData.postalCode

//         setCompletedSteps(prev => ({
//             ...prev,
//             shipping: isShippingComplete
//         }))

//         // Auto-expand the next incomplete step
//         if (isShippingComplete && expandedStep === 'shipping') {
//             setExpandedStep('payment')
//         }
//     }, [formData.address, formData.city, formData.region, formData.postalCode, expandedStep])

//     // Toggle a step's expanded state
//     const toggleStep = (step) => {
//         // Only allow expanding a step if previous steps are completed
//         if (step === 'shipping' && !completedSteps.contact) return
//         if (step === 'payment' && (!completedSteps.contact || !completedSteps.shipping)) return

//         setExpandedStep(current => current === step ? null : step)
//     }

//     // Get appropriate class name for a step
//     const getStepClassName = (step) => {
//         let baseClass = "border rounded-md mb-4 transition-all duration-200"

//         // If step is disabled
//         if ((step === 'shipping' && !completedSteps.contact) ||
//             (step === 'payment' && (!completedSteps.contact || !completedSteps.shipping))) {
//             return `${baseClass} opacity-50`
//         }

//         // If step is completed
//         if (completedSteps[step]) {
//             return `${baseClass} border-green-500`
//         }

//         // If step is active
//         if (expandedStep === step) {
//             return `${baseClass} border-indigo-500 shadow-md`
//         }

//         return `${baseClass} border-gray-300 hover:border-gray-400`
//     }

//     return (
//         <div className="mt-6">
//             <form>
//                 {/* Contact Step */}
//                 <div className={getStepClassName('contact')}>
//                     <button
//                         type="button"
//                         onClick={() => toggleStep('contact')}
//                         className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none"
//                     >
//                         <div className="flex items-center">
//                             {completedSteps.contact && (
//                                 <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
//                             )}
//                             <span className="font-medium text-gray-900">1. Contact Information</span>
//                         </div>
//                         {expandedStep === 'contact' ? (
//                             <ChevronUpIcon className="h-5 w-5 text-gray-500" />
//                         ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-gray-500" />
//                         )}
//                     </button>

//                     {expandedStep === 'contact' && (
//                         <div className="px-4 pb-4">
//                             <div className="col-span-full">
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                     Email address
//                                 </label>
//                                 <div className="mt-1">
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleInputChange}
//                                         autoComplete="email"
//                                         className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Shipping Step */}
//                 <div className={getStepClassName('shipping')}>
//                     <button
//                         type="button"
//                         onClick={() => toggleStep('shipping')}
//                         className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none"
//                         disabled={!completedSteps.contact}
//                     >
//                         <div className="flex items-center">
//                             {completedSteps.shipping && (
//                                 <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
//                             )}
//                             <span className="font-medium text-gray-900">2. Shipping Details</span>
//                         </div>
//                         {expandedStep === 'shipping' ? (
//                             <ChevronUpIcon className="h-5 w-5 text-gray-500" />
//                         ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-gray-500" />
//                         )}
//                     </button>

//                     {expandedStep === 'shipping' && (
//                         <div className="px-4 pb-4">
//                             <div className="space-y-4">
//                                 <div className="col-span-full">
//                                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                                         Address
//                                     </label>
//                                     <div className="mt-1">
//                                         <input
//                                             type="text"
//                                             id="address"
//                                             name="address"
//                                             value={formData.address}
//                                             onChange={handleInputChange}
//                                             autoComplete="street-address"
//                                             className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
//                                     <div>
//                                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                                             City
//                                         </label>
//                                         <div className="mt-1">
//                                             <input
//                                                 type="text"
//                                                 id="city"
//                                                 name="city"
//                                                 value={formData.city}
//                                                 onChange={handleInputChange}
//                                                 autoComplete="address-level2"
//                                                 className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label htmlFor="region" className="block text-sm font-medium text-gray-700">
//                                             State / Province
//                                         </label>
//                                         <div className="mt-1">
//                                             <input
//                                                 type="text"
//                                                 id="region"
//                                                 name="region"
//                                                 value={formData.region}
//                                                 onChange={handleInputChange}
//                                                 autoComplete="address-level1"
//                                                 className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
//                                             Postal code
//                                         </label>
//                                         <div className="mt-1">
//                                             <input
//                                                 type="text"
//                                                 id="postalCode"
//                                                 name="postalCode"
//                                                 value={formData.postalCode}
//                                                 onChange={handleInputChange}
//                                                 autoComplete="postal-code"
//                                                 className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Payment Step */}
//                 <div className={getStepClassName('payment')}>
//                     <button
//                         type="button"
//                         onClick={() => toggleStep('payment')}
//                         className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none"
//                         disabled={!completedSteps.contact || !completedSteps.shipping}
//                     >
//                         <div className="flex items-center">
//                             {completedSteps.payment && (
//                                 <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
//                             )}
//                             <span className="font-medium text-gray-900">3. Payment Method</span>
//                         </div>
//                         {expandedStep === 'payment' ? (
//                             <ChevronUpIcon className="h-5 w-5 text-gray-500" />
//                         ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-gray-500" />
//                         )}
//                     </button>

//                     {expandedStep === 'payment' && (
//                         <div className="px-4 pb-4">
//                             {/* Payment Methods Selection */}
//                             <div className="mb-6">
//                                 <div className="text-sm text-gray-700 mb-4">
//                                     Selected payment method: {selectedPaymentMethod}
//                                 </div>
//                             </div>

//                             {/* Credit Card Details */}
//                             <div className="space-y-4">
//                                 <div className="col-span-full">
//                                     <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
//                                         Name on card
//                                     </label>
//                                     <div className="mt-1">
//                                         <input
//                                             type="text"
//                                             id="nameOnCard"
//                                             name="nameOnCard"
//                                             value={formData.nameOnCard}
//                                             onChange={handleInputChange}
//                                             autoComplete="cc-name"
//                                             className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="col-span-full">
//                                     <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
//                                         Card number
//                                     </label>
//                                     <div className="mt-1">
//                                         <input
//                                             type="text"
//                                             id="cardNumber"
//                                             name="cardNumber"
//                                             value={formData.cardNumber}
//                                             onChange={handleInputChange}
//                                             autoComplete="cc-number"
//                                             className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-3 gap-x-4">
//                                     <div className="col-span-2">
//                                         <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
//                                             Expiration date (MM/YY)
//                                         </label>
//                                         <div className="mt-1">
//                                             <input
//                                                 type="text"
//                                                 name="expirationDate"
//                                                 id="expirationDate"
//                                                 value={formData.expirationDate}
//                                                 onChange={handleInputChange}
//                                                 autoComplete="cc-exp"
//                                                 className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
//                                             CVC
//                                         </label>
//                                         <div className="mt-1">
//                                             <input
//                                                 type="text"
//                                                 name="cvc"
//                                                 id="cvc"
//                                                 value={formData.cvc}
//                                                 onChange={handleInputChange}
//                                                 autoComplete="csc"
//                                                 className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Submit Button - Always Visible */}
//                 <button
//                     type="submit"
//                     disabled={!completedSteps.contact || !completedSteps.shipping}
//                     className={`mt-6 w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${completedSteps.contact && completedSteps.shipping
//                         ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
//                         : 'bg-gray-400 cursor-not-allowed'
//                         }`}
//                 >
//                     Pay ${total.toFixed(2)}
//                 </button>

//                 <p className="mt-6 flex justify-center text-sm font-medium text-gray-500">
//                     <LockClosedIcon className="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
//                     Payment details stored in plain text
//                 </p>
//             </form>
//         </div>
//     )
// }
