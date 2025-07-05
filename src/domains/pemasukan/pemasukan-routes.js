import express from "express";
import PemasukanController from "./pemasukan-controller.js";
import validate from "../../middlewares/request-validator.js";
import {
  createPemasukanSchema,
  updatePemasukanSchema,
  getPemasukanByIdSchema,
  deletePemasukanSchema,
} from "./pemasukan-schema.js";
import authToken from "../../middlewares/auth-token.js";

class PemasukanRoutes {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.use(authToken);
    
    this.router.get("/", PemasukanController.getAll);
    
    this.router.get(
      "/:id",
      validate(getPemasukanByIdSchema, "params"),
      PemasukanController.getById
    );
    
    this.router.post(
      "/",
      validate(createPemasukanSchema),
      PemasukanController.create
    );
    
    this.router.put(
      "/:id",
      validate(getPemasukanByIdSchema, "params"),
      validate(updatePemasukanSchema),
      PemasukanController.update
    );
    
    this.router.delete(
      "/:id",
      validate(getPemasukanByIdSchema, "params"),
      validate(deletePemasukanSchema),
      PemasukanController.delete
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new PemasukanRoutes().getRouter();
