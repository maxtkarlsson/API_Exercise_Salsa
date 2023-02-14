const Course = require("../models/Course");
const { NotFoundError, BadRequestError } = require("../utils/error");

exports.createCourse = async (req, res) => {
  try {
    const name = req.body.name || "";
    const previousKnowledge = req.body.previousKnowledge || "";
    const instructors = req.body.instructors || "";
    const startDate = req.body.startDate || "";
    const endDate = req.body.endDate || "";
    const startTime = req.body.startTime || "";
    const endTime = req.body.endTime || "";
    const dayOfWeek = req.body.dayOfWeek || "";
    const occasions = req.body.occasions || "";
    const price = req.body.price || "";
    const danceType = req.body.danceType || "";
    const level = req.body.level || 0;
    const term = req.body.term || "";
    const classLengthMins = req.body.classLengthMins || 0;
    const couplesDance = req.body.couplesDance || "";
    const maxParticipants = req.body.maxParticipants || "";

    if (!name) throw new BadRequestError("Du måste ange ett namn!");
    if (!startDate) throw new BadRequestError("Du måste ange en tid!");
    if (!endDate) throw new BadRequestError("Du måste ange en tid!");
    if (!startTime) throw new BadRequestError("Du måste ange en tid!");
    if (!endTime) throw new BadRequestError("Du måste ange en tid!");
    if (!previousKnowledge)
      throw new BadRequestError("Du måste ange förkunskaper!");
    if (!instructors)
      throw new BadRequestError("Du måste ange ett namn på instruktör!");
    if (!dayOfWeek) throw new BadRequestError("Du måste ange en dag!");
    if (!price) throw new BadRequestError("Du måste ange ett pris!");
    if (!danceType) throw new BadRequestError("Du måste ange en danstyp!");
    if (!level) throw new BadRequestError("Du måste ange en nivå!");
    if (!classLengthMins)
      throw new BadRequestError("Du måste ange antal minuter!");
    if (!couplesDance)
      throw new BadRequestError("Du måste ange om det är pardans eller inte!");
    if (!maxParticipants)
      throw new BadRequestError("Du måste ange max antal deltagare!");

    const newCourse = await Course.create({
      name: name,
      previousKnowledge: previousKnowledge,
      instructors: instructors,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      dayOfWeek: dayOfWeek,
      occasions: occasions,
      price: price,
      danceType: danceType,
      level: level,
      term: term,
      classLengthMins: classLengthMins,
      couplesDance: couplesDance,
      maxParticipants: maxParticipants,
    });

    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/courses/${newCourse._id}`
      )
      .status(201)
      .json(newCourse);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const {
    name,
    previousKnowledge,
    instructors,
    startDate,
    endDate,
    startTime,
    endTime,
    dayOfWeek,
    occasions,
    price,
    danceType,
    level,
    term,
    classLengthMins,
    couplesDance,
    maxParticipants,
  } = req.body;

  if (
    !name ||
    !startDate ||
    !endDate ||
    !startTime ||
    !endTime ||
    !previousKnowledge ||
    !instructors ||
    !dayOfWeek ||
    !price ||
    !danceType ||
    !level ||
    !classLengthMins ||
    !couplesDance ||
    !maxParticipants
  ) {
    throw new BadRequestError("Du måste fylla i alla fält!");
  }

  const courseToUpdate = await Course.findById(courseId);

  if (!courseToUpdate) throw new NotFoundError("Den här kursen finns inte!");

  if (name) courseToUpdate.name = name;
  if (previousKnowledge) courseToUpdate.previousKnowledge = previousKnowledge;
  if (instructors) courseToUpdate.instructors = instructors;
  if (startDate) courseToUpdate.startDate = startDate;
  if (endDate) courseToUpdate.endDate = endDate;
  if (startTime) courseToUpdate.startTime = startTime;
  if (endTime) courseToUpdate.endTime = endTime;
  if (dayOfWeek) courseToUpdate.dayOfWeek = dayOfWeek;
  if (occasions) courseToUpdate.occasions = occasions;
  if (price) courseToUpdate.price = price;
  if (danceType) courseToUpdate.danceType = danceType;
  if (level) courseToUpdate.level = level;
  if (term) courseToUpdate.term = term;
  if (classLengthMins) courseToUpdate.classLengthMins = classLengthMins;
  if (couplesDance) courseToUpdate.couplesDance = couplesDance;
  if (maxParticipants) courseToUpdate.maxParticipants = maxParticipants;

  const updatedCourse = await courseToUpdate.save();

  res.send(`Course med id: ${courseId} har uppdaterats`);
  return res.json(updatedCourse);
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.json({
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courses = await Course.findById(courseId);
    return res.json({
      data: courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courseToDelete = await Course.findById(courseId);

    if (!courseToDelete) {
      return res.sendStatus(404);
    }

    await courseToDelete.delete(courseId);

    return res.send(`Course med id: ${courseId} har tagits bort`);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
