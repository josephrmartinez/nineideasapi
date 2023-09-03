#! /usr/bin/env node
const bcrypt = require('bcryptjs');


console.log(
    'This script populates your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);

  const Topic = require("./models/topic");
  // const User = require("./models/user");

  const topics = []
  // const users = []
  
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Connected to DB");
    // await createUsers();
    // await createLists();
    await createTopics(topicsArray);
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function createTopics(topicsArray) {
    try {
      const topicPromises = topicsArray.map(async (name) => {
        const topic = new Topic({ name: name });
        await topic.save();
        return topic;
      });
  
      const createdTopics = await Promise.all(topicPromises);
      topics.push(...createdTopics);
  
      console.log(`Added ${createdTopics.length} topics.`);
    } catch (error) {
      console.error(`Error creating topics: ${error}`);
    }
  }
  


// Function to create a new user
async function userCreate(userDetails) {
    const { username, password, email, bio } = userDetails;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({ 
      username,
      password: hashedPassword,
      email,
      bio
    });
    await newUser.save();
    console.log(`User created: ${username}`);
    return newUser;
  }
  
// Function to create multiple users at once
async function createUsers() {
  console.log("Adding users");
  const usersData = [
    {
      username: "josephm",
      password: "mango",
      email: "joseph.r.martinez@gmail.com",
      bio: "josephm.dev"
    },
    {
      username: "peterg",
      password: "mango",
      email: "peterg@gmail.com",
      bio: "thinking about moving to michigan"
    },
    {
      username: "sashan",
      password: "mango",
      email: "sashan@gmail.com",
      bio: "writing a book"
    },
    {
      username: "timo",
      password: "mango",
      email: "timo@gmail.com",
      bio: "timo.ai"
    },
    {
      username: "mahmoudh",
      password: "mango",
      email: "mahmoudh@gmail.com",
      bio: "open to book suggestions"
    }
  ];

  const createPromises = usersData.map(userCreate);
  await Promise.all(createPromises);
}
  


const topicsArray = 
  [
    "Creative ways to repurpose household items",
    "Ideas for hosting a memorable themed party",
    "Unique ways to display artwork in your home",
    "Creative ways to reduce waste in your daily life",
    "Ideas for using technology to improve mental health",
    "Creative ways to teach children about sustainability",
    "Unique travel destinations off the beaten path",
    "Ideas for starting a social impact project in your community",
    "Creative ways to decorate a small apartment",
    "Unique ideas for an outdoor workout routine",
    "Ideas for using virtual reality technology for education or entertainment",
    "Creative ways to customize your wardrobe on a budget",
    "Unconventional home decor ideas",
    "Ideas for hosting a successful online event or conference",
    "Creative ways to celebrate cultural holidays and traditions with a twist",
    "Unique ways to incorporate music into your daily routine",
    "Ideas for starting a community gathering space",
    "Creative ways to make your workspace more comfortable and productive",
    "Unique ways to give back to your community",
    "Unconventional ways to use social media to boost creativity",
    "Creative challenges to push your artistic boundaries",
    "Ways to incorporate mindfulness into your daily routine for a more expanded mind",
    "Ways to foster creativity in the workplace",
    "Mind-expanding experiences to broaden your perspective",
    "Creative ways to change your living space for a more inspiring environment",
    "Ways to incorporate more physical activity into your daily routine for a healthier mind and body",
    "Creative writing prompts to expand your imagination",
    "Mind-expanding places to go for inspiration",
    "Ideas for challenging yourself to step outside of your comfort zone",
    "Creative ways to overcome writer's block",
    "Ways to cultivate a growth mindset for personal and professional development",
    "Mind-expanding activities to do alone or with friends",
    "Creative ways to incorporate more humor into your life for a lighter perspective",
    "Challenging DIY projects to try for a sense of accomplishment",
    "Ways to expand your knowledge and skills through online courses",
    "Creative strategies for time management and productivity",
    "Unique ways to gain new ideas or perspectives",
    "Ideas for challenging yourself to embrace failure and learn from it.",
    "Ideas for creating a fashion line for pets",
    "Unique ways to approach cooking differently",
    "Ideas for hosting a pop-up museum featuring bizarre collections",
    "Creative ways to design a custom coffin or urn",
    "Unique ways to incorporate fragrance into art",
    "Areas of potential for virtual reality",
    "Creative ways to use 3D printing for food and beverage production",
    "Creative ways to design a themed miniature golf course",
    "Ideas for creating a plant-based musical instrument",
    "Creative ways to use artificial intelligence in fashion design",
    "Unique ways to incorporate scent into interactive theater",
    "Unusual ways to use herbs and spices in your cooking",
    "Home garden possibilities",
    "Ideas for incorporating mindfulness into your daily routine",
    "Unconventional hobbies to try in your free time",
    "Unique ways to organize your workspace",
    "Ideas for hosting a DIY craft party",
    "Creative ways to make your home more eco-friendly",
    "Aspects of your personality you hope others appreciate",
    "Your ideal work environment",
    "Fun and unique date night ideas",
    "Boutique hotel ideas. Location, style, and something special about the property.",
    "Creative ways to transform your backyard into a cozy oasis",
    "Unusual and eye-catching DIY wall art ideas",
    "Ideas for using social media to promote a cause or charity",
    "Unconventional ways to learn a new language",
    "Ideas for connecting adults with new friends",
    "Tips for practicing self-care",
    "Unconventional ways to make money",
    "Ways to give away $1,000",
    "Creative ways to save money",
    "Ideas for a unique and memorable vacation",
    "Unconventional ways to get fit",
    "Creative ways to de-stress",
    "Ideas for parties that I would enjoy going to",
    "Ways to spend one month in another country",
    "Options for spending a gap year between high school and college",
    "Hardcore ways to be more productive",
    "Unconventional ways to connect with nature",
    "Creative ways to give back to your community",
    "The most pressing issues facing your community",
    "Unconventional ways to entertain yourself",
    "What makes a fulfilling and meaningful life",
    "Meetup groups that I would start or join",
    "Unconventional ways to make friends",
    "Specific ways to foster a happy and healthy relationship",
    "Unconventional ways to travel the world",
    "Ways to make a difference in the world",
    "Things I would like to see change in my lifetime",
    "Things that give me hope",
    "Things I would do in a lucid dream.",
    "What I would do with $100,000,000",
    "How to give away $100,000",
    "Ways to connect with nature that will leave you feeling refreshed and rejuvenated",
    "Acts of kindness that will make a positive impact on the lives of others",
    "Good habits to form",
    "Friendship building activities that will help you connect with others on a deeper level",
    "Relationship advice to build and maintain healthy relationships",
    "Travel experiences that will broaden your horizons and change your perspective on the world",
    "Ways to make a difference in the world and leave it a better place", 
    "Some options for the purpose of life",
    "The future of education",
    "The future of healthcare",
    "The future of transportation",
    "The future of food",
    "The future of war",
    "The future of the human race",
    "Innovative ways to utilize space in a tiny home",
    "Artsy ideas for turning junk into jewellery",
    "Methods for turning found objects into functional pieces of furniture",
    "Interesting ways to turn everyday walks into adventures",
    "Unique ideas for unconventional book clubs",
    "Inventive ways to use plants as home decor",
    "Creative ways to turn your home into a jungle station",
    "Inventive ideas for personalized gifts on a budget",
    "Themed dining experiences to try at your next dinner party",
    "Unusual, yet delicious food pairings you need to try",
    "Inventive strategies for teaching kids about personal finance",
    "Unique ways to turn clutter into art installations",
    "Creative ideas for preserving and displaying family memories",
    "Exciting theme ideas for your next game night",
    "Unique ways to turn old technology into modern marvels",
    "Inventive ways to turn neighborhood walks into treasure hunts",
    "Creative methods of transforming your home into a wellness retreat",
    "Unique recipe ideas using only five ingredients or less",
    "Interesting ways to build a time capsule",
    "Inventive ideas for organizing a virtual book club",
    "Creative ways to capture the honesty of human existence in writing",
    "Unconventional work settings that connect us to humanity",
    "Unique ways to explore themes of love, loss, and survival",
    "Ideas for finding beauty in the mundane aspects of life",
    "Improvised art techniques to capture the grit and grace of life",
    "Ways to pen down the stark realities about the human condition",
    "Concepts for stand-up comedy inspired by a self-deprecating life view",
    "Creative drinks that reflect different moods and stages of life",
    "Straightforward writing challenges for more candid storytelling",
    "Precious life lessons from seemingly insignificant moments",
    "Daily practices to stimulate straight-shooting honesty in writing",
    "Creative ways to engage with the unconscious mind",
    "Creating art as a form of self exploration and self therapy",
    "Creative approaches to boost self awareness and personal growth",
    "Unique activities for balancing the masculine and feminine aspects within us",
    "Bold steps to repurpose an old bicycle into a versatile garden art piece",
"Breathtakingly aesthetic revamp ideas for the attic",
"Clever ways to transform home-cleaning routines",
"Sneaky approaches to integrate fitness equipment into home decor",
"Exciting outdoor hobbies to reduce screen time and improve wellness",
"Ways to incorporate more mesmerizing, inspiring, or unique pieces into home or office decor",
"Eco-friendly home improvement projects",
"Inventive concepts for redesigning a room",
"Improvements to make your work space more inspiring",
"Clever approaches to picnic planning in line with different world cultures",
"Turning your home into a peaceful retreat",
"Alternatives for measuring success beyond money",
"Constructive activities to enhance empathy and generosity among children",
"Innovative ways to embed sustainability and eco-consciousness in everyday practices",
"Finding meaning through travel: Turning globe-trotting into spiritual growth",
"Community wealth: Businesses that would meaningfully improve your local area",
"Ways to teach money management",
"Aesthetic expression of values: Incorporating ethics and belief systems into home decor",
"Meaningful traditions: Ideas for new family traditions",
"Inspiring personal growth via solitude: Ideas for creating an introspection spot at home",
"Balancing work and wellness: Home office set up for stress-free productivity",
"Unrealistic but imaginative and unique community spaces",
"Value-based investing: Making your money work for a cause",
"Profit with a purpose: Enterprising routes to starting a community-focused business",
"Strategies for improving mental health through connection with nature"
]