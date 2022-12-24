module.exports = (whiteList) => {
  return async (req, res, next) => {
    try {

      const accaptableRoles = whiteList.split(",")
      const { rights } = req.user;
      let allowed = false;
      for (right of rights) {
        for (accaptableRole of accaptableRoles) {
          if (right === accaptableRole) {
            allowed = true;
            break;
          }
        }
        if(allowed){
          break
        }
      }
      allowed ? next() : res.status(403).json({ message: "NO_PERMISSION" });
    } catch (err) {
      next(err);
    }
  };
};
