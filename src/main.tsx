import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import nightwind from "nightwind/helper";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>My Title</title>
        <script>{nightwind.init()}</script>
      </Helmet>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
