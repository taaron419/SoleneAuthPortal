require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");
require("./models");

const port = Number(process.env.PORT || 5000);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer();
