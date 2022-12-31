const { StoryModel } = require("../models");
const { s3 } = require("../../utils/awsS3");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/appErrors");

// DB operations
class StoryRepository {
  async getAudioS3({ res, fileKey }) {
    try {
      const options = {
        Bucket: "chat-with-ai",
        Key: fileKey,
      };
      res.attachment(fileKey);
      const fileStream = await s3.getObject(options).createReadStream();
      return fileStream;
    } catch (err) {
      throw err;
    }
  }
  async deleteAudioS3({ fileKey }) {
    try {
      const options = {
        Bucket: "chat-with-ai",
        Key: fileKey,
      };
      const { $response } = await s3.deleteObject(options).promise();
      return $response;
    } catch (err) {
      throw err;
    }
  }

  async addStory({ storyInput }) {
    try {
      const story = new StoryModel({
        title: storyInput.title,
        body: storyInput.body,
        slug: storyInput.slug,
        fileKey: storyInput.fileKey,
        image: storyInput.image
      });
      return await story.save();
    } catch (err) {
      throw err;
    }
  }
  async checkStory({ title, fileKey }) {
    const story = await StoryModel.findOne({ $or: [{ title }, { fileKey }] });
    return story ? true : false;
  }
  async getStory({ storyId, slug }) {
    try {
      let story;
      if(storyId){
        story = await StoryModel.findById(storyId);
      }else{
        story = await StoryModel.findOne({slug});
      }
      
      return story;
    } catch (err) {
      throw err;
    }
  }
  async getAllStories({ perPage, page }) {
    try {
      const stories = await StoryModel.find()
        .limit(perPage)
        .skip(perPage * page)
        .sort({ updatedAt: -1 });
      return stories;
    } catch (err) {
      throw err;
    }
  }

  async deleteStory({ _id }) {
    try {
      const deletedStory = await StoryModel.findByIdAndRemove(_id);
      return deletedStory;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = StoryRepository;
