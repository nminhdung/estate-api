import { authRouter } from "./auth.js"
import { userRouter } from "./user.js"
export const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)
}