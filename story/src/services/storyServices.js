const slugify = require("slugify");
const { StoryRepository } = require("../database");
const { FormateData, FormatJoiMessage } = require("../utils");
const {
  APIError,
  BadRequestError,
  ConflictError,
  STATUS_CODES,
} = require("../utils/appErrors");

// All bussiness logic is here

class StoryService {
  constructor() {
    this.repository = new StoryRepository();
  }
  async getAudio({ res, fileKey }) {
    try {
      return await this.repository.getAudioS3({ res, fileKey });
    } catch (err) {
      throw err;
    }
  }

  async deleteAudio({ res, fileKey }) {
    try {
      const { httpResponse } = await this.repository.deleteAudioS3({ fileKey });
      const { statusCode, statusMessage } = httpResponse;
      const message = FormatJoiMessage(statusMessage);
      return { data: { statusCode, message } };
    } catch (err) {
      throw err;
    }
  }

  async addStory({ storyInput }) {
    try {
      storyInput.slug = slugify(storyInput.title);
      const { title, body, slug, fileKey } = storyInput;
      // check title or file key exist
      const isExist = await this.repository.checkStory({ title, fileKey });
      if (isExist) {
        return {
          error: {
            statusCode: STATUS_CODES.CONFLICT,
            message: "TİTLE_OR_FILE_KEY_ALREDY_EXIST",
          },
        };
      }
      // save story
      const story = await this.repository.addStory({ storyInput });
      return { data: { story } };
    } catch (err) {
      throw err;
    }
  }
  async getStory({ slug }) {
    try {
      const story = await this.repository.getStory({ slug });
      if (!story) {
        return {
          error: {
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: "STORY_DOES_NOT_EXIST",
          },
        };
        return { data: {story}};
      }
      return {data: story}
    } catch (err) {
      throw err;
    }
  }
  async getAllStories({ perPage, page }){
    try{
      // asign default value
      (!Number(page)) ? page = 0 : --page;
      (!perPage) ? perPage = 10: "";

      const stories = await this.repository.getAllStories({perPage,page})
      if (!stories) {
        return {
          error: {
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: "STORY_DOES_NOT_EXIST",
          },
        };
      }
      return { data: stories };
    }catch(err){
      throw err;
    }
  }
  
  async deleteStory({ _id }){
    try{
      const deletedStory = await this.repository.deleteStory({_id})
      if (!deletedStory) {
        return {
          error: {
            statusCode: STATUS_CODES.BAD_REQUEST,
            message: "STORY_DOES_NOT_EXIST",
          },
        };
      }
      return { data: deletedStory };
    }catch(err){
      throw err;
    }
  }
}

module.exports = StoryService;
