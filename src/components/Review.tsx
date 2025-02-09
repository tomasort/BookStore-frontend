import { StarIcon } from '@heroicons/react/20/solid'
import { Review as ReviewType } from '../types'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Review({ review }: { review: ReviewType }) {
    return (
        <div key={review.id} className="py-12">
            <div className="flex items-center">
                <div>
                    <h4 className="text-sm font-bold text-gray-900">{review.user.username}</h4>
                    <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={rating}
                                className={classNames(
                                    review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                    'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <p className="sr-only">{review.rating} out of 5 stars</p>
                </div>
            </div>

            <div
                className="mt-4 space-y-6 text-base italic text-gray-600"
                dangerouslySetInnerHTML={{ __html: review.comment }}
            />
        </div>
    )
}
