import PengeluaranService from "./pengeluaran-service.js";
import BaseResponse from "../../utils/base-response.js";

class PengeluaranController {
  async getAll(req, res, next) {
    try {
      const { id: userId } = req.user;
      const pengeluaran = await PengeluaranService.getAll(userId);
      return BaseResponse.success(res, { pengeluaran }, "Pengeluaran retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const pengeluaran = await PengeluaranService.getById(id, userId);
      return BaseResponse.success(res, { pengeluaran }, "Pengeluaran retrieved successfully");
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { amount, description } = req.body;
      const { id: userId } = req.user;
      const pengeluaran = await PengeluaranService.create({ amount, description }, userId);
      return BaseResponse.created(
        res,
        { pengeluaran },
        "Pengeluaran created successfully"
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
      const pengeluaran = await PengeluaranService.update(id, { amount, description }, userId);
      return BaseResponse.success(
        res,
        { pengeluaran },
        "Pengeluaran updated successfully"
      );
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      const pengeluaran = await PengeluaranService.delete(id, userId);
      return BaseResponse.success(
        res,
        { pengeluaran },
        "Pengeluaran deleted successfully"
      );
    } catch (err) {
      next(err);
    }
  }
}

export default new PengeluaranController();
