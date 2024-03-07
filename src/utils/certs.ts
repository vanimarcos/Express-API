/* eslint-disable security/detect-non-literal-fs-filename */
import fs from 'fs';
import path from 'path';

const PRIV_KEY_RELATIVE_PATH = '../../ssl/server/server.key';
const CERT_RELATIVE_PATH = '../../ssl/server/server.pem';

const PRIV_KEY_PATH: string = path.resolve(__dirname, PRIV_KEY_RELATIVE_PATH);
const CERT_KEY_PATH: string = path.resolve(__dirname, CERT_RELATIVE_PATH);

const certs = {
  key: fs.readFileSync(PRIV_KEY_PATH),
  cert: fs.readFileSync(CERT_KEY_PATH),
};

export default certs;
