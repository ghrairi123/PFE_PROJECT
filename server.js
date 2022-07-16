const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const busboyBodyParser = require("busboy-body-parser");
//app.use(busboyBodyParser());

const authRoutes = require("./Routes/auth");
const userRoutes = require("./routes/user");
const CityRoutes = require("./routes/City");
const subCategory = require("./routes/Sub-category");
const CategoryRoutes = require("./routes/Category");
const EventsRoutes = require("./routes/Events");
const Event_user = require("./routes/Event_user");
//const upload = require("./routes/upload");

app.use(cors({ origin: "http://localhost:3000" }));
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));

//set headers
app.use("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Origin, Content-Type, access_token"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/auth", authRoutes);
app.use("/api", CategoryRoutes);
app.use("/api", subCategory);
app.use("/api", CityRoutes);
app.use("/api", EventsRoutes);
app.use("/api", Event_user);
//app.use("/api", upload);
app.use("/api", require("./routes/Contact_Us"));
app.use("/api", require("./routes/Reviews"));
app.use("/api", require("./routes/Equipes"));
app.use("/api", require("./routes/Notification"));
app.use("/api", require("./routes/Statistic"));

app.use(userRoutes);
mongoose.connect(
  //process.env.MONGODB_URI || "mongodb://localhost:27017/bijoycrm",
  "mongodb+srv://ghrairi:marwa@cluster0.n717z.mongodb.net/Memoire?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("Mongodb connection succeeded.");
    else
      console.log(
        "Error while connecting MongoDB : " + JSON.stringify(err, undefined, 2)
      );
  }
);
app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});
app.listen(PORT, () => {
  console.log(`Server is starting at PORT: ${PORT}`);
});
