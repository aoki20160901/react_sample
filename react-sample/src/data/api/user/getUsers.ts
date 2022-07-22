import { rest } from '../../rest';
import { User } from '../../type';

const getUsers = async (): Promise<User[]> => {
  const url = "/user/list";
  try {
    const { data } = await rest.get<User[]>(url)
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export { getUsers };