import PemasukanService from "./pemasukan-service.js";
import BaseResponse from "../../utils/base-response.js";

class PemasukanController {
  async getAll(req, res, next) {
    try {
      const { id: userId } = req.user;
      const pemasukan = await PemasukanService.getAll(userId);
      return BaseResponse.success(res, { pemasukan }, "Pemasukan retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const pemasukan = await PemasukanService.getById(id, userId);
      return BaseResponse.success(res, { pemasukan }, "Pemasukan retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { amount, description } = req.body;
      const { id: userId } = req.user;
      const pemasukan = await PemasukanService.create({ amount, description }, userId);
      return BaseResponse.created(
        res,
        { pemasukan },
        "Pemasukan created successfully"
      );
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { amount, description } = req.body;
      const { id: userId } = req.user;
      const pemasukan = await PemasukanService.update(id, { amount, description }, userId);
      return BaseResponse.success(
        res,
        { pemasukan },
        "Pemasukan updated successfully"
      );
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const pemasukan = await PemasukanService.delete(id, userId);
      return BaseResponse.success(
        res,
        { pemasukan },
        "Pemasukan deleted successfully"
      );
    } catch (err) {
      next(err);
    }
  }
}

export default new PemasukanController();
