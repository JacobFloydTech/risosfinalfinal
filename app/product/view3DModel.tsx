'use client'

import { useEffect, useState } from "react";
import Scene from "../threejs/interaction/scene";


export default function View3DModel() {

    useEffect(() => {
        const element = document.getElementsByTagName('dialog')[0];
        if (!element) { return }
        element.addEventListener('cancel', (e) => { e.preventDefault() })
        element.addEventListener('keydown', ({ code }) => {
            if (code == 'Escape') {
                animateOut();
            }
        })
        function animateOut() {
            element.classList.add('reverse');
            setTimeout(() => {
                element.close();
                element.classList.remove('reverse');
            }, 1200);
        }

    }, [])


    return (
        <div className="h-auto w-full flex justify-center items-center">
            <button id='show3d' onClick={() => { document.getElementsByTagName('dialog')[0].showModal(); setListener(); }} className="rounded-3xl font-semibold transition duration-150 hover:scale-110 px-4 p-2 bg-gradient-to-r from-[#D8D801] to-[#B2B203] border-black border-2 text-white">Click here to view 3D model</button>
            <dialog id='dialog' className="w-full md:w-2/3 h-2/3 xl:w-1/2 xl:h-1/2 z-30 rounded-xl overflow-hidden outline-none">
                <Scene />
            </dialog>
        </div>
    )
}

function checkClick(e: MouseEvent) {
    const { clientX, clientY } = e;
    const element = document.getElementById('dialog');
    if (!element) { return }
    const { top, bottom, left, right } = element.getBoundingClientRect();
    if (clientY > bottom || clientY < top || clientX > right || clientY < left) {
        (element as HTMLDialogElement).close();
        window.removeEventListener('click', checkClick, false);
    }
}

function checkTap(e: TouchEvent) {
    const { clientX, clientY } = e.changedTouches[0];
    const element = document.getElementById('dialog');
    if (!element) { return }
    const { top, bottom, left, right } = element.getBoundingClientRect();
    if (clientY > bottom || clientY < top || clientX > right || clientY < left) {
        (element as HTMLDialogElement).close();
        window.removeEventListener('touchstart', checkTap, false);
    }
}

function setListener() {
    setTimeout(() => {
        if (window.screen.width >= 768) {
            window.addEventListener('click', checkClick, false);
        } else {
            window.addEventListener('touchstart', checkTap, false);
        }
    }, 1200);
}
