import { toast } from 'react-toastify';

const KEY = '36810234-b5e1d7960ec1148affe35137c';
const URL_IMAGES = 'https://pixabay.com/api/?';

export function requestImages(q, page, perPage) {
  const searchParams = new URLSearchParams({
    q,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: perPage,
    page,
  });

  return fetch(`${URL_IMAGES}${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      toast.warn(error.message);
    });
}
