const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Course title is required"], trim: true },
  description: { type: String, required: [true, "Course description is required"], trim: true },
  instructor: { type: String, required: [true, "Instructor is required"], trim: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: [true, "Category ID is required"] },
  price: { type: Number, required: [true, "Price is required"], min: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);