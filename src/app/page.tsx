"use client";
import Image from "next/image";
import { getEvents } from "@/services/api";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";

export default function Home() {

    const [events, setEvents] = useState([])
  
    useEffect(() => {
      async function fetchEvents() {
        try {
        const res = await getEvents(8, 0);
        setEvents(res.data)
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
      }
      fetchEvents()
    }, []);
  
    console.log(events)
  function handleSubmit() {}
  return (
    <div className="mt-4 mb-4">
      <header className="flex justify-between align-middle">
        <div>
          <h1>Upcoming events </h1>
          <p>book seats before they run out</p>
        </div>
        <form className="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Search" />
          <input
            className=" cursor-pointer"
            type="submit"
            placeholder="Search"
          />
        </form>
      </header>
      <div className="pt-4 flex flex-wrap gap-4 ">
        {
          events.map((event:any) => (
            <EventCard 
            title={event.title}
            date={event.created_at}
            description={event.description}
            seatsleft={event.available_seats}
            totalseats={event.total_seats}
            />
            
          ))
        }
        
      </div>
    </div>
  );
}
