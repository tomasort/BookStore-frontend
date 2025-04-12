// TODO: Change this to actual oauth links for Twitter, Facebook or other social media (removing github)
function SocialLogin() {
    return (
        <div>
            <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                    href="#"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                >
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675..." />
                    </svg>
                    <span className="text-sm font-semibold leading-6">Twitter</span>
                </a>
                <a
                    href="#"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                >
                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0C4.477 0 0 4.484 0 10.017..." />
                    </svg>
                    <span className="text-sm font-semibold leading-6">Facebook</span>
                </a>
            </div>
        </div>
    );
};

export default SocialLogin;

