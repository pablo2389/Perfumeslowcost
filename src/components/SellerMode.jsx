import React, { useState, useEffect } from "react";

const SellerMode = ({ children }) => {
  const [isSeller, setIsSeller] = useState(false);
  const [input, setInput] = useState("");

  const correctPassword = "@##123"; // 🔑 Cambia esto por la clave real

  useEffect(() => {
    const stored = localStorage.getItem("sellerMode");
    if (stored === "true") {
      setIsSeller(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === correctPassword) {
      setIsSeller(true);
      localStorage.setItem("sellerMode", "true");
    } else {
      alert("Clave incorrecta");
    }
    setInput("");
  };

  if (!isSeller) {
    return (
      <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
        <h2>Ingresar clave vendedor</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Clave"
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button type="submit" style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem" }}>
          Ingresar
        </button>
      </form>
    );
  }

  return <>{children}</>;
};

export default SellerMode;
