import { apiInstanceAuth } from "../utils/axios";


export const getCourse = async () =>
  apiInstanceAuth.get("/courses").then((res) => res.data);

export const postCourse = async (data) =>
  apiInstanceAuth.post("/courses", data).then((res) => res.data);

export const updateCourse = async (id, data) =>
  apiInstanceAuth.put(`/courses/${id}`, data).then((res) => res.data);

export const deleteCourse = async (id) =>
  apiInstanceAuth.delete(`/courses/${id}`).then((res) => res.data);