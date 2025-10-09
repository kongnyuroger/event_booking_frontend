'use client'
import React from "react"
import { motion } from "framer-motion";


interface cardProps {
  title: string;
  date: string;
  seatsleft: string;
  totalseats: string;
  description: string;

}
const EventCard: React.FC<cardProps> = ({title, date, seatsleft,totalseats ,description}) =>{
    return(
        <motion.div whileHover={{y: -4}} className="p-4 rounded-xl w-96 bg-white shadow ">
            <div className="flex justify-between">
                <div>
                    <h2>{title}</h2>
                    <p>{date}</p>
                </div>
                <div>
                    <h2>{seatsleft}/{totalseats}</h2>
                    <p>seats left</p>
                </div>
            </div>
            <p className="text-gray-100">{description}</p>
            <div className=" flex gap-4 mt-4 ">
                <button className="view-btn">View</button>
                <button>Book</button>
            </div>
        </motion.div>
    )
}

export default EventCard