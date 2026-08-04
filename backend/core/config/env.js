import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '..', '.env')
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    config({ path: envPath });
    break;
  }
}

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || process.env.DEV_DB_HOST;
export const DB_PORT = process.env.DB_PORT || process.env.DEV_DB_PORT;
export const DB_USER = process.env.DB_USER || process.env.DEV_DB_USER;
export const DB_PASS = process.env.DB_PASS || process.env.DEV_DB_PASS;
export const DB_NAME = process.env.DB_NAME || process.env.DEV_DB_NAME;
export const JWT_PRIVATE_KEY_PATH = process.env.JWT_PRIVATE_KEY_PATH;
export const JWT_PUBLIC_KEY_PATH = process.env.JWT_PUBLIC_KEY_PATH;
export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUDINARY_API_SECRET;