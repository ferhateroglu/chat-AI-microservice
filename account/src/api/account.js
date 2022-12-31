const AccountServices = require("../services/accountServices");
const {
  APIError,
  BadRequestError,
  ConflictError,
  STATUS_CODES,
} = require("../utils/appErrors");
const { PublishMailEvent } = require("../utils");
const {
  authMiddleware,
  roleMiddleware,
  validationMiddleware,
} = require("./middlewares");
let { TIER1, TIER2, TIER3 } = require("../config/index");
const { deleteUser } = require("../utils/validation");

module.exports = (app) => {
  const service = new AccountServices();

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/resetPassword", async (req, res, next) => {
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

  app.post("/login", async (req, res, next) => {
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

  app.post("/signUp", async (req, res, next) => {
    try {
      const { email, password, phone, username } = req.body;
      const { data, error } = await service.signUp({
        email,
        password,
        phone,
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
    validationMiddleware(deleteUser),
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

  //add like
  app.post("/like",authMiddleware, async(req,res,next) =>{
    try {
      const {story} = req.body;
      const user = req.user;
      const { data, error } = await service.addLike({user,story});
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
  app.delete("/like",authMiddleware, async(req,res,next) =>{
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
};
