import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App.js"; 

const rootElement = document.getElementById("root"); // This should match the id in your HTML

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Create root
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
