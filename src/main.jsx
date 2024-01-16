import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { LayoutProvider } from "./contexts/Layout/LayoutContext";

// const theme = {
//   styles: {
//     input: {
//       base: 'min-w-0 w-full border-gray-300 text-gray-900 label:text-gray-700',
//       // Aquí puedes agregar o modificar las clases de Tailwind que desees para los inputs
//     },
//     select: {
//       styles: {
//         base: 'min-w-0 w-full border-gray-300 text-gray-900 label:text-gray-700',
//         // Aquí puedes agregar o modificar las clases de Tailwind que desees para los selects
//       }
//     },
//   },
// };

const theme = {
  select: {
    defaultProps: {
      variant: "outlined",
      color: "blue",
      size: "md",
    },
    styles: {
      base: {
        container: {
          position: "relative",
          width: "w-full",
          minWidth: "min-w-[10px]",
        },
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
