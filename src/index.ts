import express from 'express'
import authRouter from './modules/auth/auth.routes'
import adminRouter from './modules/admin/admin.routes'
import userRouter from './modules/users/user.routes'
import tutorRouter from './modules/tutors/tutor.routes'
import bookingRouter from './modules/bookings/booking.routes'
import reviewRouter from './modules/reviews/review.routes'
import { globalErrorHandler } from './middlewares/error'
import { PORT } from './lib/env'

const port = PORT || 5000

const server = express()
server.use(express.json())
server.use('/api', authRouter)
server.use('/api', adminRouter)
server.use('/api', userRouter)
server.use('/api', tutorRouter)
server.use('/api', bookingRouter)
server.use('/api', reviewRouter)
server.use(globalErrorHandler)

server.listen(port, () => {
    console.log(`[SERVER IS RUNNING ON PORT ${port}]`);
})