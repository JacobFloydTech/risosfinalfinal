"use client"

import gsap from "gsap"
import { useEffect, useRef, useState } from "react";


type Value = {
    title: string;
    description: string;
}

export default function Goals() {
    return (
        <div className="fadeIn flex flex-col w-full md:w-2/3 xl:w-2/3 mx-auto justify-center items-center mt-32 bg-gray-500 rounded-xl p-4 m-4 bg-gradient-to-br from-[#DDE426] to-[#C5C966]">
            <p className="text-4xl font-bold">Our values</p>
            <Values />
        </div>
    )
}

function Values() {
    const grid = useRef<any>();

    const values: Value[] = [
        { title: "Sustainability", description: "The preservation of our world" },
        { title: "Equality", description: "Everyone deserves the right to drinkable water" },
        { title: "Usability", description: 'We aim to make our product standard across the world' }
    ]
    useEffect(() => {
        if (!grid.current) { return }
        let height = document.getElementById('valuesGrid')?.clientHeight ?? 0;
        const children = Array.from(grid.current.children) as HTMLElement[];
        children.forEach((e, i) => {
            gsap.set(e, { top: `${height * i}px` })
        })
        setTimeout(() => {
            animate(children, height)
        }, 2000);

    }, [])
    function animate(arr: Array<HTMLElement>, height: number) {
        setTimeout(() => {
            animate(arr, height);

        }, 2000);
        arr.forEach((e) => {
            const top = parseInt(e.style.top);
            if (top <= -height * 2) {
                e.style.top = `${height}px`
            }
            gsap.to(e, { top: `-=${height}px`, duration: 1.2, ease: 'power2.inOut' })
        })
    }

    return (
        <div id='valuesGrid' ref={grid} className="w-full h-24 lg:h-36 xl:h-44 relative overflow-hidden my-4 shadow-xl" >
            {values.map((e, i) => {
                return (
                    <div key={i} className="grid md:grid-cols-[1fr_1fr]  w-full items-center absolute md:p-4 h-24 lg:h-36 xl:h-44 top-0 bg-black bg-opacity-5  ">
                        <div className="justify-center text-center md:text-start items-center text-xl md:text-xl lg:text-2xl xl:text-4xl flex w-full h-full font-bold">{e.title}</div>
                        <div className="justify-center text-center md:text-start items-center flex w-full h-full xl:text-2xl text-lg">{e.description}</div>
                    </div>
                )
            })}
        </div>
    )
}

