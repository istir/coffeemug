import * as express from "express";
import { env } from "./src/env";
import { productRouter } from "./app/routes/product";
import { orderRouter } from "./app/routes/order";
import { jsonErrorHandler, notFoundErrorHandler } from "./src/utils/error";

const app = express();

app.use(express.json());
app.use(jsonErrorHandler);

app.use("/orders", orderRouter);
app.use("/products", productRouter);

app.listen(env.port, () => {
    console.log("Listening on port", env.port);
});

app.use(notFoundErrorHandler);
