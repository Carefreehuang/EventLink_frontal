import httpInstance from "@/utils/http"

export const uploadAPI = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return httpInstance({
        url: '/common/upload',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};