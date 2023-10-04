import { GetQueryInterface } from 'interfaces';

export interface FutureBookingInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  driver_id?: string;
  vehicle_id?: string;
  date_of_travel?: string;
  time_of_travel?: string;

  _count?: {};
}

export interface FutureBookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  driver_id?: string;
  vehicle_id?: string;
  date_of_travel?: string;
  time_of_travel?: string;
}
