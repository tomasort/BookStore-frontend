import { ReviewsData as ReviewsDataType } from '../types'
import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ReviewStats({ reviewsData }: { reviewsData: ReviewsDataType | undefined }) {
    if (!reviewsData) {
        return <div>Loading</div>
    }
    console.log(reviewsData)

    return (
        <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
                {reviewsData.counts.map((count) => (
                    <div key={count.rating} className="flex items-center text-sm">
                        <dt className="flex flex-1 items-center">
                            <p className="w-3 font-medium text-gray-900">
                                {count.rating}
                                <span className="sr-only"> star reviews</span>
                            </p>
                            <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                                <StarIcon
                                    className={classNames(
                                        count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />

                                <div className="relative ml-3 flex-1">
                                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                    {count.count > 0 ? (
                                        <div
                                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                            style={{ width: `calc(${count.count} / ${reviewsData.total_count} * 100%)` }}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </dt>
                        <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                            {reviewsData.total_count > 0 ? Math.round((count.count / reviewsData.total_count) * 100) : 0}%
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
