import React from "react";
import LoaderWrapper from "./LoaderWrapper";

export interface LoaderContextInterface {
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoaderContext = React.createContext<LoaderContextInterface | null>(null);

const LoaderProvider: React.FC<{}> = ({ children }) => {
  let [loading, setLoading] = React.useState(true);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      <LoaderWrapper loading={loading}></LoaderWrapper>
      {children}
    </LoaderContext.Provider>
  );
}

export { LoaderContext, LoaderProvider };
