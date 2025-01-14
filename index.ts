import express from "express";
import { env } from "./src/env";
import { productRouter } from "./app/routes/product";

const app = express();
app.use(express.json());
app.use("/products", productRouter);
app.listen(env.port, () => {
    console.log("Listening on port", env.port);
});
