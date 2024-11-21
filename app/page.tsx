import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

import { benefitOne } from "@/components/data";
export default function Home() {
  const recipes = [
    {
      id: 1,
      image: "/img/p1.png", // Ganti dengan path image Anda
      title: "Spicy Tuna Rolls",
      description: "A sushi classic with a spicy twist. Perfect for sushi lovers who enjoy a kick of flavor.",
      buttonLabel: "View All",
    },
    {
      id: 2,
      image: "/img/p2.png", // Ganti dengan path image Anda
      title: "Chicken Katsu Curry with Rice",
      description: "Crispy chicken cutlet served with a rich Japanese curry sauce, garnished with fresh herbs and steamed rice.",
      buttonLabel: "View All",
    },
    {
      id: 3,
      image: "/img/p3.png", // Ganti dengan path image Anda
      title: "Matcha Cheesecake",
      description: "A creamy, rich dessert with the unique flavor of matcha green tea.",
      buttonLabel: "View All",
    },
  ];

  return (
    <Container>
      <Hero />
      {/* Judul besar */}
      <div className="text-center my-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Featured Recipes
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Explore our most popular and delicious recipes!
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full h-48">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {recipe.title}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {recipe.description}
              </p>
              <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                {recipe.buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
      

      <Benefits data={benefitOne} />

      {/* <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>

      <Testimonials /> */}

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
      Get the answers you need! Here are some of the most frequently asked questions to help you navigate and make the most of Powerpuff Recipe.
      </SectionTitle>

      <Faq />
      
    </Container>
  );
}
