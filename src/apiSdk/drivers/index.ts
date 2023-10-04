import queryString from 'query-string';
import { DriverInterface, DriverGetQueryInterface } from 'interfaces/driver';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDrivers = async (query?: DriverGetQueryInterface): Promise<PaginatedInterface<DriverInterface>> => {
  return fetcher('/api/drivers', {}, query);
};

export const createDriver = async (driver: DriverInterface) => {
  return fetcher('/api/drivers', { method: 'POST', body: JSON.stringify(driver) });
};

export const updateDriverById = async (id: string, driver: DriverInterface) => {
  return fetcher(`/api/drivers/${id}`, { method: 'PUT', body: JSON.stringify(driver) });
};

export const getDriverById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/drivers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteDriverById = async (id: string) => {
  return fetcher(`/api/drivers/${id}`, { method: 'DELETE' });
};
