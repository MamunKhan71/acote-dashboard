import "flatpickr/dist/flatpickr.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "swiper/swiper-bundle.css";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import AppInitializer from "./components/guard/AppInitializer.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./index.css";
import store from "./redux/store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AppWrapper>
          <AppInitializer />
        </AppWrapper>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
