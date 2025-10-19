'use client'
import { useAuth } from "@/hooks/useAuth"
import { useState, useEffect } from "react"
import { UserEvents, bookings} from "@/services/api"
import { useRouter } from "next/navigation"




function dashboard(){
    useAuth()
    const userId = localStorage.getItem('userId')
    console.log(userId)
    const [events, setEvents] = useState([])
    const [bookedEvents, setBookedEvents] = useState([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    async function fetchEvents() {
            try {
            setLoading(true)
            const {data} = await UserEvents();
            setEvents(data)
            console.log(events);
          } catch (err) {
            console.log(err.message);
          } finally {
            setLoading(false)
          }
          }

           async function fetchBookings() {
            try {
            setLoading(true)
            const {data} = await bookings();
            setBookedEvents(data)
            console.log(bookedEvents);
            
          } catch (err) {
            console.log(err.message);
          } finally {
            setLoading(false)
           
          }
          }
    
    
        useEffect(() => {
          
          fetchEvents()
          fetchBookings()
        }, []);
    return(
        <div className="flex justify-center flex-2 gap-6">
            <div className="p-4 shadow">
                <h2>My Created Events</h2>
                {loading? (<p>looging</p>):
                    (events.map((event, i) => (
                        <div key={i} className="p-4 border border-gray-100 rounded mb-4 flex"> 
                        <h3>{event.title} -- </h3>
                        <p>{event.date}</p>
                        </div>
                    )))
                }

            </div>
            <div className="p-4 shadow">
                <h2>My Bookings</h2>
                {loading? (<p>loogin</p>):
                    (bookedEvents.map((event, i) => (
                        <div key={i} className="p-4 border border-gray-100 rounded mb-4 flex"> 
                        <h3>{event.title} -- </h3>
                        <p>{event.date}</p>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}

export default dashboard