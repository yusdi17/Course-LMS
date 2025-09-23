import courseModel from "../models/courseModel.js";
import { mutateCourseSchema } from "../utils/schema.js";
import fs from "fs";
import categoryModel from "../models/categoryModel.js";
import userModel from "../models/userModel.js";

export const getCourse = async (req, res) => {
  try {
    const courses = await courseModel
      .find({
        manager: req.user?._id,
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

    return res.json({
      message: "Success",
      data: courses,
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
      thumbnail: parse.data.thumbnail,
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
