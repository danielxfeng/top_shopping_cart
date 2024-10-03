import { v4 as uuidv4 } from "uuid";

// Mock API
const orderApi = async (cart) => {
  return new Promise((resolve, reject) => {
    const result = Math.random() > 0.5 ? true : false;
    const id = uuidv4();
    setTimeout(() => {
      result ? resolve({ id }) : reject({ id });
    }, 2000);
  });
};

export default orderApi;
