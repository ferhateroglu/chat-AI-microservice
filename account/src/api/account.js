const AccountServices = require("../services/accountServices");
const {
  APIError,
  BadRequestError,
  ConflictError,
  STATUS_CODES,
} = require("../utils/appErrors");
const { PublishMailEvent,PublishStoryEvent } = require("../utils");
const {
  authMiddleware,
  roleMiddleware,
  validationMiddleware,
} = require("./middlewares");
let { TIER1, TIER2, TIER3 } = require("../config/index");
const { deleteUserSchema, loginSchema, registerSchema, resetPassSchema,forgotPassSchema,addLikeSchema,delLikeSchema } = require("../utils/validation");

module.exports = (app) => {
  const service = new AccountServices();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/login",validationMiddleware(loginSchema), async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data, error } = await service.login({ email, password });
      if (error) {
        const { statusCode, message } = error;
        return res.status(statusCode).json({ message });
      }
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/signUp",validationMiddleware(registerSchema), async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      const { data, error } = await service.signUp({
        email,
        password,
        username,
      });
      if (error) {
        const { statusCode, message } = error;
        return res.status(statusCode).json({ message });
      }
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  
  app.delete("/account/delete",
    authMiddleware,
    roleMiddleware(TIER2), //only admin
    validationMiddleware(deleteUserSchema),
    async (req, res, next) => {
      try {
        const { _id } = req.body;
        const { user } = req;
        const { data, error } = await service.deleteUser(_id, user);
        if (error) {
          const { statusCode, message } = error;
          res.status(statusCode).json({ message });
        }
        return res.json({ data });
      } catch (err) {
        next(err);
      }
    }
  );

  
  app.post("/resetPassword", validationMiddleware(resetPassSchema), async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const { statusCode, message } = await service.resetPassword(
        token,
        newPassword
      );
      res.status(statusCode).json({ message });
    } catch (err) {
      next(err);
    }
  });

  app.post("/forgotPassword", validationMiddleware(forgotPassSchema), async (req, res, next) => {
    try {
      const { email } = req.body;
      const { error, data } = await service.forgotPassword({email});

      if(error){
        const {statusCode,message} = error
        return res.status(statusCode).json({ message });
      }
      const {statusCode, message} = data;
      
      return res.status(statusCode).json({ message });
    } catch (err) {
      next(err);
    }
  });

  
  //get liked stories
  app.get("/like",authMiddleware, async(req,res,next) =>{
    try {
      const user = req.user;
      const { data, error } = await service.getLikedStories({user});
      if (error) {
        const { statusCode, message } = error;
        return res.status(statusCode).json({ message });
      }
      return res.json(data);
    } catch (err) {
      next(err);
    }
  
  })

  //add like
  app.post("/like",authMiddleware,validationMiddleware(addLikeSchema), async(req,res,next) =>{
    try {
      const {storyId } = req.body;
      const userId = req.user._id;
      
      const payload = {event:"GET_STORY_BY_SLUG", data: {storyId, userId}}
      PublishStoryEvent(payload)

      return res.status(200).json({message:"OK"});
    } catch (err) {
      next(err);
    }
  
  })
  //delete like
  app.delete("/like",authMiddleware, validationMiddleware(delLikeSchema),async(req,res,next) =>{
    try {
      const {_id} = req.body;
      const user = req.user;
      const { data, error } = await service.removeLike({user,_id});
      if (error) {
        const { statusCode, message } = error;
        return res.status(statusCode).json({ message });
      }
      const {message, statusCode} = data;
      return res.status(statusCode).json({message});
    } catch (err) {
      next(err);
    }
  
  })

  app.get("/leaderBoard",authMiddleware, async (req,res,next)=>{
    try{
      const {data, error} = await service.getLeaderBoard();
      if (error) {
        const { statusCode, message } = error;
        return res.status(statusCode).json({ message });
      }
      return res.json(data);
    }catch(err){
      throw err
    }
  })

};
