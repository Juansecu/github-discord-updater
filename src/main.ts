import express, { Express } from 'express';
import helmet from 'helmet';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { ConsoleLogger } from './loggers/console.logger';

import { swaggerConfig } from './config/swagger.config';

import router from './router';

import { environmentVariablesChecker } from './environment-variables.checker';

import { logger } from './middlewares/logger.middleware';

import { getPort } from './utils/get-port.util';
import { shouldUseHttps } from './utils/get-protocol.util';

bootstrap();

function bootstrap(): void {
  const app: Express = express();
  const port: number = getPort();
  const swaggerSpecification: object = swaggerJsDoc(swaggerConfig);

  environmentVariablesChecker();

  app.use(helmet());

  app.use(logger);

  app.use(router);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

  if (shouldUseHttps()) {
    import('https')
      .then(module => {
        module
          .createServer(
            {
              cert: process.env.HTTPS_CERT_FILEPATH,
              key: process.env.HTTPS_KEY_FILEPATH
            },
            app
          )
          .listen(port);
      })
      .catch(error => {
        ConsoleLogger.getLogger('main').error(error);
        throw error;
      });
  } else {
    app.listen(port, (): void => {
      ConsoleLogger.getLogger('main').info(`Listening on port ${port}`);
    });
  }
}
