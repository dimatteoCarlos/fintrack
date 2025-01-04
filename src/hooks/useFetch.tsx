import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export type FetchResponse<R> = {
  data: R | null;
  isLoading: boolean;
  error: Error | null;
};

export function useFetch<R>( url: string): FetchResponse<R> {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<R> = await axios.get(url);

      if (response.status >= 200 && response.status < 300) {
        const respData = (await response.data) as R;
        // console.log({ respData });
        setData(respData);
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (err: unknown) {
      if (err) {
        const safeError =
          err instanceof Error ? err : new Error('Unexpected error');
        console.error(safeError);
        setData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setIsLoading(false);
      setError(null);
      setData(null);
    };
  }, [url]);

  return { data, isLoading, error };
}


//agregar tooltip a botones que no tienen label

