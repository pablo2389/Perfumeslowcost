import React, { useState, useEffect } from "react";
import perfumes from "../data/perfumes";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const ciudades = [
  "Mendoza",
  "Las Heras",
  "Guaymallén",
  "Godoy Cruz",
  "Luján",
  "Maipú",
];

const calcularCostoEnvio = (ciudadRaw, hora, distanciaKm = 0) => {
  const ciudad = ciudadRaw.trim();
  const horaNum = parseInt(hora.split(":")[0]);

  if (ciudad === "Las Heras") return distanciaKm <= 10 ? 0 : 1000;
  if (ciudad === "Mendoza") return horaNum <= 15 ? 0 : 1000;

  const tarifas = {
    Guaymallén: 1500,
    "Godoy Cruz": 2000,
    Luján: 4000,
    Maipú: 4000,
  };

  return tarifas[ciudad] || 0;
};

const ShippingCalculator = () => {
  const [nombre, setNombre] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [hora, setHora] = useState("14:00");
  const [distanciaKm, setDistanciaKm] = useState("");
  const [costo, setCosto] = useState(null);
  const [modoVendedor, setModoVendedor] = useState(false);
  const [historial, setHistorial] = useState(() => {
    const guardado = localStorage.getItem("historialPedidos");
    return guardado ? JSON.parse(guardado) : [];
  });

  const perfumeSeleccionado = perfumes.find((p) => p.id === 2); // Simulado
  const totalProductos = perfumeSeleccionado ? perfumeSeleccionado.precio : 0;

  const handleCalcular = () => {
    const km = ciudad.trim() === "Las Heras" ? parseFloat(distanciaKm) || 0 : 0;
    const costoFinal = calcularCostoEnvio(ciudad, hora, km);
    setCosto(costoFinal);
  };

  const handleReset = () => {
    setCiudad("");
    setHora("14:00");
    setDistanciaKm("");
    setCosto(null);
    setNombre("");
    setEmailCliente("");
    setTelefono("");
    setComentarios("");
  };

  const activarModoVendedor = () => {
    const clave = prompt("Ingresá la clave del vendedor:");
    if (clave === "12345") {
      setModoVendedor(true);
      localStorage.setItem("modoVendedor", "true");
      alert("Modo vendedor activado");
    } else {
      alert("Clave incorrecta");
    }
  };

  const salirModoVendedor = () => {
    setModoVendedor(false);
    localStorage.removeItem("modoVendedor");
    alert("Modo vendedor desactivado");
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("modoVendedor") === "true";
    if (savedMode) {
      const clave = prompt("Ingresá la clave del vendedor para activar modo vendedor:");
      if (clave === "12345") {
        setModoVendedor(true);
      } else {
        localStorage.removeItem("modoVendedor");
        setModoVendedor(false);
        alert("Clave incorrecta. Modo vendedor no activado.");
      }
    }
  }, []);

  const generarTextoWhatsApp = () => {
    if (!ciudad || costo === null || !perfumeSeleccionado) return "";
    const totalFinal = totalProductos + costo;
    const urlImagen = perfumeSeleccionado.imagen;

    return encodeURIComponent(
      `🧾 *Pedido:*
- Producto: ${perfumeSeleccionado.nombre}
- Imagen: ${urlImagen}

💰 *Total productos:* $${totalProductos}
📍 *Envío a:* ${ciudad} a las ${hora}
🚚 *Costo de envío:* $${costo}

💵 *Total final:* $${totalFinal}

📲 Confirmar por este chat, ¡gracias!`
    );
  };

  const guardarPedidoHistorial = () => {
    if (!perfumeSeleccionado || !ciudad || costo === null) return;

    const nuevoPedido = {
      id: Date.now(),
      nombreCliente: nombre || "(sin nombre)",
      emailCliente: emailCliente || "(sin email)",
      telefono: telefono || "(sin teléfono)",
      comentarios: comentarios || "",
      perfumeId: perfumeSeleccionado.id,
      perfumeNombre: perfumeSeleccionado.nombre,
      perfumeImagen: perfumeSeleccionado.imagen,
      ciudad,
      hora,
      costoEnvio: costo,
      precioProducto: totalProductos,
      fecha: new Date().toLocaleString(),
    };

    const nuevoHistorial = [nuevoPedido, ...historial];
    setHistorial(nuevoHistorial);
    localStorage.setItem("historialPedidos", JSON.stringify(nuevoHistorial));
    alert("Pedido guardado en historial!");
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Calculador de Envío
      </Typography>

      <TextField
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        type="email"
        value={emailCliente}
        onChange={(e) => setEmailCliente(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Comentarios (opcional)"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        fullWidth
        multiline
        rows={2}
        sx={{ mb: 2 }}
      />

      <TextField
        select
        label="Ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {ciudades.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </TextField>

      {ciudad.trim() === "Las Heras" && (
        <TextField
          label="Distancia (km)"
          type="number"
          value={distanciaKm}
          onChange={(e) => setDistanciaKm(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}

      <Button variant="contained" onClick={handleCalcular} fullWidth sx={{ mb: 1 }}>
        Calcular costo
      </Button>

      {costo !== null && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Costo estimado de envío: <strong>${costo}</strong>
        </Typography>
      )}

      {/* Botón "Enviar pedido por WhatsApp" ocultado */}
      {/*
      <Button
        variant="outlined"
        color="success"
        sx={{ mt: 2, mb: 1 }}
        href={`https://wa.me/542616616758?text=${generarTextoWhatsApp()}`}
        target="_blank"
        rel="noopener noreferrer"
        disabled={!ciudad || costo === null}
      >
        Enviar pedido por WhatsApp
      </Button>
      */}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={guardarPedidoHistorial}
        disabled={!ciudad || costo === null}
      >
        Guardar pedido en historial
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={handleReset}
        sx={{ mt: 2, mb: 2 }}
      >
        Resetear formulario
      </Button>

      {!modoVendedor && (
        <Button
          variant="outlined"
          color="warning"
          fullWidth
          onClick={activarModoVendedor}
        >
          Soy el vendedor
        </Button>
      )}

      {modoVendedor && (
        <>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={salirModoVendedor}
          >
            Salir de modo vendedor
          </Button>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Historial de pedidos guardados
          </Typography>
          {historial.length === 0 && (
            <Typography variant="body2">No hay pedidos guardados.</Typography>
          )}
          <List>
            {historial.map((pedido) => (
              <React.Fragment key={pedido.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={pedido.perfumeImagen || "/fallback-image.png"}
                      alt={pedido.perfumeNombre}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={pedido.perfumeNombre}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Cliente: {pedido.nombreCliente} | {pedido.telefono}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          Ciudad: {pedido.ciudad} | Envío: ${pedido.costoEnvio} |{" "}
                          {pedido.fecha}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          Comentarios: {pedido.comentarios || "(ninguno)"}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default ShippingCalculator;
