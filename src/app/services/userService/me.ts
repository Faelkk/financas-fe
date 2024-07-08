import { User } from "../../entities/user";
import { httpClient } from "../httpClient";

export async function me() {
  const { data } = await httpClient.get<User>("/me");

  return data;
}
