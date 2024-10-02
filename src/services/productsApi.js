// This service is responsible for fetching products from the fakestoreapi.com.
const ProductsApi = () => {
  const _url = "https://fakestoreapi.com/products";
  let _categories = [];

  // Plesae call this method first before calling getByCategory() and getCategories().
  const init = async () => {
    const response = await fetch(`${_url}/categories`, { mode: "cors" });
    _categories = await response.json();
  };

  // Fetch all products from the API.
  const getAll = async () => {
    const response = await fetch(_url, { mode: "cors" });
    return await response.json();
  };

  // Fetch a single product by its id.
  const getOne = async (id) => {
    const response = await fetch(`${_url}/${id}`, { mode: "cors" });
    return await response.json();
  };

  // Fetch products by category.
  const getByCategory = async (category) => {
    if (!_categories.length)
      throw new Error("Empty categories, maybe call init first.");
    if (!_categories.includes(category)) throw new Error("Category not found.");
    const response = await fetch(`${_url}/category/${category}`, {
      mode: "cors",
    });
    return await response.json();
  };

  // Get the categories list.
  const getCategories = () => {
    return _categories;
  };

  return { init, getAll, getOne, getByCategory, getCategories };
};

const productsApi = ProductsApi();

export default productsApi;
