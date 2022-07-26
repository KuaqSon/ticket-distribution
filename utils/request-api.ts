import { stringify } from 'querystring';
import { requestHeaders } from 'utils/constants';

export const createSprintRequest = async (data): Promise<any> => {
  const resp = await fetch('/api/sprint', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  return resp.json();
};

export const updateSprintRequest = async (data): Promise<any> => {
  const resp = await fetch(`/api/sprint/${data.id}`, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  return resp.json();
};

export const getListSprintsRequest = async (params = null): Promise<any> => {
  const resp = await fetch(`/api/sprint?${stringify(params)}`, {
    method: 'GET',
    headers: requestHeaders,
  });
  return resp.json();
};

export const deleteSprintRequest = async (id): Promise<any> => {
  const resp = await fetch(`/api/sprint/${id}`, {
    method: 'DELETE',
    headers: requestHeaders,
  });
  return resp.json();
};
