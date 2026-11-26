import dotenv from 'dotenv';
dotenv.config({ quiet: true });
const name = process.env.TEST_ENV || 'local';
if (!['local', 'sit', 'uat'].includes(name)) throw new Error('Unsupported TEST_ENV');
function url(key: string) {
  const value = process.env[key] || (name === 'local' ? 'http://127.0.0.1:4173' : '');
  if (!value || !['http:', 'https:'].includes(new URL(value).protocol)) throw new Error(`Invalid ${key}`);
  return value;
}
export const env = { name, baseURL: url('BASE_URL'), apiURL: url('API_BASE_URL'), token: process.env.TEST_API_TOKEN };
