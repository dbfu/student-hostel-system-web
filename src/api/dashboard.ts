// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 此处后端没有提供注释 GET /dashboard/ */
export async function dashboard_getDashboardData(options?: {
  [key: string]: any;
}) {
  return request<API.DashboardDataVO>("/dashboard/", {
    method: "GET",
    ...(options || {}),
  });
}
