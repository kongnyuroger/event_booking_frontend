"use client";
import { useParams } from "next/navigation";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { getEvent } from "@/services/api";
import EventCard from "@/components/EventCard";
import { div } from "framer-motion/m";

function eventdetails() {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();

  async function getsingleEvent(id) {
    try {
      setLoading(true);
      const res = await getEvent(id);
      setEvent(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getsingleEvent(eventId)
  }, [eventId]);

  return(
    <div>
      <EventCard 
            title={event.title}
            date={event.created_at}
            description={event.description}
            seatsleft={event.available_seats}
            totalseats={event.total_seats}
            details={()=>{}}
            />
    </div>
  );
}

export default eventdetails;
