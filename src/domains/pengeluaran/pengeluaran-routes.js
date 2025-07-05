import express from "express";
import PengeluaranController from "./pengeluaran-controller.js";
import validate from "../../middlewares/request-validator.js";
import {
  createPengeluaranSchema,
  updatePengeluaranSchema,
  getPengeluaranByIdSchema,
  deletePengeluaranSchema,
} from "./pengeluaran-schema.js";
import authToken from "../../middlewares/auth-token.js";

class PengeluaranRoutes {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.use(authToken);
    
    this.router.get("/", PengeluaranController.getAll);
    
    this.router.get(
      "/:id",
      validate(getPengeluaranByIdSchema, "params"),
      PengeluaranController.getById
    );
    
    this.router.post(
      "/",
      validate(createPengeluaranSchema),
      PengeluaranController.create
    );
    
    this.router.put(
      "/:id",
      validate(getPengeluaranByIdSchema, "params"),
      validate(updatePengeluaranSchema),
      PengeluaranController.update
    );
    
    this.router.delete(
      "/:id",
      validate(getPengeluaranByIdSchema, "params"),
      validate(deletePengeluaranSchema),
      PengeluaranController.delete
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new PengeluaranRoutes().getRouter();
