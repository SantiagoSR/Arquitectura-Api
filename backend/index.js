import bodyParser from "body-parser";

import calculateRoutes from "./routes/calculate.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/calculate", calculateRoutes);
app.get("/", (req, res) => res.send("Welcome to the Configuration API!"));

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));