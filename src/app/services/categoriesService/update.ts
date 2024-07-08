import { httpClient } from "../httpClient";

export interface UpdateCategorysParams {
  image: string;
  categoryName: string;
  categoryType: string;
  categoryColor: string;
}

export async function update(id: string, dataUpdate: UpdateCategorysParams) {
  const { data } = await httpClient.patch(`/categories/${id}`, dataUpdate);

  return data;
}
