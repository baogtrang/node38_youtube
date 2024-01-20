import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json()); // parse body string --> body json
app.use(express.static(".")); // to locate where files are saved
app.use(cors()); // allow the FE to making requests to the API
app.use(rootRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`BE starting with port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello node38 youtube");
});
