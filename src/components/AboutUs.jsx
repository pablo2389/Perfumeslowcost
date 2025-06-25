import { Typography, Box, Paper } from "@mui/material";

const AboutUs = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, mx: "auto", maxWidth: 800, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        ¿Quiénes somos?
      </Typography>
      <Typography variant="body1" paragraph>
        En <strong>Lowcost</strong> nos dedicamos a ofrecer perfumes de calidad al mejor precio del mercado.
        Trabajamos con clones y equivalencias premium que respetan la esencia de las grandes marcas.
      </Typography>
      <Typography variant="body1" paragraph>
        📍 Estamos en Las Heras, Mendoza.  
        📞 Teléfono: <strong>2616616758</strong>  
        💳 Transferencias al alias: <strong>34836075.prex</strong>  
        💸 Valor fijo: $20.000 por unidad  
        🚚 Envíos desde $500 por km
      </Typography>
    </Paper>
  );
};

export default AboutUs;
