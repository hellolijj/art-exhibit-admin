// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** list查询用户列表 GET /api/user */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any },
) {
  return request<{
    success: boolean;
    data: { list?: API.User[]; current?: number; pageSize?: number; total?: number };
    code: string;
    message: string;
    showType: string;
  }>('/api/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改用户信息 修改用户信息 PUT /api/user */
export async function putUser(
  body: {
    /** 用户名 */
    username: string;
    /** 角色 */
    role: number;
    /** 密码 */
    password: string;
    /** 姓名 */
    name?: string;
    /** 联系电话 */
    tel?: string;
    /** 邮箱 */
    email?: string;
    /** 是否删除 */
    is_del: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Resp>('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建用户 POST /api/user */
export async function postUser(
  body: {
    /** 用户名 */
    username: string;
    /** 角色 */
    role: number;
    /** 密码 */
    password: string;
    /** 姓名 */
    name?: string;
    /** 联系电话 */
    tel?: string;
    /** 邮箱 */
    email?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Resp>('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询单条用户记录 GET /api/user/${param0} */
export async function getUserUid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserUidParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<{
    success: boolean;
    data: API.User;
    code: string;
    message: string;
    showType: string;
  }>(`/api/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除用户 删除用户 DELETE /api/user/${param0} */
export async function deleteUserId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Resp>(`/api/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
