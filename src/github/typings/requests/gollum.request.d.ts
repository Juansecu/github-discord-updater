import { Request } from 'express';

import { IGollumEvent } from '../events/gollum.event';

export interface IGollumRequest extends Request {
  body: IGollumEvent;
}
