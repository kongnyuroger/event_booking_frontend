"use client";
import Image from "next/image";
import { getEvents } from "@/services/api";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { h1 } from "framer-motion/m";

export default function Home() {

    const [events, setEvents] = useState([])
    const [offset, setOffset] = useState<number>(0)
    const [hasmore, setHasmore] = useState(true)
    const [loading, setLoading] = useState(false)
    const limit = 6
     async function fetchEvents(lim: number, off: number ) {
        try {
        setLoading(true)
        const res = await getEvents(lim, off);
        setEvents(res.data)
        if(res.data.length < 6) setHasmore(false)
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false)
      }
      }

    useEffect(() => {
      fetchEvents(limit, offset)
    }, [offset]);
  
    function nextPage() {
       if (hasmore) setOffset(prev => prev + 6)
      
    }
    function prevPage() {
       if (offset >= 0) {setOffset(prev => prev - 6)}
      
    }
    console.log(events)
  function handleSubmit() {}
  return (
    <div className=" mb-4">
      <header className="flex justify-between align-middle">
        <div>
          <h1>Upcoming events </h1>
          <p>book seats before they run out</p>
        </div>
        <div> 
        <form className="w-70 gap-2 flex" onSubmit={handleSubmit}>
          <input type="text" placeholder="find event" />
          <button
            className=" search"
            type="submit"
            
          > Search</button>


        </form>
        </div>
      </header>
      {loading ? (
        <h1>....</h1>
      ): (<div className="pt-4 pb-4 flex flex-wrap gap-4 ">
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
        
      </div>)}
      
      <div className="flex justify-center gap-4">
        <button onClick={prevPage}>Prev</button>
        <button className="search" onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}
