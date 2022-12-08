const Contest = require("../model");
const Admin = require("../AdminSchema");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        msg: "Incomplet Detail",
      });
    }

    const user = await Admin.find({ userId });

    if (user.length == 0) {
      return res
        .status(401)
        .json({ success: false, msg: "Admin not registerd" });
    }

    if (password !== user[0].password) {
      return res.status(401).json({ success: false, msg: "Wrong Password" });
    }

    const contest = jwt.sign({ userId: userId }, process.env.JWT_SECRET);

    res
      .status(201)
      .json({ success: true, msg: "Admin Logedin Successfully", contest });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Server is down form login", error });
  }
};

exports.addContest = async (req, res) => {
  try {
    const { name, platform, link, startingDate, endingDate } = req.body.data;

    if (!name || !platform || !link || !startingDate || !endingDate) {
      return res.status(400).json({
        success: false,
        msg: "Incomplet Detail",
      });
    }

    const isDuplicate = await Contest.find({ link });

    if (isDuplicate && isDuplicate.length > 0) {
      return res.status(400).json({
        success: false,
        msg: "Contest Already Added",
      });
    }

    const contest = await Contest.create({
      name,
      platform,
      link,
      startingDate,
      endingDate,
      addedBy: req.user,
    });

    res
      .status(201)
      .json({ success: true, msg: "contest added successfully", contest });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};

exports.addNewAdmin = async (req, res) => {
  try {
    const { name, userId, password } = req.body;

    const newAdmin = await Admin.create({
      name,
      userId,
      password,
    });

    res
      .status(201)
      .json({ success: true, msg: "Admin Added Successfully", newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};

exports.loadAdmin = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      msg: "Admin Loaded Successfully",
      admin: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};

exports.deleteContest = async (req, res) => {
  try {
    await Contest.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      msg: "Contest Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};

exports.deleteExpired = async (req, res) => {
  try {
    const allContest = await Contest.find();

    for (let i = 0; i < allContest.length; i++) {
      if (
        new Date(allContest[i].endingDate).getTime() <
        new Date(Date.now()).getTime()
      ) {
        await Contest.findByIdAndDelete(allContest[i]._id);
      }
    }

    res.status(201).json({
      success: true,
      msg: "Contest Deleted Successfullys",
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};

exports.getSingleContest = async (req, res) => {
  try {
    const { id } = req.body;

    const contest = await Contest.findById(id);

    res.status(201).json({
      success: true,
      contest,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};

exports.updatecontest = async (req, res) => {
  try {
    const { name, platform, link, startingDate, endingDate, id } =
      req.body.data;

    if (!name || !platform || !link || !startingDate || !endingDate) {
      return res.status(400).json({
        success: false,
        msg: "Incomplet Detail",
      });
    }

    const contest = await Contest.findByIdAndUpdate(id, {
      name,
      platform,
      link,
      startingDate,
      endingDate,
    });

    res
      .status(201)
      .json({ success: true, msg: "contest Update successfully", contest });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server is down", error });
  }
};
