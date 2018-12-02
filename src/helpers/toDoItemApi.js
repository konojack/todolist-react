import { toDoItemsApiUrl } from './routes';
import * as api from './api';

export const getAll = () =>
    api.get(toDoItemsApiUrl());

export const create = params => 
    api.post(toDoItemsApiUrl(), { ...params });

export const destroy = id => 
    api.destroy(toDoItemsApiUrl(id));

export const update = (id, params) =>
    api.put(toDoItemsApiUrl(id), { ...params });