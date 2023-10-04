import { GetQueryInterface } from 'interfaces';

export interface DriverInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  driving_license_number: string;
  name?: string;
  mobile_number?: string;
  email_id?: string;
  date_of_joining?: string;

  _count?: {};
}

export interface DriverGetQueryInterface extends GetQueryInterface {
  id?: string;
  driving_license_number?: string;
  name?: string;
  mobile_number?: string;
  email_id?: string;
  date_of_joining?: string;
}
