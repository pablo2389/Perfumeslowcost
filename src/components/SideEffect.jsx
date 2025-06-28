import React, { useEffect, useState } from "react";

const SideEffect = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Código que antes iba en componentWillMount o componentDidMount
    setTimeout(() => {
      setData("Datos cargados correctamente");
    }, 1000);
  }, []); // [] asegura que solo se ejecuta al montar

  return <div>{data || "Cargando..."}</div>;
};

export default SideEffect;
