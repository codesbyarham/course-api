const mongoose = require("mongoose");
const Category = require("../models/Category");

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required." });
    }
    const category = await Category.create({ name: name.trim(), description });
    return res.status(201).json({ success: true, message: "Category created", data: category });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ success: false, message: "Category name already exists." });
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (err) { next(err); }
};

exports.getCategory = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: "Category not found." });
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found." });
    res.status(200).json({ success: true, data: category });
  } catch (err) { next(err); }
};

exports.updateCategory = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: "Category not found." });
    if (req.body.name !== undefined && !String(req.body.name).trim()) {
      return res.status(400).json({ success: false, message: "Category name cannot be empty." });
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found." });
    res.status(200).json({ success: true, message: "Category updated", data: category });
  } catch (err) { next(err); }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ success: false, message: "Category not found." });
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found." });
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (err) { next(err); }
};