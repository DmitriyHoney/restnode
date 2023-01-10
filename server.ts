import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running http:localhost:${process.env.PORT}`);
});