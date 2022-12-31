const StoryServices = require("../services/storyServices");
const {
  APIError,
  BadRequestError,
  ConflictError,
  STATUS_CODES,
} = require("../utils/appErrors");
//const { PublishMailEvent } = require("../utils");
const {
  authMiddleware,
  roleMiddleware,
  validationMiddleware,
} = require("./middlewares");
const { uploadS3 } = require("./middlewares/awsS3Middleware");
const { s3 } = require("../utils/awsS3");
let { TIER1, TIER2, TIER3 } = require("../config/index");
const { addStorySchema, getAllStoriesScema, deleteStorySchema } = require("../utils/validation");

module.exports = (app) => {
  const service = new StoryServices();

  // get all Stories
  app.get(
    "/",
    authMiddleware,
    validationMiddleware(getAllStoriesScema),
    async (req, res, next) => {
      try {
        const { perPage, page } = req.query;
        const { data, error } = await service.getAllStories({ perPage, page });

        if (error) {
          const { statusCode, message } = error;
          return res.status(statusCode).json({ message });
        }

        return res.json(data);
        res.send("geçti");
      } catch (err) {
        throw err;
      }
    }
  );

  // add story
  app.post(
    "/",
    authMiddleware,
    roleMiddleware(TIER2),
    validationMiddleware(addStorySchema),
    async (req, res, next) => {
      try {
        const storyInput = { ...req.body };
        const { data, error } = await service.addStory({ storyInput });
        if (error) {
          const { statusCode, message } = error;
          return res.status(statusCode).json({ message });
        }
        return res.json({ ...data });
      } catch (err) {
        throw err;
      }
    }
  );

  // upload file to s3
  app.post("/audio", uploadS3("file"), async (req, res, next) => {
    try {
      return res.send(req.file);
    } catch (err) {
      next(err);
    }
  });

  // get Story by slug
  app.get("/:slug", authMiddleware, async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { data, error } = await service.getStory({ slug });

      if (error) {
        const { statusCode, message } = error;
        return res.status(statusCode).json({ message });
      }

      return res.json(data);
    } catch (err) {
      throw err;
    }
  });
  // get Story by slug
  app.delete(
    "/:_id",
    authMiddleware,
    roleMiddleware(TIER2),// only admin
    validationMiddleware(deleteStorySchema),
    async (req, res, next) => {
      try {
        const { _id } = req.params;
        const { data, error } = await service.deleteStory({ _id });
  
        if (error) {
          const { statusCode, message } = error;
          return res.status(statusCode).json({ message });
        }
  
        return res.json(data);
        res.send("ok");
      } catch (err) {
        throw err;
      }
    }
  );

  // download file with s3
  app.get("/file/:fileKey", async (req, res, next) => {
    try{
      const { fileKey } = req.params;
    const fileStream = await service.getAudio({ res, fileKey });
    fileStream.pipe(res);
    }catch(err){
      res.status(500).json({message:"INTERNAL_SERVER_ERROR"})
    }
  });
  // delete file with s3
  app.delete(
    "/audio/:fileKey",
    authMiddleware,
    roleMiddleware(TIER2), // only admin
    async (req, res, next) => {
      try {
        const { fileKey } = req.params;
        const { data, error } = await service.deleteAudio({ fileKey });
        if (error) {
          const { statusCode, message } = error;
          return res.status(statusCode).json({ message });
        }
        const { statusCode, message } = data;
        return res.status(statusCode).json({ message });
      } catch (err) {
        throw err;
      }
    }
  );
};
