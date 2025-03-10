import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./Utils/ReactQueryConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalProvider } from "./components/Modal/ModalContext";
import { ReactQueryDevtools } from "react-query/devtools";
import "./main.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        style={{ width: "500px" }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </ModalProvider>
  </QueryClientProvider>
);
