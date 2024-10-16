export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://pickleswithpickles.oa.r.appspot.com/api' 
    : 'http://localhost:8081/api');

export const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://pickleswithpickles.oa.r.appspot.com' 
    : 'http://localhost:8081');
