import express from "express"
import dotenv from "dotenv"
import "express-async-errors";
import cors from "cors";
import bodyParser from "body-parser"
import bodyParserErrorHandler from "express-body-parser-error-handler";
import mongoose from 'mongoose'
import morgan from "morgan";
import cookieParser from "cookie-parser";
// router imports
import authRouter from "./routes/auth-router.js"
import libraryRouter from "./routes/library-router.js";
import notebookRouter from "./routes/notebook-router.js"
import bookhubRouter from './routes/bookhub-router.js'
import nytRouter from './routes/nyt-router.js'

// remaining middleware imports
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
//import { authenticateUser, authorizePermissions } from "./middleware/authentication.js";

const app = express()
const port = process.env.PORT || 8800
dotenv.config()

app.use(cors({
  origin: ["https://localhost:5173", "http://localhost:8081", "http://localhost:19006", "https://bookstax-api-c040fb8f60e5.herokuapp.com"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(bodyParserErrorHandler());
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRouter)


app.get("/", (req, res) => {
  res.send("home")
})
app.get("/api/v1", (req, res) => {
  res.send("API")
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/nyt", nytRouter)
app.use("/api/v1/bookhub", bookhubRouter)
app.use("/api/v1/library", libraryRouter) // mongodb library functions, add/update/removeBook
app.use("/api/v1/notebook", notebookRouter) // notebook functions - getNotebook, add/update note
app.use(notFound);
app.use(errorHandler);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

// connect to mongoDB
const connectDatabase = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
}

start()