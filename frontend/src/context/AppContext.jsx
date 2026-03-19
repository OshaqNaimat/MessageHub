// create the context

import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selected, setSeleceted] = useState(null);

  return (
    <AppContext.Provider
      value={{
        selected,
        setSeleceted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
