import queryString from 'query-string';
import { PastRideInterface, PastRideGetQueryInterface } from 'interfaces/past-ride';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPastRides = async (
  query?: PastRideGetQueryInterface,
): Promise<PaginatedInterface<PastRideInterface>> => {
  return fetcher('/api/past-rides', {}, query);
};

export const createPastRide = async (pastRide: PastRideInterface) => {
  return fetcher('/api/past-rides', { method: 'POST', body: JSON.stringify(pastRide) });
};

export const updatePastRideById = async (id: string, pastRide: PastRideInterface) => {
  return fetcher(`/api/past-rides/${id}`, { method: 'PUT', body: JSON.stringify(pastRide) });
};

export const getPastRideById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/past-rides/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deletePastRideById = async (id: string) => {
  return fetcher(`/api/past-rides/${id}`, { method: 'DELETE' });
};
