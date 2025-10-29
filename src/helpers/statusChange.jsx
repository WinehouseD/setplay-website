import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showSuccess = (message) =>
  toast(message, {
    style: {
      background: "var(--background-color)",
      color: "var(--primary-color)",
      fontWeight: "bold",
      borderRadius: "8px",
      padding: "12px",
      boxShadow: "0 20px 80px rgba(59,130,246,0.25)",
      border: "2px solid #059669",
      justifyContent: "center",
    },
  });

const showWarning = (message) =>
  toast(message, {
    style: {
      background: "var(--background-color)",
      color: "var(--primary-color)",
      fontWeight: "bold",
      borderRadius: "8px",
      boxShadow: "0 20px 80px rgba(59,130,246,0.25)",
      border: "2px solid #fff700",
      justifyContent: "center",
    },
  });

const showError = (message) =>
  toast(message, {
    style: {
      background: "var(--background-color)",
      color: "var(--primary-color)",
      fontWeight: "bold",
      borderRadius: "8px",
      padding: "12px",
      boxShadow: "0 20px 80px rgba(59,130,246,0.25)",
      border: "2px solid red",
      justifyContent: "center",
    },
  });
export { showSuccess, showWarning, showError };
