import { GetQueryInterface } from 'interfaces';

export interface RouteInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface RouteGetQueryInterface extends GetQueryInterface {
  id?: string;
}
