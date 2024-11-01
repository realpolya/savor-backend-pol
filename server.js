// FORKED VERSION OF SAVOR
/* --------------------------------Imports--------------------------------*/
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import db from './db/connection.js'; // db = mongoose.connection
import chalk from 'chalk';
import cors from 'cors';

import authRouter from './routes/route-auth.js';
import recipesRouter from "./routes/route-recipe.js"
import ingredientsRouter from "./routes/route-ingredients.js"
//import ingredientsRouter from "./routes/route-ingredient.js"
import favoritesRouter from "./routes/route-favorite.js"
import morgan from "morgan";


/* --------------------------------Express & Mongoose--------------------------------*/

const app = express();
const PORT = process.env.PORT || 3000;
db.on('connected', () => {
    console.clear();
    console.log(chalk.blue(`Connected to MongoDB ${db.name}.`));

    app.listen(PORT, () => {
        console.log(chalk.green(`The express app is ready on port ${PORT}!`));
    });
});


/* --------------------------------Middleware--------------------------------*/
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------------Routes--------------------------------*/

app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);
app.use('/favorites', favoritesRouter);
app.use('/ingredients', ingredientsRouter);
