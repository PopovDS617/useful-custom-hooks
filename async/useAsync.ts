import { useCallback, useEffect, useState } from 'react';

type TUseAsync = (
  callback: () => Promise<number[]>,
  interval: number,
  dependencies?: [] | unknown[]
) => {
  loading: boolean;
  error: boolean;
  value: number[] | [];
  refreshHandler: () => void;
};

export const useAsync: TUseAsync = (
  callback,
  interval: number,
  dependencies = []
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState<number[] | []>([]);

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(false);
    setValue([]);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  const refreshHandler = () => {
    callbackMemoized();
  };

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  useEffect(() => {
    const timer = setInterval(() => {
      callbackMemoized();
    }, interval);
    return () => clearInterval(timer);
  }, [callbackMemoized]);

  return { loading, error, value, refreshHandler };
};
