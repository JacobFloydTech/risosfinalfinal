'use client'

import { useState } from "react"

export default function ContactFormComponent() { 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")
    return ( 
        <div className="absolute top-1/2 rounded-3xl left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-blue-500 grid grid-cols-2 items-center opacity-0" id="contactForm">
        <input onChange={(e) => setFirstName(e.target.value)} className="h-12 px-2  rounded-xl w-2/3 mx-auto" placeholder="First Name"/>
        <input onChange={(e) => setLastName(e.target.value)} className="h-12 px-2  rounded-xl w-2/3 mx-auto" placeholder="Last Name"/>
        <input onChange={(e) => setEmail(e.target.value)} className="h-12 px-2 col-span-2 rounded-xl w-2/3 mx-auto" placeholder="Email"/>
        <textarea onChange={(e) => setMessage(e.target.value)} className="col-span-2 p-4 w-2/3 h-1/2 rounded-xl mx-auto" placeholder="Message"/>
        <div className="flex items-center justify-center col-span-2">
            <button className="px-4 py-2 rounded-xl border-blue-300 border-2 hover:scale-105 text-xl transition-all duration-100">Submit</button>
        </div>
    </div>
    )
}