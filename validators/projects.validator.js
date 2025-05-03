import { check } from "express-validator";

export const validateProjects = [
  check("name").notEmpty().withMessage("Name is required"),
  // check("password").notEmpty().withMessage("Password is required"),
];
