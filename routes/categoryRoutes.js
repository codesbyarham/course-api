const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  createCategory, getCategories, getCategory, updateCategory, deleteCategory
} = require("../controllers/categoryController");

router.route("/").get(protect, getCategories).post(protect, createCategory);
router.route("/:id").get(protect, getCategory).put(protect, updateCategory).delete(protect, deleteCategory);

module.exports = router;