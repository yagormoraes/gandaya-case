import express from "express";
import balanceRoutes from "./routes/balanceRoutes";
import purchaseHistoryRoutes from "./routes/purchaseHistoryRoutes";
import menuRoutes from "./routes/menuRoutes";

const app = express();

app.use(express.json());

app.use(balanceRoutes);
app.use(purchaseHistoryRoutes);
app.use(menuRoutes);

export default app;
