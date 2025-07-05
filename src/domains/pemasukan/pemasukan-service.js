import db from "../../utils/db.js";
import BaseError from "../../errors/base-error.js";
import logger from "../../utils/logger.js";

class PemasukanService {
  async getAll(userId) {
    logger.info(`DB: findMany pemasukan for user: ${userId}`);
    const pemasukan = await db.pemasukan.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });
    
    return pemasukan.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      amount: item.amount,
      description: item.description,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  }

  async getById(id, userId) {
    logger.info(`DB: findUnique pemasukan by id: ${id} for user: ${userId}`);
    const pemasukan = await db.pemasukan.findFirst({
      where: { 
        id: id,
        user_id: userId
      }
    });
    
    if (!pemasukan) {
      logger.warn(`Pemasukan not found for id: ${id}`);
      throw BaseError.notFound("Pemasukan not found");
    }
    
    return {
      id: pemasukan.id,
      user_id: pemasukan.user_id,
      amount: pemasukan.amount,
      description: pemasukan.description,
      created_at: pemasukan.created_at,
      updated_at: pemasukan.updated_at,
    };
  }

  async create({ amount, description }, userId) {
    logger.info(`DB: create pemasukan for user: ${userId}`);
    const pemasukan = await db.pemasukan.create({
      data: {
        user_id: userId,
        amount: parseFloat(amount),
        description: description,
      },
    });

    logger.info(`Create pemasukan success for user: ${userId}`);
    return {
      id: pemasukan.id,
      user_id: pemasukan.user_id,
      amount: pemasukan.amount,
      description: pemasukan.description,
      created_at: pemasukan.created_at,
      updated_at: pemasukan.updated_at,
    };
  }

  async update(id, { amount, description }, userId) {
    logger.info(`DB: findFirst pemasukan by id: ${id} for user: ${userId}`);
    const pemasukan = await db.pemasukan.findFirst({
      where: { 
        id: id,
        user_id: userId
      }
    });
    
    if (!pemasukan) {
      logger.warn(`Pemasukan not found for id: ${id}`);
      throw BaseError.notFound("Pemasukan not found");
    }

    logger.info(`DB: update pemasukan by id: ${id}`);
    const data = {};
    if (amount !== undefined) data.amount = parseFloat(amount);
    if (description !== undefined) data.description = description;

    const updated = await db.pemasukan.update({
      where: { id },
      data,
    });

    logger.info(`Update pemasukan success for id: ${id}`);
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
    logger.info(`DB: findFirst pemasukan by id: ${id} for user: ${userId}`);
    const pemasukan = await db.pemasukan.findFirst({
      where: { 
        id: id,
        user_id: userId
      }
    });
    
    if (!pemasukan) {
      logger.warn(`Pemasukan not found for id: ${id}`);
      throw BaseError.notFound("Pemasukan not found");
    }

    logger.info(`DB: delete pemasukan by id: ${id}`);
    const deleted = await db.pemasukan.delete({
      where: { id },
    });
    
    logger.info(`Delete pemasukan success for id: ${id}`);
    return {
      id: deleted.id,
      user_id: deleted.user_id,
      amount: deleted.amount,
      description: deleted.description,
      created_at: deleted.created_at,
    };
  }
}

export default new PemasukanService();
