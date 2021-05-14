import { useQuery } from "react-query";
import { client } from "../utils";

function useSearchDanaLines(field, query) {
  const lines = useQuery([`dana-line-by-${field}`, `${query}`], async () => {
    try {
      const respon = await client(`/dana-line?${field}=${query}`);
      return respon.data;
    } catch (error) {
      throw new Error(error);
    }
  });
  return lines;
}

export { useSearchDanaLines };
