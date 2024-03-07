import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;
    
    console.log("Request body:", req.body);

    if (!firstName || !lastName || !email || !date || !time || !phone) {
        return next(new ErrorHandler("Please fill out the full reservation form!", 400));
    }

    try {
        const reservation = await Reservation.create({
            firstName,
            lastName,
            email,
            phone,
            date,
            time
        });

        console.log("Created reservation:", reservation);

        res.status(200).json({
            success: true,
            message: "Reservation Sent Successfully!"
        });
    } catch (error) {
        console.error("Error:", error);
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }
        return next(error)
    }
};
