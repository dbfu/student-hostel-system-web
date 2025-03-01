// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 编辑专业 PUT /major/ */
export async function major_edit(
  body: API.MajorDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/major/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建专业 POST /major/ */
export async function major_create(
  body: API.MajorDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/major/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除专业 DELETE /major/${param0} */
export async function major_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.majorRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/major/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 专业列表 GET /major/list */
export async function major_list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.majorListParams,
  options?: { [key: string]: any }
) {
  return request<API.MajorVO[]>("/major/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询 GET /major/page */
export async function major_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.majorPageParams,
  options?: { [key: string]: any }
) {
  return request<API.MajorPageVO>("/major/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
