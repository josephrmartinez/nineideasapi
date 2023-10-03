const asyncHandler = require('express-async-handler');
const List = require('../models/list');
const OpenAI = require('openai')
require('dotenv').config()

const listController = {
  createList: asyncHandler(async (req, res) => {
    // Implement logic to create a new list based on the request data
    const newList = new List(
      { topic: req.body.topic,
        ideas: req.body.ideas,
        author: req.body.author,
        timeStarted: req.body.timeStarted
      });
      await newList.save()
      res.status(201).json(newList);
  }),


  // getAllLists: asyncHandler(async (req, res) => {
  //   try {
  //     // Implement logic to fetch all published lists with visibility set to "public"
  //     const lists = await List.find({ public: true })
  //       .sort({ timeCompleted: -1 }) // Sort by timeCompleted in descending order
  //       .limit(20) // Limit the result to 20 documents
  //       .populate({path: "author", select: "username"})
  //       .populate({path: "topic", select: "name"})
  //       .exec();
  //     // Respond with the lists data
  //     res.json(lists);
  //   } catch (error) {
  //     // Handle any errors that occur during the database query or processing
  //     res.status(500).json({ error: 'An error occurred while fetching lists' });
  //   }
  // }),


  getLists: asyncHandler(async (req, res) => {
    try {
      const page = req.params.page || 1;

      console.log("req.params.page", req.params.page)
      console.log("page", page)
  
      const pageSize = 20
      // Calculate the skip value based on the page and pageSize
      const skip = (page - 1) * pageSize;
  
      // Implement logic to fetch all published lists with visibility set to "public"
      const lists = await List.find({ public: true })
        .sort({ timeCompleted: -1 }) // Sort by timeCompleted in descending order
        .skip(skip) // Skip the specified number of documents
        .limit(Number(pageSize)) // Limit the result to the specified number of documents
        .populate({ path: "author", select: "username" })
        .populate({ path: "topic", select: "name" })
        .exec();
  
      // Respond with the lists data
      res.json(lists);
    } catch (error) {
      // Handle any errors that occur during the database query or processing
      res.status(500).json({ error: 'An error occurred while fetching lists' });
    }
  }),
  

  getListById: asyncHandler(async (req, res) => {
    // Implement logic to find and return a list by ID
    const list = await List.findById(req.params.id)
      .populate({path: "author", select: "username"})
      .populate({path: "topic", select: "name"})
      .populate("ideas")
      .exec();
    // Respond with the list details
    res.json(list);
  }),

  updateList: asyncHandler(async (req, res) => {
    // Implement logic to update the list details based on the request data
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // Respond with the updated list details
    res.json(updatedList);
  }),


  // UNABLE TO UPDATE A LIST TEXT FIELD IN THIS MANNER
  // BUT I AM ABLE TO SUCCESSFULLY UPDATE THE LIST TEXT FIELD VIA THE UPDATEIDEABYID ENDPOINT
  patchUpdateList: asyncHandler(async (req, res) => {
    try {
      const { updates } = req.body;
      // console.log("updates", updates)
  
      const updatedList = await List.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updates },
        { new: true }
      );
  
      if (!updatedList) {
        return res.status(404).json({ error: 'Error making patch update to list' });
      }
  
      res.json(updatedList);
      // console.log("updated list:", updatedList);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }),
  

  deleteList: asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id)
      .populate("author")
      .exec();

    if (list) {
      const authorId = list.author._id
      console.log("extracted author ID:", authorId)

      // Implement logic to delete the list by ID
      await List.findByIdAndDelete(req.params.id);
      // Respond with an OK status and the author ID
      res.status(200).json(authorId);
    }
  }),


  contentModeration: asyncHandler(async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({apiKey: apiKey});

    const ideaListText = req.body.ideaList.map(idea => idea.text)

    try {
    
        const prompt = 
        `You are a content moderation tool that evaluates the ideaList provided by a user. 
        The ideaList is an array of text-based ideas. 
        Your task is to analyze the ideaList below and classify it as either 'readable content' or 'unreadable content.'
        'Readable content' should be identified when all of the ideaList contains meaningful words, phrases, or sentences that represent genuine ideas or thoughts.
        'Unreadable content' should be detected when the ideaList is comprised of gibberish, random characters, or nonsense text, such as 'dsafkj dsflkjasdkjlhsa djklsdaf asdkjhf.'

        Please take the ideaList deliniated by three asterisks below as input and return a boolean value indicating whether the list contains 'readable content' (true) or 'unreadable content' (false).
        If there is any unreadable content at all, you should return 'false'.

        The goal is to identify whether the text represents genuine ideas or is simply nonsensical.

        ***
        ${ideaListText}
        ***

        `;


        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: prompt }
            ]
            });

        const generatedText = completion.choices[0].message.content;

        // Parse the generatedText to extract the boolean value (true or false) indicating 'readable content'
        const isReadableContent = generatedText.trim().toLowerCase() === "true";

        res.json(isReadableContent) 

    } catch (error) {
        console.error('Error with content moderation:', error);
        throw error;
      }  
  }
  )

};

module.exports = listController;