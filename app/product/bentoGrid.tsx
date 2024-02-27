'use client';


import { useEffect, useState } from "react";

import Image from "next/image";



export default function BentoGrid() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        ['frontImage', 'sideImage', 'diagonalImage'].forEach((e) => {
            const el = document.getElementById(e);
            if (!el) { return }

            setReady(true)

            const children: HTMLCollection = el.children;
            animate(children, e)
        })


    }, [])


    function animate(children: HTMLCollection, id: string) {
        let arr = Array.from(children);

        let observer = new IntersectionObserver(entries => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('animation')
                } else {
                    e.target.classList.remove('animation')
                }
            })
        }, { threshold: 0, rootMargin: '35% 0% -35% 0%', })
        arr.pop();
        arr.forEach((e) => observer.observe(e))
    }

    return (
        <div id='bentoGrid' className={"h-auto mx-auto w-2/3 md:w-1/2 2xl:w-2/3 grid  mt-32 lg:grid-cols-2 " + (ready ? " opacity-1" : " opacity-0")} >

            <div id='frontImage' className="w-full h-full top-0 relative">
                <SampleSVG />
                <IndicatorSVG />
                <AutomatedAnalysisSVG />
                <TouchDisplaySVG />
                <DetectedSVG />


                <img src={'/grid/smallfront.webp'} alt='FrontView' />
            </div>
            <div id="sideImage" className="w-full h-full top-0 relative">
                <ScannerUnitSVG />
                <ErgonomicDesignSVG />
                <StudyHingeSVG />


                <img src={'/grid/smallside.webp'} alt='SideView' />

            </div>
            <div id="diagonalImage" className="lg:col-span-2 w-full relative" >
                <PocketSizeSVG />


                <img src={'/grid/smalldiagonal.webp'} alt='DiagonalView' />
            </div>

        </div>
    )
}

function PocketSizeSVG() {
    return (
        <svg className="w-[50%]  leftBentoGrid left-[20%] absolute z-30 top-[56%]" viewBox="0 0 300 100">
            <path d="m 150 50 l 100 0" stroke="yellow" strokeWidth={4} />
            <circle cx={130} cy={50} r={20} fill="yellow" />
            <text y={50} x={251} fill="white">Pocket</text>
            <text y={65} x={251} fill="white"> Size</text>
        </svg>
    )
}

function ScannerUnitSVG() {
    return (
        <svg className="w-[75%] right-4  leftBentoGrid absolute z-30 top-[20%] " viewBox="0 0 400 100" >
            <path d='m 200 50 l 80 0' stroke="yellow" strokeWidth={4} />
            <circle cx={180} cy={50} fill="yellow" r={20} strokeWidth={4} />
            <text y={50} x={300} fill="white">Scanner</text>
            <text y={65} x={300} fill="white"> Unit</text>
        </svg>
    )
}
function ErgonomicDesignSVG() {
    return (
        <svg className="w-[75%] right-4 leftBentoGrid absolute z-30 top-[45%] " viewBox="0 0 400 100" >
            <path d='m 240 50 l 50 0' stroke="yellow" strokeWidth={4} />
            <circle cx={220} cy={50} fill="yellow" r={20} strokeWidth={4} />
            <text y={50} x={300} fill="white">Ergonomic</text>
            <text y={65} x={300} fill="white"> Design</text>
        </svg>
    )
}

function StudyHingeSVG() {
    return (
        <svg className="w-[75%] right-4 leftBentoGrid  absolute z-30 top-[63%]" viewBox="0 0 400 100" >
            <path d='m 210 50 l 90 0' stroke="yellow" strokeWidth={4} />
            <circle cx={230} cy={50} fill="yellow" r={20} strokeWidth={4} />
            <text y={50} x={300} fill="white">Study</text>
            <text y={65} x={300} fill="white"> Design</text>
        </svg>
    )
}

function SampleSVG() {
    return (
        <svg className="  w-full right-2 rightBentoGrid  absolute top-[4%]" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m 160 50 l -90 0 " stroke="yellow" stroke-width="4"></path>
            <circle cx={180} cy={50} r={20} fill="yellow" />
            <text y={50} x={0} fill="white">100 ML</text>
            <text y={65} x={0} fill="white"> Sample</text>
        </svg>
    )
}

function IndicatorSVG() {
    return (
        <svg className="  w-full right-2  rightBentoGrid absolute top-[25%]" viewBox="0 0 400  100" xmlns="http://www.w3.org/2000/svg">
            <path d="m 150 50 l -80 0 " stroke="yellow" stroke-width="4"></path>
            <circle cx={170} cy={50} r={20} fill="yellow" />
            <text y={50} x={0} fill="white">Indicator</text>
            <text y={65} x={0} fill="white"> Led</text>
        </svg>
    )
}

function AutomatedAnalysisSVG() {
    return (
        <svg className="  w-full right-2 rightBentoGrid absolute top-[45%]" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m 230 50 l -140 0 " stroke="yellow" stroke-width="4"></path>
            <circle cx={250} cy={50} r={20} fill="yellow" />
            <text y={50} x={0} fill="white">Automated</text>
            <text y={65} x={0} fill="white"> Analyses</text>
        </svg>
    )
}

function TouchDisplaySVG() {
    return (
        <svg className="  w-full right-2 rightBentoGrid  absolute top-[60%]" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m 230 50 l -140 0 " stroke="yellow" stroke-width="4"></path>
            <circle cx={250} cy={50} r={20} fill="yellow" />
            <text y={50} x={0} fill="white">Touch </text>
            <text y={65} x={0} fill="white"> Display</text>
        </svg>
    )
}

function DetectedSVG() {
    return (
        <svg className="  w-full right-2  rightBentoGrid absolute top-[75%]" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m 250 50 l -140 0 " stroke="yellow" stroke-width="4"></path>
            <circle cx={270} cy={50} r={20} fill="yellow" />
            <text y={50} x={0} fill="white">Detected</text>
            <text y={65} x={0} fill="white"> Containments</text>
        </svg>
    )
}