import img1 from '../../assets/Screenshot_49-removebg-preview (1).png';

const Footer = () => {
    return (
        <div className="w-full bg-gray-100 py-5">
            <footer className=" mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    <div>
                        <div className="flex flex-col items-center md:items-start font-bold text-2xl">
                           <div className='flex items-center justify-start'>
                           <img src={img1} alt="Company Logo" className="w-20  mb-2" />
                            <span className="text-[#006dc7]">Collab</span>
                            <span className="">Nest</span>
                           </div>
                        </div>
                        <p className="text-gray-700 text-sm mt-2 ml-5 mb-4 text-center md:text-left">
                            CollabNest is a powerful team collaboration platform designed to streamline communication, task management, and file sharing.
                        </p>
                       <div className='ml-5'>
                       <h4 className="text-lg font-semibold text-gray-800">Follow Us</h4>
                        <div className="flex justify-center md:justify-start space-x-4 mt-2">
                            <a href="#" aria-label="Facebook">
                                <img src="https://img.icons8.com/fluency/48/facebook-new.png" className='w-8 h-8 hover:transition-transform hover:-translate-y-1' alt="Facebook" />
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <img src="https://img.icons8.com/fluency/48/linkedin.png" className='w-8 h-8 hover:transition-transform hover:-translate-y-1' alt="LinkedIn" />
                            </a>
                            <a href="#" aria-label="Instagram">
                                <img src="https://img.icons8.com/fluency/48/instagram-new.png" className='w-8 h-8 hover:transition-transform hover:-translate-y-1' alt="Instagram" />
                            </a>
                            <a href="#" aria-label="Twitter">
                                <img src="https://img.icons8.com/color/48/twitterx--v1.png" className='w-8 h-8 hover:transition-transform hover:-translate-y-1' alt="Twitter" />
                            </a>
                            <a href="#" aria-label="Pinterest">
                                <img src="https://img.icons8.com/color/48/pinterest--v1.png" className='w-8 h-8 hover:transition-transform hover:-translate-y-1' alt="Pinterest" />
                            </a>
                        </div>
                       </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Services</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li><a href="#" className="hover:text-blue-500">Recruitment Services</a></li>
                            <li><a href="#" className="hover:text-blue-500">Support</a></li>
                            <li><a href="#" className="hover:text-blue-500">Security Measures</a></li>
                            <li><a href="#" className="hover:text-blue-500">Copyright Information</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li><a href="#" className="hover:text-blue-500">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-500">Blogs</a></li>
                            <li><a href="#" className="hover:text-blue-500">FAQs</a></li>
                            <li><a href="#" className="hover:text-blue-500">Events</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li><a href="#" className="hover:text-blue-500">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500">Disclaimer</a></li>
                            <li><a href="#" className="hover:text-blue-500">Accessibility Statement</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-gray-600 text-sm mt-8 border-t pt-4">
                    &copy; {new Date().getFullYear()} All Rights Reserved by <span className="font-semibold">CollabNest</span>
                </div>
            </footer>
        </div>
    );
};

export default Footer;