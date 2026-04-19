import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    const recipes = category ? await Recipe.find({ category }) : await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
