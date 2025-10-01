import Link from 'next/link';
import { FaHome } from 'react-icons/fa'; 

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#905D06] to-[#E5A000] flex flex-col justify-center items-center text-white quattrocento-regular">
      {/* Main Heading */}
      <h1 className="text-6xl font-bold mb-4">Oops! 😱</h1>
      <p className="text-2xl mb-8">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>

      {/* Funny Message */}
      <p className="text-lg mb-8 text-center max-w-md">
        Maybe it was abducted by aliens 👽, or it just took a wrong turn into the Internet wilderness! Either way, it&apos;s not here.
      </p>

      {/* Button to navigate back */}
      <Link
        href="/"
        className="flex items-center space-x-2 bg-[#E6E6E6] text-[#2C2C2C] hover:bg-blue-600 py-3 px-6 rounded-lg transition duration-300 quattrocento-bold"
      >
        <FaHome size={20} />
        <span>Go Back Home</span>
      </Link>
    </div>
  );
}
