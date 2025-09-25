import courseModel from "../models/courseModel.js";
import { mutateCourseSchema } from "../utils/schema.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";
import { log } from "console";
import path from "path";

export const getCourse = async (req, res) => {
  try {
    const courses = await courseModel
      .find({
        manager: req.user?.id,
      })
      .select("name thumbnail")
      .populate({
        path: "category",
        select: "name -_id",
      })
      .populate({
        path: "students",
        select: "name",
      });

      const imageUrl = process.env.APP_URL + "/uploads/courses/";

      const response = courses.map((item) => {
        return {
          ...item.toObject(),
          thumbnail_url: imageUrl + item.thumbnail,
        }
      });


    return res.json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const postCourse = async (req, res) => {
  try {
    const body = req.body;

      if (req.file && req.file.filename) {
      body.thumbnail = req.file.filename;
    }
    

    const parse = mutateCourseSchema.safeParse(body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);

      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }

      return res.status(400).json({
        message: "Error Validation",
        data: null,
        errors: errorMessages,
      });
    }

    const category = await categoryModel.findById(parse.data.categoryId);

    if (!category) {
      return res.status(500).json({
        message: "CategoryId not found",
        data: null,
      });
    }

    const course = new courseModel({
      name: parse.data.name,
      category: category._id,
      description: parse.data.description,
      tagline: parse.data.tagline,
      thumbnail: req.file?.filename,
      manager: req.user?.id,
    });

    await course.save();
    await categoryModel.findByIdAndUpdate(
      category._id,
      {
        $push: {
          courses: course._id,
        },
      },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          courses: course._id,
        },
      },
      { new: true }
    );

    return res.json({
      message: "Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const body = req.body;
    const courseId = req.params.id;

      if (req.file && req.file.filename) {
      body.thumbnail = req.file.filename;
    }
    console.log(req.file);
    

    const parse = mutateCourseSchema.safeParse(body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);

      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }

      return res.status(400).json({
        message: "Error Validation",
        data: null,
        errors: errorMessages,
      });
    }

    const category = await categoryModel.findById(parse.data.categoryId);
    const oldCourse = await courseModel.findById(courseId);

    if (!category) {
      return res.status(500).json({
        message: "CategoryId not found",
        data: null,
      });
    }

    await courseModel.findByIdAndUpdate(
      courseId,
      {
        name: parse.data.name,
        category: category._id,
        description: parse.data.description,
        tagline: parse.data.tagline,
        thumbnail: req?.file ? req.file?.filename : oldCourse.thumbnail,
      },
      { new: true }
    );

    return res.json({
      message: "Update course Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const {id} = req.params;
    const course = await courseModel.findById(id);

    const dirname = path.resolve();
    const filePath = path.join(dirname, "public/uploads/courses", course.thumbnail);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await courseModel.findByIdAndDelete(id);

    return res.json({
      message: "Success delete course"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      details: error.message
    });
  }
}
