"use client";
import { useParams } from "next/navigation";
import React, { use } from "react";
import { useEffect, useState } from "react";
import { getEvent } from "@/services/api";
import EventCard from "@/components/EventCard";

function eventdetails() {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const [bookform, setBookform] = useState(false)

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
    getsingleEvent(eventId);
  }, [eventId]);

  return (
    <div>
      <EventCard
        title={event.title}
        date={event.created_at}
        description={event.description}
        seatsleft={event.available_seats}
        totalseats={event.total_seats}
        details={() => {}}
        book={() => setBookform(true)}
      />
      {bookform && (
        <div className="book-overlay">
          <form className="bg-white p-6">
            <label htmlFor="seats">Seats</label>
            <input type="number" />
            <button onClick={close} type="submit">
              Book
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default eventdetails;
