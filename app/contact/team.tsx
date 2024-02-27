'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react'
gsap.registerPlugin(ScrollTrigger);



export default function Team() {
    const teamGrid = useRef<any>();
    useEffect(() => { 
        if (!teamGrid.current) { return}
        const children = Array.from(teamGrid.current.children) as HTMLElement[];
        children.forEach((e) => { 
            gsap.to(e, { 
                opacity: 1,
                scrollTrigger: { 
                    trigger: e,
                    scrub: true,
                    start: 'top 60%',
                    end: "top 20%",
                }
            })
        })
    },[])
    const interns = [
        'Lauren Zhao',
        'Adam Dobbyn',
        'Tilak Patel',
        'Mahnoor Qadri',
        'Ryan Law How Hung',
        'Youngmin Kim',
        'Nick Chua',
        'Renard Joseph Velayo',
        'Alex Timpany',
        'Karthik Sivasubramanian',
        'Tori Sathio',
        'Jason Chen',

    ]
    return (
        <div id='Internal' className="flex flex-col justify-center text-center  items-center w-full space-y-12 text-white my-24" >
            <div className='text-4xl  transition duration-150 hover:scale-105'>
                <p>Executive</p>
                <img className='h-20 md:h-40 xl:h-60 my-8 mx-auto rounded-xl shadow-md' src="team/ceo.png" />
                <p>CEO: Dr. Alex Risos</p>
            </div>
            <div className="w-full mx-auto flex flex-col justify-center items-center text-2xl">
                <div className="mt-4 font-semibold text-4xl">Current students & Interns</div>
                <div ref={teamGrid} className="grid grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6 md:w-3/4 xl:w-2/3 my-4">
                    {interns.map((e, i) => {
                        return (
                            <div key={i} className="opacity-0 flex flex-col justify-center items-center space-y-2 p-2 text-center transition duration-150 hover:scale-105">
                                <div className="h-20 md:h-40 xl:h-60 aspect-square">
                                    <img className="w-full h-full object-cover rounded-xl shadow-md " src={`team/interns/${e.split(" ").map((x) => x.toLowerCase()).join("_")}.jpg`} />
                                </div>
                                <p>{e}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

