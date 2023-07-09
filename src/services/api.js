import axios from 'axios';

export const fechImg = async (toSearch, page = 1) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${toSearch}&page=${page}&key=36594676-c6f23ee7c090487a3a64019ea&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};
