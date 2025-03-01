// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 编辑 PUT /hostel/ */
export async function hostel_edit(
  body: API.HostelDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/hostel/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST /hostel/ */
export async function hostel_create(
  body: API.HostelDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/hostel/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /hostel/${param0} */
export async function hostel_getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostelGetByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/hostel/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 DELETE /hostel/${param0} */
export async function hostel_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostelRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/hostel/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 宿舍列表 GET /hostel/list */
export async function hostel_list(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostelListParams,
  options?: { [key: string]: any }
) {
  return request<API.HostelVO[]>("/hostel/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询 GET /hostel/page */
export async function hostel_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.hostelPageParams,
  options?: { [key: string]: any }
) {
  return request<API.HostelPageVO>("/hostel/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
