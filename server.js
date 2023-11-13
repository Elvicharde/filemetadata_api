/* server.js
  Author: Oguntuase Victor
  Description: This is the server file for the file metadata certification project from freeCodeCamp
  email: freelanceel0@gmail.com; vicharde@gmail.com
*/

// importing relevant libraries/packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";

// configurations
dotenv.config();
const upload = multer({ storage: multer.memoryStorage() });

const app = express();

// using middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

//defining routes and handlers
app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), fileHandler);

function fileHandler(req, res) {
    const response = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    };
    res.status(200).json(response);
    console.log("Metadata fetched!");
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});
