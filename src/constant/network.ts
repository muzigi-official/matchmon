// 네트워크/HTTP 관련 상수

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  // 추후 필요 시 추가: UNAUTHORIZED(401), FORBIDDEN(403), NOT_FOUND(404), INTERNAL_SERVER_ERROR(500) 등
} as const;

// axios 요청 타임아웃(ms)
export const REQUEST_TIMEOUT_MS = 6000;
