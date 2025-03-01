// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 编辑 PUT /student/ */
export async function student_edit(
  body: API.StudentDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/student/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST /student/ */
export async function student_create(
  body: API.StudentDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/student/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /student/${param0} */
export async function student_getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.studentGetByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/student/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 DELETE /student/${param0} */
export async function student_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.studentRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/student/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 下载模板 POST /student/export/template */
export async function student_downloadTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/student/export/template", {
    method: "POST",
    ...(options || {}),
  });
}

/** 导入 POST /student/import */
export async function student_import(
  body: {},
  files?: File[],
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (files) {
    files.forEach((f) => formData.append("files", f || ""));
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<any>("/student/import", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 查询全部 GET /student/list */
export async function student_list(options?: { [key: string]: any }) {
  return request<any>("/student/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询 GET /student/page */
export async function student_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.studentPageParams,
  options?: { [key: string]: any }
) {
  return request<API.StudentPageVO>("/student/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
