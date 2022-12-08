const jwt = require("jsonwebtoken");
const Admin = require("./AdminSchema");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { contest } = req.body;

    if (!contest) {
      return res.status(401).json({
        success: false,
        msg: "please login first",
      });
    }

    const decoded = jwt.verify(contest, process.env.JWT_SECRET);

    const a = await Admin.find({ userId: decoded.userId });

    req.user = a[0].name;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
