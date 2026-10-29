const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const {
  createCourse, getCourses, getCourse, updateCourse, deleteCourse
} = require("../controllers/courseController");

router.route("/").get(protect, getCourses).post(protect, createCourse);
router.route("/:id").get(protect, getCourse).put(protect, updateCourse).delete(protect, deleteCourse);

module.exports = router;