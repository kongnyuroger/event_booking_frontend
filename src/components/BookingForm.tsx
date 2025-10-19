'use client'
import React from "react"
interface props{
    close: () => void
}
const  BookingForm: React.FC<props> = ({close}) => {
    return(

        <div className="book-overlay">
            <form className="bg-white p-6">
                <label htmlFor="seats">Seats</label>
                <input type="number" />
                <button onClick={close} type="submit">Book</button>
            </form>
        </div>
    )
}

export default BookingForm