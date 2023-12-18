import { userRouter } from "./user.js"
export const initRoutes = (app) => {
    app.use('/api/user', userRouter)
}