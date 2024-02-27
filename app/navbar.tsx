'use client'

export function Navbar() {
    const buttons = ['home', 'products', 'team', 'contact']
    return ( 
        <div className="fixed top-0 left-0 flex w-full justify-between px-4 p-2">
            <button className="p-4 font-bold bg-white">RisosEnterprises Ltd.</button>
            <div className="flex text-3xl space-x-4">
                {buttons.map((e, i) => { 
                    return <button className="uppercase text-white" key={i}>{e}</button>
                })}
            </div>
        </div>
    )
}