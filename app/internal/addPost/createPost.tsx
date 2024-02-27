'use client'


import { getSession, useSession } from "next-auth/react";
import { useState } from "react"

export default function CreatePost() {
    let [uploadedImages, setUploadedImages] = useState<Array<string>>();
    let [title, setTitle] = useState<null | string>(null);
    let [content, setContent] = useState<null | string>(null);
    const { data, status } = useSession();



    return (
        <div className="flex flex-col space-y-2 w-1/2 my-12 mx-auto">
            <input onChange={(e) => { setTitle(e.target.value) }} placeholder="Title...." className="p-2" />
            <textarea onChange={(e) => { setContent(e.target.value) }} placeholder="Content..." className="p-2" />
            <UploadFiles setUploadedImages={setUploadedImages} />
            <button >Submit Post!</button>
        </div>
    )
}


export function UploadFiles({ setUploadedImages }: { setUploadedImages: Function }) {


    return (
        <div >
            <input type="file" />
            <button >Upload file</button>

        </div>
    )

}