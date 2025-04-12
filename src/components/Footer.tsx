import Newsletter from './Newsletter'
export default function Footer() {
    const footerNavigation = {
        products: [
            { name: 'Books', href: '#' },
            { name: 'Others', href: '#' },
        ],
        company: [
            { name: 'Who we are', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Terms & Conditions', href: '#' },
            { name: 'Privacy', href: '#' },
        ],
        customerService: [
            { name: 'Contact', href: '#' },
            { name: 'Shipping', href: '#' },
            { name: 'Returns', href: '#' },
            { name: 'Warranty', href: '#' },
            { name: 'Secure Payments', href: '#' },
            { name: 'FAQ', href: '#' },
            { name: 'Find a store', href: '#' },
        ],
    }
    return (
        <footer aria-labelledby="footer-heading" className="bg-white">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 py-20">
                    <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
                        <div className="pt-4 col-span-1 row-start-3 md:row-start-1 md:col-start-2 md:col-span-2 lg:col-start-1 lg:row-start-1">
                            <img
                                src="./bookIconRed.png"
                                alt=""
                                className="h-10 w-auto"
                            />
                        </div>

                        {/* Newsletter section */}
                        <div className="mt-12 md:col-span-8 md:col-start-4 md:row-start-1 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                            <Newsletter />
                        </div>

                        {/* Sitemap sections */}
                        <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-6 lg:col-start-2 lg:row-start-1">
                            <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Products</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.products.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.company.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                                <ul role="list" className="mt-6 space-y-6">
                                    {footerNavigation.customerService.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="border-t border-gray-100 py-10 text-center">
                    <p className="text-sm text-gray-500">&copy; 2025 Your Company, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}
