"use strict";

import configModule from "../config/config.js";

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configModule[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // This allows self-signed certificates
        }
      },
      // logging: false
    }
  );
}

(async function () {
  try {
    console.log("waiting for database connection...");
    await sequelize.authenticate();
    console.log("Connection established!");
  } catch (e) {
    console.log("Connection failed!, error", e);
  }
})();

const models = fs.readdirSync(__dirname).filter(file => file?.indexOf(".") !== 0 && file !== basename && file?.slice(-3) === ".js" && file?.indexOf(".test.js") === -1);

for (const file of models) {
  const modelPath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(modelPath);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
