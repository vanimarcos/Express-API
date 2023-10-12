import fs from 'fs';
import path from 'path';

const PRIV_KEY_PATH = '../../ssl/privkey.pem';
const CERT_PATH = '../../ssl/fullchain.pem';

const certs = {
  key: fs.readFileSync(path.resolve(__dirname, PRIV_KEY_PATH)),
  cert: fs.readFileSync(path.resolve(__dirname, CERT_PATH)),
};

export default certs;
