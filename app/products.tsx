"use client"

import { useEffect, useState } from "react"
import { getData } from "./serverFunction";


type post = {
    post: string;
    time: string;
}
function isBraveBrowser() {
    return /Brave/.test(navigator.userAgent);
}

export default function Products() {
    const [posts, setPosts] = useState<Array<post>>();


    useEffect(() => { getPosts(); }, [])
    async function getPosts() {
        //@ts-ignore
        const {posts} = await getData();
        if (!posts) { return }
        setPosts(posts.slice(0, 4));
    }

    useEffect(() => { setAnimations() }, [posts, setPosts])

    function setAnimations() {
  
    
 if (window.innerWidth <= 1000) { 
            Array.from(document.getElementById('newsContainer')?.children ?? []).map((e) => { 
                e.classList.remove('productAnimation')
            })
    
 } else { 
                 const parent = document.getElementById('newsContainer')
            if (!parent) { return }

            Array.from(parent.children).forEach((e) => {
                window.addEventListener('scroll', () => {
                    let { top } = e.getBoundingClientRect();
                    const target = window.innerHeight / 1.2;

                    if (top < target) {
                        e.classList.add('animate')

                    } else if (top > window.innerHeight) {
                        e.classList.remove('animate');
                    }
                }, false)
            })
        }



    }
    return (


        <div id='container' className="grid xl:grid-cols-[30%_70%] md:grid-cols-[1fr_4fr]  w-full   xl:w-2/3 2xl:w-1/2 md:h-[1200px] 2xl:h-[1500px]  mx-auto py-12 ">
            <SVG/>
       
            <div id='newsContainer' className=" flex flex-col justify-between h-[85%] my-auto  py-8 text-white  w-full  md:w-[95%] relative">

                {posts?.length == 0 ?
                    <Loading /> :
                    posts?.map((e, i) => {
                        return <LinkedInPost data={e.post} time={e.time} key={i} />
                    })
                }


            </div>
        </div>

    )

}

function Loading() {

    return (
        <>
            {Array.from({ length: 4 }).map((e, i) => {
                return (
                    <div key={i} className=' rounded-xl drop-shadow-lg text-white flex flex-col h-3/4 w-full productAnimation '>
                        <SVGBackground />
                        <p className='text-2xl font-bold flex ml-12 py-4 items-center space-x-4'>


                        </p>

                    </div>
                )
            })}

        </>


    )
}

function LinkedInPost({ data, time }: { data: string, time: string }) {
    return (
        <div className=' rounded-xl drop-shadow-lg text-white flex flex-col productAnimation opacity-1 md:w-3/4 mx-auto xl:w-full '>
            <SVGBackground />
            <div className="flex pt-4">
                <p className='w-2/3 xl:text-lg 2xl:text-xl ml-12 pb-8'>{data}</p>
                <p className="ml-auto mr-4 float-right italic">{time}</p>
            </div>
        </div>
    )
}





function SVG() {
    return (
        <svg height='100%' preserveAspectRatio="none" viewBox="-20 0 100 600" className="hidden md:block " xmlns="http://www.w3.org/2000/svg">
            < path d="m 50 50 a 20 20 0 0 1 0 40 m 0 -40 a 20 20 0 0 0 0 40 l 0 100 a 20 20 0 0 1 0 40 m 0 -40 a 20 20 0 0 0 0 40 l 0 100 a 20 20 0 0 1 0 40 m 0 -40 a 20 20 0 0 0 0 40 l 0 100 a 20 20 0 0 1 0 40 m 0 -40 a 20 20 0 0 0 0 40" stroke="white" strokeWidth={4} fill="none" />
        </svg >
    )
}


export function SVGBackground() {
    return (
        <svg viewBox="0 0 400 400" className="svgBackgroundShadow  w-full h-full absolute -z-10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="shadow" x="0" y="0" width="200%" height="200%">
                    <feOffset result="offOut" in="SourceAlpha" dx="3" dy="0" />
                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
            </defs>
            <polygon filter={'url(#shadow)'} points="10 5, 395 5, 395 300, 260 395, 10 395" fill="black" fillOpacity={0.2} stroke="white" strokeWidth={2} ></polygon>
        </svg>
    )
}

