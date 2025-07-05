import AuthService from "./auth-service.js";
import BaseResponse from "../../utils/base-response.js";

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      return BaseResponse.success(
        res,
        { 
          user: { 
            id: user.id, 
            email: user.email, 
            name: user.name,
            role: user.role
          }, 
          token 
        },
        "Login successful"
      );
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const user = await AuthService.register({ name, email, password, role });
      return BaseResponse.created(
        res,
        { 
          user: { 
            id: user.id, 
            name: user.name, 
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
          } 
        },
        "Registration successful"
      );
    } catch (err) {
      next(err);
    }
  }

  async me(req, res, next) {
    try {
      const { id } = req.user;
      const user = await AuthService.me(id);
      return BaseResponse.success(
        res,
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
          },
        },
        "User profile retrieved successfully"
      );
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.user;
      const { name, email, new_password } = req.body || {};
      const user = await AuthService.update(id, { name, email, new_password });
      return BaseResponse.success(
        res,
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
          },
        },
        "User profile updated successfully"
      );
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.user;
      const user = await AuthService.delete(id);
      return BaseResponse.success(
        res,
        {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
          },
        },
        "User account deleted successfully"
      );
    } catch (err) {
      next(err);
    }
  }

  // Admin Only
  async getAllUsers(req, res, next) {
    try {
      const users = await AuthService.getAllUsers();
      return BaseResponse.success(res, { users }, "Users retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await AuthService.getUserById(id);
      return BaseResponse.success(res, { user }, "User retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const { id } = req.params;
      const { email, name, role } = req.body || {};
      const user = await AuthService.updateUserById(id, { email, name, role });
      return BaseResponse.success(res, { user }, "User updated successfully");
    } catch (err) {
      next(err);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await AuthService.deleteUserById(id);
      return BaseResponse.success(res, { user }, "User deleted successfully");
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
