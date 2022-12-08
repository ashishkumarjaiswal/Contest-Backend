const express = require("express");
const connectToDataBase = require("./dataBase");
const {
  addContest,
  login,
  addNewAdmin,
  loadAdmin,
  deleteContest,
  deleteExpired,
  getSingleContest,
  updatecontest,
} = require("./controller/admin");
const { getContestData } = require("./controller/user");
const cors = require("cors");
const { isAuthenticated } = require("./middleware");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
}

const app = express();
app.use(cors());
connectToDataBase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/admin/login", login);
app.delete("/admin/deleteexpired", deleteExpired);
app.post("/admin/loadadmin", isAuthenticated, loadAdmin);
app.delete("/admin/deletecontest/:id", deleteContest);
app.post("/admin/addnewadmin", addNewAdmin);
app.post("/admin/addcontest", isAuthenticated, addContest);
app.post("/admin/getperticularcontestdata", getSingleContest);
app.put("/admin/updatecontest", updatecontest);
app.get("/getcontestdata", getContestData);

app.listen(process.env.PORT, () => {
  console.log(`app is listening on port ${process.env.PORT}`);
});
