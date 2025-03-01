// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 编辑 PUT /repair/ */
export async function repair_edit(
  body: API.RepairDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/repair/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST /repair/ */
export async function repair_create(
  body: API.RepairDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/repair/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /repair/${param0} */
export async function repair_getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.repairGetByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/repair/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 DELETE /repair/${param0} */
export async function repair_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.repairRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/repair/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 专业列表 GET /repair/list */
export async function repair_list(options?: { [key: string]: any }) {
  return request<API.RepairVO[]>("/repair/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询 GET /repair/page */
export async function repair_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.repairPageParams,
  options?: { [key: string]: any }
) {
  return request<API.RepairPageVO>("/repair/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询当前用户报修单 GET /repair/page/current */
export async function repair_pageCurrent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.repairPageCurrentParams,
  options?: { [key: string]: any }
) {
  return request<API.RepairPageVO>("/repair/page/current", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
