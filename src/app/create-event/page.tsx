'use client'
import { h1 } from "framer-motion/m"
import  { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { createEvent } from "@/services/api"

function CreateEvent(){
    useAuth()
     const [title, setTitle] = useState<string>("");
       const [description, setDescription] = useState<string>("");
       const [date, setDate] = useState<string>("");
       const [numSeats , setNumSeats] = useState(0)
       const [error, setError] = useState<string | null>(null);
     
       const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();
         try {
           const res = await createEvent(title, description, date, numSeats);
           console.log(res.data);
         } catch (err: any) {
           setError(err.response.data.error);
         }finally{
            alert("event created")
         }
         setTitle("");
         setDescription("");
         setDate("");
         setNumSeats(0)
       };
     
       console.log(error);
     
       return (
         <div className=" flex justify-center ">
           <form
             onSubmit={handleSubmit}
             className="flex-col flex gap-4 h-fit w-1/2 p-6 rounded-xl shadow bg-white"
           >
             
         
                 <input
                    required
                   type="text"
                   id="title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="title"
                 />
         
               
                 <textarea
                    required
                   id="description"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   placeholder="description"
                 />
               
         
                 <input
                 required
                   type="date"
                   id="date"
                   value={date}
                   onChange={(e) => setDate(e.target.value)}
                   placeholder="date"
                 />
                
                <input
                 required
                   type="number"
                   id="num of seats"
                   value={numSeats}
                   onChange={(e) => setNumSeats(e.target.value)}
                   placeholder="number of seats for events"
                 />
     
             <input className="bg-green-500 cursor-pointer text-white" type="submit"/>
           </form>
         </div>
       );
     }

export default CreateEvent