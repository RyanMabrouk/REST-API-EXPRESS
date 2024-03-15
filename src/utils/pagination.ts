import { FilterQuery, Model, QueryOptions } from "mongoose";
type PaginationOptions = {
  page: number;
  limit: number;
};
export async function paginateQuery<T>({
  model,
  query,
  options = { lean: true },
  pagination,
}: {
  model: Model<T>;
  query: FilterQuery<T>;
  options?: QueryOptions;
  pagination: PaginationOptions;
}) {
  const { limit, page } = pagination;
  const skip = (page - 1) * limit;
  const data = await model.find(query, {}, options).skip(skip).limit(limit);
  const total = await model.countDocuments(query, options);
  return {
    data: data,
    total: data.length,
    totalPages: Math.ceil(total / limit),
  };
}
