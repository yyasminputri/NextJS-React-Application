"use client";
import React from "react";
import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0 font-poppins">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full px-4 py-4 text-sm md:text-base text-left text-gray-800 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-200 focus-visible:ring-opacity-75 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "Is Powerpuff Recipe completely free to use?",
    answer: "Yes, our platform is 100% free for browsing, saving, and sharing recipes.",
  },
  {
    question: "Can I upload my own recipes?",
    answer: "Absolutely! You can easily add your own recipes to share with the community.",
  },
  {
    question: "How can I save my favorite recipes?",
    answer:
      "Simply click the heart icon on a recipe, and it will be added to your favorites list.",
  },
  {
    question: "Do I need an account to access all features?",
    answer:
      "Yes, creating an account is necessary to save favorites, upload recipes, and personalize your experience.",
  },
];
