// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** get 作者信息 GET /api/author/${param0} */
export async function getAuthorId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuthorIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<{
    success: boolean;
    data: API.Author;
    code: string;
    message: string;
    showType: string;
  }>(`/api/author/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
