import { rest } from '../../rest';
import { Company } from '../../type';

const getCompanies = async (): Promise<Company[]> => {
  const url = "/companies/list";
  try {
    const { data } = await rest.get<Company[]>(url)
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export { getCompanies };