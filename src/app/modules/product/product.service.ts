import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { ProductSearchableField } from "./product.constant";
// import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createProduct = async (productData: TProduct) => {
  // const imageName = `${productData.name}`;
  // const path = file?.path;

  // const { secure_url } = await sendImageToCloudinary(imageName, path);

  // productData.images = secure_url;

  const product = await Product.create(productData);
  return product;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query
  )
    .search(ProductSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery.populate("category").exec();

  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getProductById = async (productId: string) => {
  const product = await Product.findOne({ _id: productId, isDeleted: false })
    .populate("category")
    .exec();

  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found!");

  return product;
};

const updateProduct = async (id: string, updateData: Partial<TProduct>) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true }
  );

  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found!");

  return product;
};

const deleteProduct = async (id: string) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );

  if (!product) throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  return product;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
