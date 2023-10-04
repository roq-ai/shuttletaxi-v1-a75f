import queryString from 'query-string';
import { RouteInterface, RouteGetQueryInterface } from 'interfaces/route';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRoutes = async (query?: RouteGetQueryInterface): Promise<PaginatedInterface<RouteInterface>> => {
  return fetcher('/api/routes', {}, query);
};

export const createRoute = async (route: RouteInterface) => {
  return fetcher('/api/routes', { method: 'POST', body: JSON.stringify(route) });
};

export const updateRouteById = async (id: string, route: RouteInterface) => {
  return fetcher(`/api/routes/${id}`, { method: 'PUT', body: JSON.stringify(route) });
};

export const getRouteById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/routes/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteRouteById = async (id: string) => {
  return fetcher(`/api/routes/${id}`, { method: 'DELETE' });
};
