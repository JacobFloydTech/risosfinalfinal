export default function HeaderImage() {
    return (
        <div className="relative h-72 md:h-[600px] lg:h-[650px] w-full lg:w-3/4 xl:w-2/3 my-12">
            <img src="/public/product.png" className="w-full h-full object-contain lg:object-cover absolute top-0 left-0" />
            <div className="z-50 w-full h-full hidden md:block">
                <DisplaySVG />
                <RechargableSVG />
                <WaterSampleSVG />
            </div>
            <div className="z-50 w-full h-full md:hidden absolute">
                <MobileWaterSampleSVG />
                <MobileDisplaySVG />
                <MobileRechargeableSVG />
            </div>
        </div>
    )
}

function MobileWaterSampleSVG() {
    return (

        <svg viewBox="0 0 400 400" className="left-1/2 absolute -translate-x-1/2 top-[15%] sm:top-[10%] w-3/4 h-3/4" xmlns="http://www.w3.org/2000/svg">
            <path d="m 80 30 l 150 0" stroke="yellow" stroke-width="4" />
            <text fontSize={20} fill="white" x="240" y="35">Water Sample</text>
            <circle cx="65" cy='30' r='15' fill="none" stroke="yellow" stroke-width="4"></circle>
        </svg>

    )
}

function MobileDisplaySVG() {
    return (
        <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 sm:top-4 right-2 absolute" xmlns="http://www.w3.org/2000/svg">
            <path d="m 150 150 l 0 -55" stroke="yellow" fill="none" stroke-width="4" />
            <text fontSize={15} fill="white" x="110" y="90"> 2x HD Display</text>
            <circle cx="150" cy="162" r="12" fill="none" stroke="yellow" stroke-width="4" />
        </svg>
    )
}


function MobileRechargeableSVG() {
    return (
        <svg viewBox="0 0 320 200" className="absolute w-3/5 h-3/5 bottom-8 left-[10%]" xmlns="http://www.w3.org/2000/svg">
            <path d="m 210 180 l -100 0" stroke="yellow" stroke-width="4" />
            <text fontSize={15} fill="white" y="184" x="10">Rechargable</text>
            <circle cx="220" cy='180' r='12' stroke="yellow" stroke-width="4" fill="none"></circle>
        </svg>
    )
}
function DisplaySVG() {
    return (
        <svg className="z-50 absolute right-8 top-[40%]" width={450} height={400} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="m 120 200 l 0 -140 c 2 -20 10 -20 50 -20 l 80 0" fill="none" stroke="yellow" stroke-width="4" />
            <text fill='white' fontSize={20} x="270" y="45">2x HD Displays</text>
            <circle cx="120" cy="220" r='20' fill="none" stroke="yellow" stroke-width="4" />
        </svg >
    )
}

function RechargableSVG() {
    return (
        <svg viewBox="0 0 400 250" className="z-50 absolute left-56 bottom-0" width={400} height={400} xmlns="http://www.w3.org/2000/svg">
            <path d="m 220 250 l 0 20 c -2 20 -10 20, -40 20 l -50 0" stroke-width="4" fill="none" stroke="yellow"></path>
            <text fill="white" fontSize={20} x="0" y="295">Rechargable</text>
            <circle cx="220" cy="230" r="20" stroke="yellow" fill="none" stroke-width="4"></circle>
        </svg>
    )
}

function WaterSampleSVG() {
    return (
        <svg className="z-50 absolute left-1/4" viewBox="0 0 400 400" width={400} height={400} xmlns="http://www.w3.org/2000/svg">
            <path d="m 50 80 l 260 0 c 10 0, 20 10, 20 30 l 0 30" stroke="yellow" stroke-width="4" fill="none" />
            <text fontSize={20} fill="white" x="265" y='165'>Water Sample</text>
            <circle cx="30" cy="80" r="20" stroke="yellow" fill="none" stroke-width="4"></circle>
        </svg>
    )
}
