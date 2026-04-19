import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  instructions: { type: String, required: true },
  ingredients: { type: String, required: true },
  category: { type: String, required: true },
  
}, { timestamps: true });

export default mongoose.model('Recipe', RecipeSchema);
