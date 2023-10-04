import queryString from 'query-string';
import { FutureBookingInterface, FutureBookingGetQueryInterface } from 'interfaces/future-booking';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFutureBookings = async (
  query?: FutureBookingGetQueryInterface,
): Promise<PaginatedInterface<FutureBookingInterface>> => {
  return fetcher('/api/future-bookings', {}, query);
};

export const createFutureBooking = async (futureBooking: FutureBookingInterface) => {
  return fetcher('/api/future-bookings', { method: 'POST', body: JSON.stringify(futureBooking) });
};

export const updateFutureBookingById = async (id: string, futureBooking: FutureBookingInterface) => {
  return fetcher(`/api/future-bookings/${id}`, { method: 'PUT', body: JSON.stringify(futureBooking) });
};

export const getFutureBookingById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/future-bookings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteFutureBookingById = async (id: string) => {
  return fetcher(`/api/future-bookings/${id}`, { method: 'DELETE' });
};
