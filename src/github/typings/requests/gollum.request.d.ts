import { IGollumEvent } from '../events/gollum.event';
import { IRequest } from '../../../handlers/typings/request.handler';

export interface IGollumRequest extends IRequest {
  body: IGollumEvent;
}
