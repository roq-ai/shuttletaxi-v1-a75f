import { GetQueryInterface } from 'interfaces';

export interface VehicleInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface VehicleGetQueryInterface extends GetQueryInterface {
  id?: string;
}
