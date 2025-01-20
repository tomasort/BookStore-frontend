import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon,
} from '@heroicons/react/24/outline'

const sidebarNavigation = [
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Deployments', href: '#', icon: ServerIcon, current: false },
    { name: 'Activity', href: '#', icon: SignalIcon, current: false },
    { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
    { name: 'Usages', href: '#', icon: ChartBarSquareIcon, current: false },
    { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UserSidebar() {
    return (
        <div className="hidden xl:flex xl:flex-col xl:col-span-1 ring-1 ring-white/5">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="gap-y-5 overflow-y-auto px-6 ring-1 ring-white/5 sticky top-5">
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {sidebarNavigation.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-800 '
                                                    : 'text-gray-400 hover: hover:bg-gray-800',
                                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                            )}
                                        >
                                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
