import db from "../../utils/db.js";
import BaseError from "../../errors/base-error.js";
import logger from "../../utils/logger.js";

class PengeluaranService {
  async getAll(userId) {
    logger.info(`DB: findMany pengeluaran for user: ${userId}`);
    const pengeluaran = await db.pengeluaran.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });
    
    return pengeluaran.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      amount: item.amount,
      description: item.description,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  }

  async getById(id, userId) {
    logger.info(`DB: findUnique pengeluaran by id: ${id} for user: ${userId}`);
    const pengeluaran = await db.pengeluaran.findFirst({
      where: { 
        id: id,
        user_id: userId
      }
    });
    
    if (!pengeluaran) {
      logger.warn(`Pengeluaran not found for id: ${id}`);
      throw BaseError.notFound("Pengeluaran not found");
    }
    
    return {
      id: pengeluaran.id,
      user_id: pengeluaran.user_id,
      amount: pengeluaran.amount,
      description: pengeluaran.description,
      created_at: pengeluaran.created_at,
      updated_at: pengeluaran.updated_at,
    };
  }

  async create({ amount, description }, userId) {
    logger.info(`DB: create pengeluaran for user: ${userId}`);
    const pengeluaran = await db.pengeluaran.create({
      data: {
        user_id: userId,
        amount: parseFloat(amount),
        description: description,
      },
    });

    logger.info(`Create pengeluaran success for user: ${userId}`);
    return {
      id: pengeluaran.id,
      user_id: pengeluaran.user_id,
      amount: pengeluaran.amount,
      description: pengeluaran.description,
      created_at: pengeluaran.created_at,
      updated_at: pengeluaran.updated_at,
    };
  }

  async update(id, { amount, description }, userId) {
    logger.info(`DB: findFirst pengeluaran by id: ${id} for user: ${userId}`);
    const pengeluaran = await db.pengeluaran.findFirst({
      where: { 
        id: id,
        user_id: userId
      }
    });
    
    if (!pengeluaran) {
      logger.warn(`Pengeluaran not found for id: ${id}`);
      throw BaseError.notFound("Pengeluaran not found");
    }

    logger.info(`DB: update pengeluaran by id: ${id}`);
    const data = {};
    if (amount !== undefined) data.amount = parseFloat(amount);
    if (description !== undefined) data.description = description;

    const updated = await db.pengeluaran.update({
      where: { id },
      data,
    });

    logger.info(`Update pengeluaran success for id: ${id}`);
    return {
      id: updated.id,
      user_id: updated.user_id,
      amount: updated.amount,
      description: updated.description,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  }

  async delete(id, userId) {
    logger.info(`DB: findFirst pengeluaran by id: ${id} for user: ${userId}`);
    const pengeluaran = await db.pengeluaran.findFirst({
      where: { 
        id: id,
        user_id: userId
      }
    });
    
    if (!pengeluaran) {
      logger.warn(`Pengeluaran not found for id: ${id}`);
      throw BaseError.notFound("Pengeluaran not found");
    }

    logger.info(`DB: delete pengeluaran by id: ${id}`);
    const deleted = await db.pengeluaran.delete({
      where: { id },
    });
    
    logger.info(`Delete pengeluaran success for id: ${id}`);
    return {
      id: deleted.id,
      user_id: deleted.user_id,
      amount: deleted.amount,
      description: deleted.description,
      created_at: deleted.created_at,
    };
  }
}

export default new PengeluaranService();
