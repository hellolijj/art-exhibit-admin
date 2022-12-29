// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 401 GET /api/401 */
export async function getPinyin_401(options?: { [key: string]: any }) {
  return request<API.AntResp>('/api/401', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 403 GET /api/403 */
export async function getPinyin_403(options?: { [key: string]: any }) {
  return request<API.AntResp>('/api/403', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 404 GET /api/404 */
export async function getPinyin_404(options?: { [key: string]: any }) {
  return request<API.AntResp>('/api/404', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 500 GET /api/500 */
export async function getPinyin_500(options?: { [key: string]: any }) {
  return request<any>('/api/500', {
    method: 'GET',
    ...(options || {}),
  });
}
