import catchAsync from "../utils/catchASync.js";
import validate from "../middlewares/valid.middleware.js";

import { apiRequestLimiter } from "../middlewares/ratelimiter.middleware.js";
import { addProjects, getProjects, summarizeProjects} from "../controllers/projects.ctrl.js";
import { validateProjects } from "../validators/projects.validator.js";

import express from "express";

const router = express.Router();

router.use(apiRequestLimiter);

router.post("/", validate(validateProjects), catchAsync(addProjects));
router.get("/", catchAsync(getProjects));
router.get("/:projectId/summary", catchAsync(summarizeProjects));


export default router;
