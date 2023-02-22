import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { createContext, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "./styles/fonts.css";

import "react-toastify/dist/ReactToastify.css";
import useAppContext, { AppContextType } from "./Hooks/useAppContext";
import Routers from "./Routers";
import { theme } from "./Themes/theme";

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = () => {
  return useContext(AppContext);
};
function App() {
  const value = useAppContext();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={value}>
        <CssBaseline />
        <Routers />
      </AppContext.Provider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
