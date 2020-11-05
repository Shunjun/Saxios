import { argv } from 'yargs';

const ENABLE_OPEN = argv.open as true | string;

const HOST = '127.0.0.1';
const DEFAULT_PORT = 3000;

export { HOST, DEFAULT_PORT, ENABLE_OPEN };
