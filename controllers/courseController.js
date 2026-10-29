const mongoose = require("mongoose");
const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, instructor, category, price } = req.body;
    if (!title || !description || !instructor || !category || price === undefined || price === "") {
      return res.status(400).json({ success: false, message: "Title, description, instructor, category, and price are required." });
    }
    if (!mongoose.isValidObjectId(category)) {
      return res.status(400).json({ success: false, message: "Category must be a valid category ID." });
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ success: false, message: "Selected category does not exist." });
    const course = await Course.create({ title, description, instructor, category, price });
    const populated = await course.populate("category", "name");
    res.status(201).json({ success: true, message: "Course created", data: populated });
  } catch (err) { next(err); }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("category", "name").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) { next(err); }
};

exports.getCourse = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: "Course not found." });
    const course = await Course.findById(req.params.id).populate("category", "name");
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.status(200).json({ success: true, data: course });
  } catch (err) { next(err); }
};

exports.updateCourse = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: "Course not found." });
    if (req.body.category) {
      if (!mongoose.isValidObjectId(req.body.category) || !(await Category.findById(req.body.category))) {
        return res.status(400).json({ success: false, message: "Category must be a valid existing category ID." });
      }
    }
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("category", "name");
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.status(200).json({ success: true, message: "Course updated", data: course });
  } catch (err) { next(err); }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: "Course not found." });
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: "Course not found." });
    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (err) { next(err); }
};