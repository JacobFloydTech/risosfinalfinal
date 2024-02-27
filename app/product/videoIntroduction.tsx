"use client"

import { useEffect, useRef, useState } from "react"


export default function VideoIntroduction({setter}: { setter: Function}) {
    const buttons = useRef<any>();
    const grid = useRef<any>();
    const button = useRef<any>();
    const [error, setError] = useState(false);


    useEffect(() => {
        setter(true)
        
    }, [])

    
    function start() { 
        const el = document.getElementById('videoContainer');
        if (!el) { return; }
        
        el.classList.add('animateVideoContainerIn');
        main();
  
    }
    function main() {
        if (!grid.current || !buttons.current) { return }

        const el = document.getElementById('videoContainer');

        let player = document.getElementById('video') as HTMLVideoElement;

        player.classList.add('videoFadeIn')
        setTimeout(() => {
            document.getElementById('backgroundFilter')?.classList.add('backgroundFilter');
            document.getElementById('videoText')?.classList.add('videoText');
            buttons.current.classList.add('buttons');
            const children = Array.from(grid.current?.children) as Array<any>;
    
            document.getElementById('video')?.classList.add('fadeOut')
        }, 7500);
        setTimeout(() => {
            player?.play();
        }, 2200);

    }
    function loadImageInfo() { 
        setTimeout(() => {
        
     
            document.getElementById('backgroundFilter')?.classList.add('backgroundFilter');
            document.getElementById('videoText')?.classList.add('videoText');
            buttons.current.classList.add('buttons');
            const children = Array.from(grid.current?.children) as Array<any>;
            children.forEach((e) => { animate(Array.from(e?.children)) })
            document.getElementById('video')?.classList.add('fadeOut')
        }, 2500);
    }

    function animate(array: Array<HTMLParagraphElement>) {
        array.forEach((e, i) => {
            setTimeout(() => {
                e.classList.add('chemicalSlide');
            }, (i / 2 + 0.5) * 1000);
        })
    }
    const loadImage = ( ) => { 
        const image = document.getElementById('waicorderRenderImage') as HTMLImageElement;
        const video = document.getElementById('video') as HTMLVideoElement;
        if (!image || !video) return
        image.classList.add('videoFadeIn');

        
    }

    const particulates = ['E. coli', 'Campylobacter', 'Cryptosporidium', 'Salmonella', 'Giardia']
    const chemicals = ['Nitrates', 'Phosphates', 'Hormones', 'Microplastics', 'Cyanobacteria']
    return (
        <div className="py-4 flex text-white flex-col items-center justify-center w-full relative">
           <div className="bg-[rgba(255,240,0,0.2)] bg-opacity-30 backdrop-blur-md text-white xl:text-4xl md:text-2xl text-center items-center justify-center w-1/2 py-4 rounded-2xl flex flex-col md:space-y-4">
                <p>The Waicorder</p>
                <p>Wāi Ora. Tāngata Ora</p>
           </div>
           <img src="/waicorderRender.png" className="md:w-3/4 xl:w-2/3"/>
           <div className="bg-[rgba(255,240,0,0.2)] w-[90%] bg-opacity-30 backdrop-blur-md p-4 rounded-2xl mx-4 md:w-2/3 xl:w-1/2 items-center justify-center flex flex-col">
           <p className="text-lg md:text-3xl py-2">Waiter Testing in Seconds</p>
           <ul className="text-base md:text-2xl list-disc" id='chemicals'>
                {particulates.map((e) => <li className="">{e}</li>)}
                {chemicals.map(e => <li className="">{e}</li>)}
           </ul>
           </div>
           <p className="text-sm md:text-2xl text-center xl:text-4xl leading-[25px] w-[90%] md:leading-[50px] xl:leading-[60px] xl:w-2/3 bg-[rgba(255,240,0,0.2)] bg-opacity-30 backdrop-blur-md p-4 rounded-2xl my-12">Detecting waterborne pathogens early is critical. <br/>
It means more than freedom and independence;<br/>
it will be the next step for all people on earth. <br/>
This generation and the next generation. <br/>
This planet and others to come. <br/>
It will be the fundamental step for unity and peace. <br/>
That's why we develop the Waicorder.</p>
    <div className="flex flex-col items-center bg-[rgba(255,240,0,0.2)] bg-opacity-30 backdrop-blur-md p-4 rounded-2xl w-[90%] xl:w-1/3 xl:space-y-6 xl:p-6 space-y-4">
        <p className="text-base md:text-lg xl:text-xl text-center">Get in touch if you want to help, join or know more:</p>
        <button className="rounded-full border-2 border-white text-white bg-yellow-400 py-2 px-4 text-2xl hover:scale-105 transition-all duration-100 ">Get in contact</button>
        </div>
    </div>
    )
}
