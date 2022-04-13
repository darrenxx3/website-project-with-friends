const Users = require("../models/Users");
const asyncWrapper = require("../middlewares/wrapper");

const findUsername = asyncWrapper(async (req, res) => {
    const users = await Users.find({});
    console.log("MASUK:", users);
    res.status(200).json({ users });
});

module.exports = {
    findUsername
}