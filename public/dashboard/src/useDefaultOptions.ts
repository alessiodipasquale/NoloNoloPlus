import { useMemo } from "react";
import { IncomingOptions } from "use-http";

const useDefaultOptions = (token: string) : IncomingOptions =>
  useMemo(
    () => ({
      headers: {
        authorization: "Bearer " + (process.env.REACT_APP_TOKEN ?? token),
      },
      responseType: "json",
    }),
    [token]
  );

export default useDefaultOptions;
