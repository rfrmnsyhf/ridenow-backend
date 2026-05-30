require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

const paymentRoutes =
require('./src/routes/payment.routes')

app.use(
  '/api/payments',
  paymentRoutes
);