import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

import db from '../../../../core/models/index.js';
import ISupplyDeleteService from './supply.interface-delete.js';

class SupplyDeleteService extends ISupplyDeleteService {
  constructor({ supplyRepository }) {
    super();
    this.supplyRepository = supplyRepository;
  }

  async delete(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const publicKey = fs.readFileSync(path.resolve(__dirname, '../../../../public_key.pem'), 'utf-8');
      const decodedPayload = jwt.verify(data.user, publicKey, { algorithms: ['RS256'] });
      data.user = decodedPayload.id;
      const isAuthorized = await this.supplyRepository.findByDonor(data, transaction);
      if (!isAuthorized) {
        throw new Error("User is not authorized to delete this supply");
      }
      await this.supplyRepository.delete(data, transaction);
      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}

export default SupplyDeleteService;