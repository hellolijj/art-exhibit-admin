// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** list 权限配置 GET /api/role */
export async function getRole(options?: { [key: string]: any }) {
  return request<{
    success: boolean;
    data: { list?: API.Role[]; current?: number; pageSize?: number; total?: number };
    code: string;
    message: string;
    showType: string;
  }>('/api/role', {
    method: 'GET',
    ...(options || {}),
  });
}

/** get 权限配置 GET /api/role/${param0} */
export async function getRoleName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleNameParams,
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<{
    success: boolean;
    data: API.Role;
    code: string;
    message: string;
    showType: string;
  }>(`/api/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改配置 PUT /api/role/${param0} */
export async function putRoleName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putRoleNameParams,
  body: {
    /** 展览管理 */
    exhibit: number;
    /** 作品上传 */
    production: number;
    /** 导师信息 */
    memtor: number;
    /** 用户管理 */
    user: number;
    /** 权限管理 */
    role: number;
  },
  options?: { [key: string]: any },
) {
  const { name: param0, ...queryParams } = params;
  return request<API.Resp>(`/api/role/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
