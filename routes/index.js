import { authRouter } from "./auth.js"
import { userRouter } from "./user.js"
import { listingRouter } from "./listing.js"

export const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/listing', listingRouter)
}