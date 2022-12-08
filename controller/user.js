const Contest = require("../model");

exports.getContestData = async (req, res) => {
  try {
    const data = await Contest.find().sort({ startingDate: -1 });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};
