export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("환경 변수 NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다!");
}

export const API_ENDPOINTS = {
  ITEMS: "/items",
  IMAGES_UPLOAD: "/images/upload",
} as const;
