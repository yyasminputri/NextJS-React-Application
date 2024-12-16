"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

export const Navbar = () => {
  const navigation = [
    { name: "🏠 Dashboard", href: "/" },
    { name: "📂 Categories", href: "/categories" },
    { name: "❤️ Favorites", href: "/favorites" },
    { name: "🍳 Add Recipe", href: "/add-recipe" },
  ];

  const handleLogout = () => {
    console.log("User logged out!");
    window.location.href = "/login";
  };

  return (
    <div className="w-full font-poppins">
      <nav className="container relative flex flex-wrap items-center justify-between p-6 mx-auto lg:justify-between xl:px-1">
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-lg font-medium text-white">
            <Image
              src="/img/logo.png"
              width="24"
              alt="Logo"
              height="24"
              className="w-6"
            />
            <span>Powerpuff</span>
          </span>
        </Link>

        {/* Right Section */}
        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          <ThemeChanger />
          <div className="hidden mr-3 lg:flex nav__item">
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5 hover:bg-indigo-500 transition-all"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton
                aria-label="Toggle Menu"
                className="px-2 py-1 text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </DisclosureButton>

              <DisclosurePanel className="flex flex-col w-full mt-4 lg:hidden">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="px-4 py-2 text-lg text-gray-800 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:bg-indigo-100 transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 mt-2 text-center text-white bg-red-500 rounded-md hover:bg-red-400 transition-all"
                >
                  Log Out
                </button>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="flex items-center space-x-6">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-indigo-500 transition-all"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};