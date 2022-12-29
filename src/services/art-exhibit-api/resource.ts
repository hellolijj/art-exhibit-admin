// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 文件上传接口 用户上传一个文件，返回文件在服务器中的url地址 POST /api/upload */
export async function postUpload(body: string, options?: { [key: string]: any }) {
  return request<{
    success: boolean;
    data: { url?: string };
    code: string;
    message: string;
    showType: string;
  }>('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    data: body,
    ...(options || {}),
  });
}
