// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户列表 GET /api/user */
export async function listUser(
    params: {
      // query
      /** 当前的页码 */
      current?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) {
    return request<API.UserList>('/api/v1/user', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }


/**更新用户信息 PUT /api/user */
export async function updateUser(body: API.UserListItem, options?: { [key: string]: any }) {
    if (body == undefined || body.id == undefined) {
        return
    }
    return request<API.UserListItem >('/api/v1/user/'+body.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 删除规则 DELETE /api/user */
export async function removeUser(body: API.UserListItem, options?: { [key: string]: any }) {
  if (!body.id) {
    return
  }
  return request<Record<string, any>>('/api/user/'+body.id, {
    method: 'DELETE',
    ...(options || {}),
  });
}