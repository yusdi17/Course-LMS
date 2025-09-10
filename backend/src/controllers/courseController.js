import courseModel from "../models/courseModel.js";

export const getCourse = async (req, res) => {
  try {
    const courses = await courseModel.find({
      manager: req.user?._id
    })
    .select('name thumbnail')
    .populate({
      path: 'category',
      select: 'name -_id'
    })
    .populate({
      path: 'students',
      select: 'name'
    })

    return res.json({
      message: "Success",
      data: courses
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Internal server error', details: error.message});
    
  }
}