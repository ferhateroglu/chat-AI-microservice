module.exports = (whiteList) => {
  return async (req, res, next) => {
    try {
      whiteList = whiteList.split(",")
      const { rights } = req.user;
      let allowed = false;
      for (right of rights) {
        for (whiteRight of whiteList) {
          if (right === whiteRight) {
            allowed = true;
            break;
          }
        }
      }
      allowed ? next() : res.status(403).json({ message: "NO_PERMISSION" });
    } catch (err) {
      next(err);
    }

    /*
      const allowed = await userRoles.reduce(async (perms, role) => {
        const acc = await perms;
        if (acc) return true;
        const can = await e.enforce(role, asset, action);
        if (can) return true;
      }, false);
  
      allowed ? next() : res.status(403).send("Forbidden").end();*/
  };
};
