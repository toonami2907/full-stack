import { useSelector } from 'react-redux';
import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from 'react-router-dom';


interface User {
    username: string;
    profilePhoto: string;
}

interface RootState {
    user: {
        currentUser: User | null;
    }
}

export default function AnotherHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const { currentUser } = useSelector((state: RootState) => state.user);

    return (
        <nav className="navbar bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">App Cut</span>
          </a>
          <button
            onClick={toggleMenu}
            type="button"
            className="menu-toggle inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <span className="sr-only">Open main menu</span>
            <Menu size={24} />
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="menu font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="/" className="menu-item block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">
                 Home
                </a>
              </li>
              <li>
                <a href="#" className="menu-item block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
              </li>
              {currentUser ? (
                    <Link to="/profile" className="text-gray-200 hover:text-gray-400 mr-4">Profile</Link>
                ) : (
                    <Link to="/signin" className="text-gray-200 hover:text-gray-400 mr-4">Sign in</Link>
                )}
                {currentUser ? (
                    <Link to="/signout" className="text-gray-200 hover:text-gray-400">Sign out</Link>
                ) : (
                    <Link to="/signup" className="text-gray-200 hover:text-gray-400">Sign up</Link>
                )}
            </ul>
          </div>
        </div>
      </nav>
    );
}

  
