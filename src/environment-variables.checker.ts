import { shouldUseHttps } from './utils/get-protocol.util';

export function environmentVariablesChecker(): void {
  if (process.env.PORT) checkPort();

  checkHttpsConfig();
  checkPublicHostAddress();
}

function checkHttpsConfig(): void {
  if (!shouldUseHttps()) return;

  if (!process.env.HTTPS_CERT_FILEPATH)
    throw new Error('HTTPS_CERT_FILEPATH environment variable must be set');

  if (!process.env.HTTPS_KEY_FILEPATH)
    throw new Error('HTTPS_KEY_FILEPATH environment variable must be set');
}

function checkPort(): void {
  if (isNaN(Number(process.env.PORT)))
    throw new Error('PORT environment variable must be a number');
}

function checkPublicHostAddress(): void {
  if (!process.env.PUBLIC_HOST_ADDRESS)
    throw new Error('PUBLIC_HOST_ADDRESS environment variable must be set');
}
