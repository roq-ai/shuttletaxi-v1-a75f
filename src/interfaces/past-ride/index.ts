import { GetQueryInterface } from 'interfaces';

export interface PastRideInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  driver_id?: string;

  _count?: {};
}

export interface PastRideGetQueryInterface extends GetQueryInterface {
  id?: string;
  driver_id?: string;
}
