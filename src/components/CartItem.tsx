import { CartItem as CartItemType } from "../types"
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'

const leadTime = 3


interface CartItemProps {
    item: CartItemType,
    updateQuantity: (bookId: number, quantity: number) => void
}

export default function CartItem({ item, updateQuantity }: CartItemProps) {
    return (
        <>
            {/* Image Container */}
            <div className="flex-shrink-0">
                {item.book.cover_url === null ? (
                    <div className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32">
                        <span className="text-gray-400">Image not available</span>
                    </div>
                ) : (
                    <img
                        src={`/images${item.book.cover_url}`}
                        alt={`Cover of ${item.book.title}`}
                        className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                    />
                )}
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div>
                    <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                            <h3 className="text-sm">
                                <a href={`/book/${item.book.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                    {item.book.title}
                                </a>
                            </h3>
                            {item.book.authors.map((author, index) => (
                                <p key={index} className="mt-1 text-sm text-gray-500">{author.name}</p>
                            ))}
                        </div>

                        <p className="text-right text-sm font-medium text-gray-900">{item.book.current_price}</p>
                    </div>

                    <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">
                            Quantity, {item.book.title}
                        </label>
                        <select
                            id={`quantity-${item.id}`}
                            name={`quantity-${item.id}`}
                            className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.book.id, parseInt(e.target.value))}
                        >
                            {
                                Array.from({ length: 8 }, (_, i) => i + (item.quantity > 4 ? item.quantity - 4 : 1)).map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))
                            }
                        </select>

                        <button
                            type="button"
                            className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                            onClick={() => updateQuantity(item.book.id, 0)}
                        >
                            <span>Remove</span>
                        </button>
                    </div>
                </div>

                {
                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        {item.in_stock ? (
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        ) : (
                            <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                        )}
                        <span>{item.in_stock ? 'In stock' : `Ships in ${leadTime}`}</span>
                    </p>
                }
            </div>
        </>
    )
}
