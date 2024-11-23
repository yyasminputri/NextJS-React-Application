"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Disclosure,
  Transition,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";

export function PopupWidget() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const userName = useWatch({ control, name: "name", defaultValue: "Someone" });

  const onSubmit = async (data: any, e: any) => {
    console.log(data);
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data, null, 2),
    })
      .then(async (response) => {
        let json = await response.json();
        if (json.success) {
          console.log("Form submitted successfully:", json.message);
          e.target.reset();
          reset();
        } else {
          console.log("Form submission failed:", json.message);
        }
      })
      .catch((error) => {
        console.log("Client Error. See details:", error);
      });
  };

  return (
    <div>
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="fixed z-40 flex items-center justify-center transition duration-300 bg-indigo-500 rounded-full shadow-lg right-5 bottom-5 w-14 h-14 focus:outline-none hover:bg-indigo-600 focus:bg-indigo-600 ease">
              <span className="sr-only">Open Contact form Widget</span>
              <Transition
                show={!open}
                enter="transition duration-200 transform ease"
                enterFrom="opacity-0 -rotate-45 scale-75"
                leave="transition duration-100 transform ease"
                leaveTo="opacity-0 -rotate-45"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-6 h-6 text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </Transition>

              <Transition
                show={open}
                enter="transition duration-200 transform ease"
                enterFrom="opacity-0 rotate-45 scale-75"
                leave="transition duration-100 transform ease"
                leaveTo="opacity-0 rotate-45"
                className="absolute w-6 h-6 text-white"
                as={"div"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </Transition>
            </DisclosureButton>
            <Transition
              className="fixed z-50 bottom-[100px] top-0 right-0 left-0 sm:top-auto sm:right-5 sm:left-auto"
              enter="transition duration-200 transform ease"
              enterFrom="opacity-0 translate-y-5"
              leave="transition duration-200 transform ease"
              leaveTo="opacity-0 translate-y-5"
              as="div"
            >
              <DisclosurePanel className="flex flex-col overflow-hidden left-0 h-full w-full sm:w-[350px] min-h-[250px] sm:h-[600px] border border-gray-300 dark:border-gray-800 bg-white shadow-2xl rounded-md sm:max-h-[calc(100vh-120px)]">
                <div className="flex flex-col items-center justify-center h-32 p-5 bg-indigo-600">
                  <h3 className="text-lg text-white">How can we help?</h3>
                  <p className="text-white opacity-50">
                    We usually respond in a few hours
                  </p>
                </div>
                <div className="flex-grow h-full p-6 overflow-auto bg-gray-50">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <input
                      type="hidden"
                      value="YOUR_ACCESS_KEY_HERE"
                      {...register("apikey")}
                    />
                    <input
                      type="hidden"
                      value={`${userName} sent a message from Nextly`}
                      {...register("subject")}
                    />
                    <input
                      type="hidden"
                      value="Nextly Template"
                      {...register("from_name")}
                    />
                    <input
                      type="checkbox"
                      className="hidden"
                      style={{ display: "none" }}
                      {...register("botcheck")}
                    ></input>

                    <div className="mb-4">
                      <label
                        htmlFor="full_name"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        placeholder="John Doe"
                        {...register("name", { maxLength: 80 })}
                        className={`w-full px-3 py-2 text-gray-600 placeholder-gray-300 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring border-gray-300 focus:border-indigo-600 ring-indigo-100`}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        placeholder="you@company.com"
                        className={`w-full px-3 py-2 text-gray-600 placeholder-gray-300 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring border-gray-300 focus:border-indigo-600 ring-indigo-100`}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Your Message
                      </label>
                      <textarea
                        rows={4}
                        id="message"
                        {...register("message")}
                        placeholder="Your Message"
                        className={`w-full px-3 py-2 text-gray-600 placeholder-gray-300 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring border-gray-300 focus:border-indigo-600 ring-indigo-100`}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                      >
                        {isSubmitting ? (
                          <svg
                            className="w-5 h-5 mx-auto text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                    <p
                      className="text-xs text-center text-gray-400"
                      id="result"
                    >
                      <span>
                        Powered by{" "}
                        <a
                          href="https://Web3Forms.com"
                          className="text-gray-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Powerpuff
                        </a>
                      </span>
                    </p>
                  </form>
                </div>
              </DisclosurePanel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
