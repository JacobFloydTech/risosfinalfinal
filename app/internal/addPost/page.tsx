'use client'


import CreatePost from "./createPost";
import { SessionProvider } from "next-auth/react";

export default async function AddPost() {

    return ( 
        <SessionProvider>
        <div className="flex flex-col w-full h-auto">
            <CreatePost/>
        </div>
        </SessionProvider>
    )
}