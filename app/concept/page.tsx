export default function Page() {
    return (
        <div className="my-12 relative h-[450px] w-full md:w-3/4 2xl:w-1/2 mx-auto top-0 bg-black border-black border-4">
            <div className="absolute top-0 z-50 rounded-3xl  right-0 w-full h-full">
                <SVG />
            </div>
            <Background />
            <Content />
        </div>
    )
}

function Content() {
    return (
        <div className="grid grid-rows-4 w-24 text-center h-full gap-2 absolute z-50 text-3xl font-bold p-4">
            <button className="-translate-y-2" >Home</button>
            <button >Contact</button>
            <button >Products</button>
            <button className="-translate-y-2">Internal</button>
        </div>
    )
}
function Background() {
    return (
        <div className="grid grid-rows-4 w-full h-full gap-2 absolute ">
            {Array.from({ length: 4 }).map((e, i) => {
                return (<div key={i} className="bg-yellow-500 w-full h-full" />)
            })}

        </div>
    )
}


function SVG() {
    return (
        <svg viewBox="0 0 400 400" className="w-full h-full shadow-2xl" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1='0%' y1="0%" x2="100%" y2="0%">
                    <stop offset='0%' style={{ stopOpacity: 1, stopColor: "#FFFF00" }} />
                    <stop offset='100%' style={{ stopOpacity: 1, stopColor: "#6F6F08" }} />
                </linearGradient>
            </defs>
            <path fill="url('#gradient')" d="m 350 0 c 30 10, 20 30, 0 30 l -300 0 c -20 5, -20 20, -20 30 l 0 250 c 5 20, 20 20, 20 20 l 100 0 c 30 10, 20 45, 0 45 l -600 0 l 0 100 l 1200 0 l 0 -800 l -100 0 z" ></path>
            <image className="shadow-2xl" xlinkHref="badge.png" width={250} height={250} y={50} x={50} />
        </svg>
    )
}