require("dotenv").config();
const app = require("./src/app");
const sequelize = require('./src/config/db');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Sincroniza la base de datos al iniciar el servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Conexión a la base de datos exitosa.');
}).catch((err) => {
  console.error('Error al conectar la base de datos:', err);
});
