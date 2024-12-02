// FILE: pages/api/favorites.js

export default function handler(req, res) {
    // Sample data for favorite dishes
    const uniqueCategories = [
      {
        id: 1,
        name: "Spaghetti Carbonara",
        description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        category: "Italian",
        logo: "/img/recipes/spaghetti-carbonara.jpg",
        year: 2021,
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        description: "A popular Indian curry dish made with marinated chicken in a spiced tomato sauce.",
        category: "Indian",
        logo: "/img/recipes/chicken-tikka-masala.jpg",
        year: 2020,
      },
      {
        id: 3,
        name: "Sushi",
        description: "A traditional Japanese dish made with vinegared rice, raw fish, and vegetables.",
        category: "Japanese",
        logo: "/img/recipes/sushi.jpg",
        year: 2019,
      },
      {
        id: 4,
        name: "Tacos",
        description: "A traditional Mexican dish made with folded or rolled tortillas filled with various ingredients.",
        category: "Mexican",
        logo: "/img/recipes/tacos.jpg",
        year: 2022,
      },
      {
        id: 5,
        name: "Pad Thai",
        description: "A stir-fried rice noodle dish commonly served as street food in Thailand.",
        category: "Thai",
        logo: "/img/recipes/pad-thai.jpg",
        year: 2021,
      },
    ];
  
    // Return the favorite dishes as a JSON response
    res.status(200).json(uniqueCategories);
  }