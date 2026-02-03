import { API_BASE_URL, API_ENDPOINTS } from "@/shared/constants/api";
import { apiFetch } from "@/shared/api/fetch";

export const itemService = {
  getList: () => apiFetch(`${API_BASE_URL}${API_ENDPOINTS.ITEMS}`),

  create: (name: string) =>
    apiFetch(`${API_BASE_URL}${API_ENDPOINTS.ITEMS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }),

  getDetail: (id: number) =>
    apiFetch(`${API_BASE_URL}${API_ENDPOINTS.ITEMS}/${id}`),

  update: (
    id: number,
    payload: {
      name?: string;
      isCompleted?: boolean;
      memo?: string;
      imageUrl?: string;
    },
  ) =>
    apiFetch(`${API_BASE_URL}${API_ENDPOINTS.ITEMS}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }),

  delete: (id: number) =>
    apiFetch(`${API_BASE_URL}${API_ENDPOINTS.ITEMS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }),

  uploadImage: (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    return apiFetch(`${API_BASE_URL}${API_ENDPOINTS.IMAGES_UPLOAD}`, {
      method: "POST",
      body: formData,
    });
  },
};
