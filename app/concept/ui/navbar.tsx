'use client'


export default function Navbar() {
    return (
        <div className="fixed top-0 w-full h-16 z-50 flex bg-black">
            <div className="flex  text-white items-center justify-between w-full">
                <div className="flex items-center text-white h-full">
                    <img src="/logo2.png" className="h-2/3 px-4" />
                    <p className="font-bold uppercase italic tracking-widest underline text-xl underline-offset-4">risosenterprises LTD</p>
                </div>
                <div className="w-[35%] flex justify-around">
                    <button className="hover:text-blue-400 border-l-2 border-b-2 hover:border-blue-400 border-black translate-y-1  h-1/4"><p className="-translate-y-1 px-2">Home</p></button>
                    <button className="hover:text-blue-400 border-l-2 border-b-2 hover:border-blue-400 border-black translate-y-1  h-1/4"><p className="-translate-y-1 px-2">Products</p></button>
                    <button className="hover:text-blue-400 border-l-2 border-b-2 hover:border-blue-400 border-black translate-y-1  h-1/4"><p className="-translate-y-1 px-2">Team</p></button>
                    <button className="hover:text-blue-400 border-l-2 border-b-2 hover:border-blue-400 border-black translate-y-1  h-1/4"><p className="-translate-y-1 px-2">Contact</p></button>
                    <button className="hover:text-blue-400 border-l-2 border-b-2 hover:border-blue-400 border-black translate-y-1  h-1/4"><p className="-translate-y-1 px-2">Internal</p></button>
                </div>
            </div>
        </div>
    )
}