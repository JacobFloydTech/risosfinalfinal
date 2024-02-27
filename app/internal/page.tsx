"use client"

import { SessionProvider, getSession, signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react"
import '@/public/globals.css'
import ThreeJSBackground from "../background/sceneBackground";
import Loading from "../loading";



export default function Page() {
    const [username, setUsername] = useState<null | string>(null);
    const [password, setPassword] = useState<null | string>(null);
    const [loaded, setLoaded] = useState(true)

    return (
        <SessionProvider>

            {loaded ? 
            
            <div className="flex flex-col justify-center items-center h-screen w-full">

                <div className="w-3/4 md:w-1/2 xl:w-1/3 flex flex-col justify-center border-white rounded-3xl bg-gray-400 p-4 my-12 space-y-4">
                    <p className="text-center">Login with your work account</p>
                    <input onChange={(e) => { setUsername(e.target.value) }} value={username as string} className="p-2 rounded-3xl" placeholder="email" />
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password as string} className="p-2 rounded-3xl" placeholder="password" type="password" />
                    <Button username={username as string} password={password as string} />

                </div>
            </div> : <Loading/> }
        </SessionProvider>

    )
}



function Button({ username, password }: { username: string, password: string }) {
    const { data: session, status } = useSession();
    return (
        <div className="mx-auto">
            {session ? <button onClick={() => { signOut() }}>Log out</button> :
                <button onClick={() => {
                    signIn('credentials', {
                        username, password, redirect: false,
                    })
                }}>Login</button>
            }

        </div>
    )

}