'use client';

import { useState } from "react";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


export default function ContactForm() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("");
    const [verify, setVerify] = useState(false);
    const objects: String[] = [firstName, email, message];
    const [error, setError] = useState<string | null>();
    const [success, setSuccess] = useState(false);




async function verifyToken(token: string) {
        const request = await fetch('/api/verifyForm', { method: "POST", body: JSON.stringify({ token: token }) })
        const data = await request.json();
        setVerify(data.success);
    }

    function configureError(e: string) {
        setError(e);
        setTimeout(() => {
            setError(null);
        }, 3000);
    }

    function configureSuccess() {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false)
        }, 3000);
    }
    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function sendEmail() {

        if (objects.every((e) => !!!e)) { return configureError("Please enter the required data") }
        if (!isValidEmail(email)) { return configureError("Invalid email address") }
        if (!verify) { return configureError("Sorry, we think you are bot. Please refresh the page and try again") }
        const request = await fetch('/api/sendEmail', {
            method: "POST", body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                Comments: message
            })
        })
        if (request.status == 200) {
            configureSuccess();
        } else {
            const {error} = await request.json();
            configureError(error)
    }
    }
    return (
        <GoogleReCaptchaProvider reCaptchaKey={'6Ld84ywpAAAAAI9sk_icKtSjWi4JRdZLQ012Mi54'}>
            <GoogleReCaptcha onVerify={(token) => verifyToken(token)} />
            {error && <ErrorMessage error={error} />}
            {success && <Success />}

            <div id='Contact' className="w-full md:w-2/3 xl:w-1/2 2xl:w-1/3 mx-auto my-12  bg-gradient-to-br from-[#FFFF00] to-[#6F6F08] p-2 rounded-xl " >
                <div className=" md:grid md:grid-cols-2 h-auto text-lg bg-gradient-to-br from-[rgba(189,187,187,0.8)] to-[rgba(64,62,62,0.8)] shadow-2xl  p-4 border-black border-2 rounded-xl text-white  gap-8">
                    <div className="contactGridCol">
                        <p>First name <span className="text-red-500">*</span></p>
                        <input type='text' onChange={(e) => { setFirstName(e.target.value) }} value={firstName} className="outline-none text-black" />
                    </div>
                    <div className="contactGridCol">
                        <p>Last name</p>
                        <input type='text' onChange={(e) => { setLastName(e.target.value) }} value={lastName} className="outline-none text-black" />
                    </div>
                    <div className="contactGridCol">
                        <p>Phone number</p>
                        <input type='number' onChange={(e) => { setPhoneNumber(e.target.value) }} value={phoneNumber} id='numberInputField' className="outline-none text-black" />
                    </div>
                    <div className="contactGridCol">
                        <p>Email<span className="text-red-500">*</span></p>
                        <input onChange={(e) => { setEmail(e.target.value) }} value={email} className="outline-none text-black" />
                    </div>
                    <div className="ContactGridCol md:col-span-2">
                        <p>Comments <span className="text-red-500">*</span></p>
                        <textarea onChange={(e) => { setMessage(e.target.value) }} value={message} className="w-full h-18 outline-none text-black" />
                    </div>
                    <div className="flex md:col-span-2 flex-col ">
                        <button onClick={() => sendEmail()} className="ml-auto mx-2 border-black border-2 rounded-3xl p-2 px-4 shadow-xl hover:bg-black">Submit</button>
                    </div>

                </div>
            </div>
        </GoogleReCaptchaProvider>
    )
}

function ErrorMessage({ error }: { error: string }) {
    return (
        <div className="bg-red-500 text-black md:text-lg xl:text-xl 3xl:text-3xl w-auto flex items-center justify-center italics font-semibold mt-12 shadow-2xl p-4 rounded-3xl border-gray-500 border-2">
            <p>{error}</p>
        </div>
    )
}

function Success() {
    return (
        <div className="bg-green-500 text-black md:text-lg xl:text-xl 3xl:text-3xl w-auto flex items-center justify-center italics font-semibold mt-12 shadow-2xl p-4 rounded-3xl border-gray-500 border-2">
            <p>Your message has been sent!</p>
        </div>
    )
}