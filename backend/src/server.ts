import { clientRouter } from './router/clientRoutes';
import { userRouter } from './router/userRoutes';
import app from "./app";

app.use("/", userRouter);
app.use("/clients", clientRouter)