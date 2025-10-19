"use client";
import React from "react";
import { motion } from "framer-motion";

interface cardProps {
  title: string;
  date: string;
  seatsleft: string;
  totalseats: string;
  description: string;
  book: () => void;
  details: () => void;
}
const EventCard: React.FC<cardProps> = ({
  title,
  date,
  seatsleft,
  totalseats,
  description,
  details,
  book,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="p-4 rounded-xl w-96 bg-white
       shadow "
    >
      <div className="flex justify-between">
        <div>
          <h2>{title}</h2>
          <p>{date}</p>
        </div>
        <div>
          <h2>
            {seatsleft}/{totalseats}
          </h2>
          <p>seats left</p>
        </div>
      </div>
      <p className="text-gray-100">{description}</p>
      <div className=" flex gap-4 mt-4 ">
        <button onClick={details} className="view-btn">
          View
        </button>
        <button onClick={book}>Book</button>
      </div>
    </motion.div>
  );
};

export default EventCard;
