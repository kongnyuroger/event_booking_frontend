"use client";
import Image from "next/image";
import { getEvents, bookEvent, search } from "@/services/api";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasmore, setHasmore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bookform, setBookform] = useState(false);
  const [seats, setSeats] = useState(0);
  const [query, setQuery] = useState('');
  const [id, setId] = useState(0);
  const limit = 6;

  const router = useRouter();
  async function fetchEvents(lim: number, off: number) {
    try {
      setLoading(true);
      const res = await getEvents(lim, off);
      setEvents(res.data);
      if (res.data.length < 6) setHasmore(false);
      console.log(res.data);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents(limit, offset);
  }, [offset, bookform]);

  function nextPage() {
    if (hasmore) setOffset((prev) => prev + 6);
  }
  function prevPage() {
    if (offset >= 0) {
      setOffset((prev) => prev - 6);
    }
  }

  console.log(events);
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await bookEvent(id, seats);
      console.log(res.data);
      setBookform(false);
    } catch (err: any) {
      console.log(err.response);
      alert(err.response.data.error);
    }
  }
   async function handleSearch(e: any) {
    e.preventDefault();
    try {
      const res = await search(query);
      console.log(res.data);
      setEvents(res.data);
    } catch (err: any) {
      console.log(err.response);
      alert(err.response.data.error);
    }
  }
  return (
    <div className=" mb-4">
      <header className="flex justify-between align-middle">
        <div>
          <h1>Upcoming events </h1>
          <p>book seats before they run out</p>
        </div>
        <div>
          <form onSubmit = {handleSearch} className="w-70 gap-2 flex">
            <input type="text" value={query} onChange={(e) => {setQuery(e.target.value)}} placeholder="find event" />
            <button className=" search" type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
      {loading ? (
        <h1>....</h1>
      ) : (
        <div className="pt-4 pb-4 flex flex-wrap gap-4 ">
          {events.map((event: any) => (
            <EventCard
              title={event.title}
              date={event.created_at}
              description={event.description}
              seatsleft={event.available_seats}
              totalseats={event.total_seats}
              details={() => {
                router.push(`/${event.id}`);
              }}
              book={() => {
                setBookform(true);
                setId(event.id);
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="flex justify-center gap-4"
      >
        <button onClick={prevPage}>Prev</button>
        <button className="search" onClick={nextPage}>
          Next
        </button>
      </motion.div>

      {bookform && (
        <div className="book-overlay">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 flex gap-3 align-middle rounded"
          >
            <label htmlFor="seats">Seats</label>
            <input
              value={seats}
              onChange={(e: any) => {
                setSeats(e.target.value);
              }}
              type="number"
            />
            <button type="submit">Book</button>
          </form>
        </div>
      )}
    </div>
  );
}
