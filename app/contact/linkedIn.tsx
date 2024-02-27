'use client'
import { useEffect, useState } from 'react';



export default function LinkedInPosts() {
    const [data, setData] = useState<Array<string>>();
    const [time, setTime] = useState<Array<string>>();
    useEffect(() => {
        (async () => {
            const { content, time } = await getData();
            setData(content);
            setTime(time);
        })();
    }, [])
    return (
        <div className='w-1/2 h-auto flex flex-col space-y-4'>

            {time && data?.map((e, i) => {
                return <LinkedInPost data={e} time={time[i]} key={i} />
            })}
        </div>

    )
}

function LinkedInPost({ data, time }: { data: string, time: string }) {
    return (
        <div className=' rounded-xl drop-shadow-lg text-white flex flex-col p-8relative'>
            <SVGBackground />
            <p className='text-2xl font-bold flex ml-12 py-4 items-center space-x-4'>
                <p>Risos Enterprises LTD</p>
                <p className='text-base font-normal'>{time}</p>
            </p>
            <p className='text-lg w-2/3 ml-12 pb-8 pt-4'>{data}</p>
        </div>
    )
}
async function getData() {
    const response = await fetch('http://localhost:4000');
    const data = await response.json();
    console.log(data);
    return data;
}
function SVGBackground() {
    return (
        <svg viewBox="0 0 400 400" className="svgBackgroundShadow  w-full h-full absolute -z-10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow" x="0" y="0" width="200%" height="200%">
                    <feOffset result="offOut" in="SourceAlpha" dx="3" dy="0" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
            </defs>
            <polygon filter={'url(#shadow)'} points="10 5, 395 5, 395 300, 260 395, 10 395" fill="black" fillOpacity={0.2} stroke="none" strokeWidth={2} ></polygon>
        </svg>
    )
}
