import { Router } from "express";
import * as controllers from "./booking.controller"

const bookingRouter = Router()

bookingRouter.post('/bookings', controllers.changeBookingStatusController)
bookingRouter.get('/bookings', controllers.getBookingsController)
bookingRouter.patch('/bookings/:id/status', controllers.changeBookingStatusController)

export default bookingRouter 