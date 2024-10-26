/* --------------------------------Imports--------------------------------*/

import db from "../db/connection.js";
import Ingredient from "../models/model-ingredient.js";
import { ingredients } from './dummy-ingredients.js';

/* --------------------------------Function--------------------------------*/

const insertData = async () => {

    // await db.dropDatabase();
    
    for (let i = 0; i < ingredients.length; i++) {

        await Ingredient.create(ingredients[i])

    }

    console.log('Ingredients have entered the database');

    await db.close();

}

// insertData();

// const showIngredients = async () => {
//     const ingrs = await Ingredient.find();
//     console.log(ingrs)
//     await db.close();
// }

// showIngredients();

