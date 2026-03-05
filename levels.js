let levels = [
  {
    name: "Pixel Thread", // Clothing store
    bgImg: "assets/clothingStore.png",
    subLevels: [
      {
        sentence: "Do you have thick black UV sunglasses ", // level 1 sunglasses
        question: "Welcome, do you need help finding cool sunglasses?",
        intrusiveRate: 300,
        timeLimit: 45,
        distractors: 3,
      },
      {
        sentence: "I'm looking for hats in different colours if you have them ", // level 2 hat
        question: "What colour hat are you looking for today?",
        intrusiveRate: 220,
        timeLimit: 35,
        distractors: 4,
      },
      {
        sentence:  "Hi I was wondering if this jacket comes in another size", //level 3 tshirt
        question: "Chilly weather today? What are you looking for?",
        intrusiveRate: 150,
        timeLimit: 25,
        distractors: 6,
      },
    ],
  },

  {
    name: "Pixel Pages", //book store
    bgImg: "assets/bookStore.png",
    subLevels: [
      {
        sentence: "Can you recommend a mystery book", // Book 1:Novel
        question: "What genre are you interested in?",
        intrusiveRate: 300,
        timeLimit: 45,
        distractors: 3,
      },
      {
        sentence: "Can you recommend fiction genre for starting readers", //Book 2: 
        question: "Do you prefer fiction or non fiction?",
        intrusiveRate: 220,
        timeLimit: 35,
        distractors: 4,
      },
      {
        sentence:
          "Can I please have a brown teddy bear with a red bow?", //Teddy bear 
        question: "What kind of plushy are you looking for?",
        intrusiveRate: 150,
        timeLimit: 25,
        distractors: 6,
      },
    ],
  },

  {
    name: "Bloom & Pixel", //flower store
    bgImg: "assets/flowerStore.png",
    subLevels: [
      {
        sentence: "Can I get pink roses",  // roses
        question: "What flowers would you like?",
        intrusiveRate: 300,
        timeLimit: 45,
        distractors: 3,
      },
      {
        sentence: "These flower is for my Mom's Birthday", //sunflower
        question: "Are these for a special occasion?",
        intrusiveRate: 220,
        timeLimit: 35,
        distractors: 4,
      },
      {
        sentence:
          "Can I get a bouquet of roses lilies and tulips for a anniversary", //bouquet
        question: "What kind of arrangement are you looking for?",
        intrusiveRate: 150,
        timeLimit: 25,
        distractors: 6,
      },
    ],
  },

  {
    name: "Pixel Coffee", //coffee shop
    bgImg: "assets/coffeeStore.png",
    subLevels: [
      {
        sentence: "I would like a chocolate croissant", // croissant
        question: "What croissant would you like?",
        intrusiveRate: 300,
        timeLimit: 45,
        distractors: 3,
      },
      {
        sentence: "I would like a small vanilla latte with oat milk",
        question: "What size and flavor would you like?", //Coffee
        intrusiveRate: 220,
        timeLimit: 35,
        distractors: 4,
      },
      {
        sentence:
          "Can I get the strawberry cake slice with extra topping?", //cake
        question: "What can I get started for you today?",
        intrusiveRate: 150,
        timeLimit: 25,
        distractors: 6,
      },
    ],
  },
];
