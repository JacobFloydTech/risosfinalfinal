'use client'

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);




export default function MissionGrid() {

    useEffect(() => {
        setAnimations();
        document.addEventListener('resize', () => { setAnimations() })
        return () => { document.removeEventListener('resize', () => { setAnimations() }) }
    }, [])


    function setAnimations() {
        Array.from(document.getElementsByClassName('leftTransition')).forEach((e) => {
            gsap.fromTo(e, {
                translateX: '-100%',
                opacity: 0,
            }, {
                translateX: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: e,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: document.body.clientWidth >= 500
                }
            })
        })
        Array.from(document.getElementsByClassName('rightTransition')).forEach((e) => {
            gsap.fromTo(e, {
                translateX: '100%',
                opacity: 0,
            }, {
                translateX: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: e,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: document.body.clientWidth >= 500
                }
            })
        })
    }

    return (
        <div id="Mission" className="gridUI w-full grid md:grid-cols-2  gap-[8%]  text-white mb-44  ">
            <div className="flex flex-col space-y-12 mt-12">
                <div className="md:w-2/3 w-3/4 h-auto relative items-center justify-center  flex  shadow-2xl tracking-widest font-bold uppercase leftTransition">
                    <div className="flex w-full h-full py-3 pr-2 gap-x-1">
                        <p className="w-[85%]  flex justify-end pr-2 text-lg md:text-2xl z-50 ">Our Mission</p>

                    </div>
                    <SVGBorder />
                </div>
                <div className="grid md:grid-cols-[2fr_1fr] gap-8 md:gap-4 p-2  text-white text-center justify-center items-center bg-black bg-opacity-50 rounded-r-2xl shadow-2xl leftTransition ">

                    <p className="text-left md:p-4">Our mission by heart is to ensure everyone has access to safe water in this world. About 20% of Kiwis are supplied with contaiminated drinkin water and 1 billion globally suffer from gastroenteritis cause by dirty water.</p>

                    <img loading="lazy" fetchPriority="low" className="rounded-xl w-full h-full object-cover" src="/pxfuel.webp" />
                    <p className="text-left md:p-4">Rapid sensing is the first step to avoid all that. Hence, we are developing revolutionary tecnology that can scan waterborne pahtogens faster then currently possible. </p>


                    <img loading="lazy" fetchPriority="low" className="rounded-xl w-full h-full object-cover" src="/uiPic.webp" />

                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="w-[90%] md:w-2/3 h-auto relative items-center justify-center ml-auto float-right flex  shadow-2xl tracking-widest font-bold uppercase rightTransition">
                    <div className="flex w-full h-full py-3 pr-2 gap-x-1">
                        <p className="w-[85%]  flex justify-end pr-2 text-lg md:text-2xl z-50">Team Members</p>
                    </div>
                    <SVGBorder />
                </div>
                <div className="grid md:grid-cols-[40%_60%] gap-y-4 bg-black bg-opacity-50  p-4 rounded-l-2xl shadow-2xl md:w-[80%] w-[90%] ml-auto float-right rightTransition">
                    <div className="flex flex-col">
                        <p className="leading-wide text-sm font-bold underline italic text-center md:text-left py-2">Alex Risos - CEO/Founder</p>
                        <img loading="lazy" fetchPriority="low" className="" src="/public/badge.webp" />
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="md:ml-4">
                            Research is a voyage beyond the known frontiers; we explore strange new fields and boldy does what no one has done before
                        </p>
                    </div>
                </div>
                <div className="flex flex-col bg-black bg-opacity-50 p-2 h-auto  rounded-l-2xl shadow-2xl rightTransition space-y-2">
                    <div className="border-2 w-full h-80" />
                    <p className="text-xs md:text-sm italic">Erickson Guinto, William Tang, Lalia Shihada, Prakhya Mathur, Chun Yiu Lau, Harry Shim, Conner Zheng, Hosea Tong-Ho, Nghia Pham, Gavin Ni, Sina Yazdanshenas Shad</p>
                </div>
            </div>
        </div>
    )
}

function SVGBorder() {
    return (
        <svg viewBox="0 0 300 100" className="w-full h-full absolute" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopOpacity: 1, stopColor: "#FEFE00" }} />
                    <stop offset="100%" style={{ stopOpacity: 1, stopColor: "#707008" }} />
                </linearGradient>
            </defs>
            <path d="m 0 5 l 295 0 l 0 90 l -295 0 l 0 -90" fill="none" stroke="url(#grad1)" stroke-width="4" />
            <path d="m 0 20 l 255 0 l 0 60 l -255 0 z M 260 20 l 20 0 c 10 2 10 20 10 20 l 0 25 c -4 20 -10 14 -10 15 l -20 0 z" fill="url(#grad1)" />
        </svg>
    )
}

