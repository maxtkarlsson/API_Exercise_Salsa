const express = require("express");
const router = express.Router();
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} = require("../controllers/courseController");

router.post("/", createCourse);
router.put("/:courseId", updateCourse);
router.delete("/:courseId", deleteCourse);
router.get("/", getAllCourses);
router.get("/:courseId", getCourseById);

module.exports = router;
