import db from "../models/index.js";
import "../utils/apiSuccess.js";
import ApiError from "../utils/apiError.js";

import httpStatus from 'http-status';
import { openAIService } from "../services/index.js";

const { Project } = db;


const addProjects = async (req, res) => {
  let { name, description, technologies, image_url } = req.body;

  const projectDetails = await Project.create({ name, description, technologies, image_url });


  res.sendSuccess(httpStatus.CREATED, "Project created successfully", projectDetails);
};

const getProjects = async (req, res) => {

  const projects = await Project.findAll();

  res.sendSuccess(httpStatus.OK, "Project fetched successfully", projects);
};

const summarizeProjects = async (req, res) => {

  const { projectId } = req.params;

  const projectData = await Project.findOne({
    where: {
      id: projectId
    },
    attributes: ["description"]
  });


  if(!projectData){
    throw new ApiError(httpStatus.NOT_FOUND, "No Project found with this projectId")
  }
  const description = projectData.description;
  
  if(!description){
    throw new ApiError(httpStatus.NOT_FOUND, "No description found with this project")
  }


  // const summary = await openAIService.getProjectSummary(description);
  const summary = openAIService.generateMockSummary(description);

  if(!summary){
    throw new ApiError(httpStatus.SERVICE_UNAVAILABLE,"OPEN Ai didnt respond at this time")
  }
  res.sendSuccess(httpStatus.OK, "Project Summary Returned", {summary});

};



export {
  addProjects,
  getProjects,
  summarizeProjects
};