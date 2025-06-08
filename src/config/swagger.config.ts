// eslint-disable-next-line @typescript-eslint/no-require-imports
const { description, version } = require('../../package.json');

import { Options } from 'swagger-jsdoc';

import { getHostAddress } from '../utils/get-host-address.util';
import { getProtocol } from '../utils/get-protocol.util';

export const swaggerConfig: Options = {
  apis: ['./**/router.{ts,js}'],
  definition: {
    info: {
      description,
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      title: 'GitHub Discord Updater',
      version
    },
    openapi: '3.1.0',
    servers: [
      {
        description: 'Webhook server',
        url: `${getProtocol()}://${getHostAddress()}`
      }
    ]
  }
};
