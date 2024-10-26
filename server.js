import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import db from './db/connection.js'
import chalk from "chalk";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/route-auth.js";
import recipesRouter from "./routes/route-recipe.js"
import ingredientsRouter from "./routes/route-ingredient.js"
import favoritesRouter from "./routes/route-favorites.js"
import reviewsRouter from "./routes/route-reviews.js"

const app= express();
const PORT=process.env.PORT || 3000;

db.on('connected',()=>{
    console.clear();
    console.log(chalk.blue(`Connected to ${db.name}.`))


app.listen(PORT, () => {
    console.log(chalk.green(`The express app is ready on port ${PORT}!`));
});
});


/* --------------------------------Middleware--------------------------------*/

// middleware to parse json bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------------Routes--------------------------------*/

app.use('/auth', authRouter);
app.use('/receipes', recipesRouter);




