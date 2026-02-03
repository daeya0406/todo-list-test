import { ErrorCode, mapStatusToCode } from "./error";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: ErrorCode,
  ) {
    super(code);
  }
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (!res.ok) {
    throw new ApiError(res.status, mapStatusToCode(res.status));
  }

  return res.json();
}
