import { IPage } from '../page';
import { IRepository } from '../repository';
import { ISender } from '../sender';

export interface IGollumEvent {
  pages: IPage[];
  repository: IRepository;
  sender: ISender;
}
