import { stringify } from 'querystring';
import { requestHeaders } from 'utils/constants';

export const getSprintDetailRequest = async (id): Promise<any> => {
  const resp = await fetch(`/api/sprint/${id}`, {
    method: 'GET',
    headers: requestHeaders,
  });
  return resp.json();
};

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

export const createTicketRequest = async (data): Promise<any> => {
  const resp = await fetch('/api/ticket', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  return resp.json();
};

export const updateTicketRequest = async (data): Promise<any> => {
  const resp = await fetch(`/api/ticket/${data.id}`, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  return resp.json();
};

export const getListTicketsRequest = async (params = null): Promise<any> => {
  const resp = await fetch(`/api/ticket?${stringify(params)}`, {
    method: 'GET',
    headers: requestHeaders,
  });
  return resp.json();
};

export const deleteTicketRequest = async (id: string): Promise<any> => {
  const resp = await fetch(`/api/ticket/${id}`, {
    method: 'DELETE',
    headers: requestHeaders,
  });
  return resp.json();
};

export const createEpicRequest = async (data): Promise<any> => {
  const resp = await fetch('/api/ticket', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  return resp.json();
};

export const updateEpicRequest = async (data): Promise<any> => {
  const resp = await fetch(`/api/ticket/${data.id}`, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(data),
  });
  return resp.json();
};

export const getListEpicsRequest = async (params = null): Promise<any> => {
  const resp = await fetch(`/api/ticket?${stringify(params)}`, {
    method: 'GET',
    headers: requestHeaders,
  });
  return resp.json();
};

export const deleteEpicRequest = async (id: string): Promise<any> => {
  const resp = await fetch(`/api/ticket/${id}`, {
    method: 'DELETE',
    headers: requestHeaders,
  });
  return resp.json();
};
