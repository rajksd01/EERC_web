import User from "../model/user.js";


export const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "No user was found" });
    }
    req.profile = user;
    next();
  });
};
export const getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

// for updating user account details
export const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(404).json({ error: "Update was not successful" });
      }

      return res.json(user);
    }
  );
};
