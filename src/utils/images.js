const CLOUDINARY_URL = `https://res.cloudinary.com/thekdizzler/image/upload/whitemarket_eu/`;
const FETCH_URL = `https://res.cloudinary.com/thekdizzler/image/fetch/`;

const isCloudinary = (url) => /^https:\/\/res.cloudinary.com\//.test(url);
const isLocal = (image) => /^\/img\//.test(image);
const setWidth = (url, width) => url.replace(`/upload/`, `/upload/f_auto,c_scale,w_${width}/`);
const fetchViaCloudinary = (url, width) => `${FETCH_URL}f_auto,c_scale,w_${width}/${url}`;

export function getImageURL({ image = ``, width = 1100 }) {
  if (!image) return ``;
  let url = image.trim();
  if (isLocal(url)) url = `${CLOUDINARY_URL}${url.replace(`/img/`, ``)}`;

  if (isCloudinary(url)) {
    url = setWidth(url, width);
  } else {
    url = fetchViaCloudinary(url, width);
  }

  return url;
}
