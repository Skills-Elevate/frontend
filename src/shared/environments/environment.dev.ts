import * as dotenv from 'dotenv';
dotenv.config();

let Host = process.env['API_HOST'] || 'http://localhost';
let Port = process.env['API_PORT'] || '3000';

export const environment = {
  production: true,
  apiHost: Host,
  apiPort: Port,
  apiUrl: `${Host}:${Port}`,
};
