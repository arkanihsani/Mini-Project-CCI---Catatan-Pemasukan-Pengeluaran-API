import express from "express";
import AuthController from "./auth-controller.js";
import validate from "../../middlewares/request-validator.js";
import {
  loginSchema,
  registerSchema,
  getMeSchema,
  updateProfileSchema,
  deleteAccountSchema,
  adminUpdateUserSchema,
  getUserByIdSchema,
} from "./auth-schema.js";
import authToken from "../../middlewares/auth-token.js";
import adminAuth from "../../middlewares/admin-auth.js";

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  setRoutes() {
    this.router.post("/login", validate(loginSchema), AuthController.login);
    this.router.post("/register", validate(registerSchema), AuthController.register);
    
    this.router.get(
      "/me",
      authToken,
      validate(getMeSchema),
      AuthController.me
    );
    
    this.router.put(
      "/me",
      authToken,
      validate(updateProfileSchema),
      AuthController.update
    );
    
    this.router.delete(
      "/me",
      authToken,
      validate(deleteAccountSchema),
      AuthController.delete
    );

    // Admin Only
    this.router.get(
      "/admin/users",
      authToken,
      adminAuth,
      AuthController.getAllUsers
    );

    this.router.get(
      "/admin/users/:id",
      authToken,
      adminAuth,
      validate(getUserByIdSchema, "params"),
      AuthController.getUserById
    );

    this.router.put(
      "/admin/users/:id",
      authToken,
      adminAuth,
      validate(getUserByIdSchema, "params"),
      validate(adminUpdateUserSchema),
      AuthController.updateUserById
    );

    this.router.delete(
      "/admin/users/:id",
      authToken,
      adminAuth,
      validate(getUserByIdSchema, "params"),
      AuthController.deleteUserById
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();
