import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const app = document.getElementById("root");

if (app == null) {
	throw new Error("FATAL: Document has no root");
}

createRoot(app).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
