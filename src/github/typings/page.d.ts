import { EGollumAction } from '../enums/gollum-action.enum';

export interface IPage {
  action: EGollumAction;
  html_url: string;
  page_name: string;
  sha: string;
  summary: string | null;
  title: string;
}
