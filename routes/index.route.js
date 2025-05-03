import projects from "./projects.route.js";

import express from "express";

const router = express.Router();

const defaultRoutes = [
  
  { path: "/projects", route: projects },
];

defaultRoutes.forEach(route => router.use(route.path, route.route));

export default router;