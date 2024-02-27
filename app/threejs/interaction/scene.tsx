'use client'

import { Canvas, useThree, } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import { useState } from "react";
import gsap from "gsap";
import { Model } from "@/public/Waicorderwithlights";



export default function Scene() {
    const [max, setMax] = useState(0.8);
    useEffect(() => {
        if (window.screen.width <= 640) {
            setMax(0.2);
        }

    }, [])


    return (
        <div id='canvas' className="w-full h-full bg-[#393939] pt-8">
            <Canvas dpr={[1, 2]} performance={{ max: max }} shadows camera={{ position: [80, 20, -15], fov: 85 }}>
                <Model />
                <Spin />
                <AnimateCamera />
            </Canvas>
        </div>
    )
}

function AnimateCamera() {
    useThree(({ camera }) => {
        gsap.to(camera.position, { x: 0, y: 0, z: window.screen.width <= 640 ? 20 : 11, duration: 2, delay: 0.5, ease: 'power4.Out', onUpdate: () => { camera.lookAt(0, 0, 0,) } })
    })
    return null;
}


function Spin() {
    useThree(({ scene }) => {
        setTimeout(() => {
            const obj = scene.getObjectByName('Armature003');
            if (!obj) { return }
            var pastPosition: number | undefined = undefined;
            let direction: string = "";
            var speed = 0.02;
            function animate(e: MouseEvent) {
                if (!obj) { return }

                if (!!!pastPosition) { return pastPosition = e?.clientX; }

                if (pastPosition > e?.clientX) {
                    obj.rotation.y -= speed
                    if (direction != 'backwards') { speed = 0.02 }
                    direction = 'backwards';
                } else {
                    obj.rotation.y += speed;
                    if (direction != 'forwards') { speed = 0.02 }
                    direction = 'forwards';
                }
                pastPosition = e?.clientX;
                speed *= 1.0000000001;
                obj.updateMatrixWorld();
                obj.updateWorldMatrix(true, true);
            }

            function animateTouch(e: TouchEvent) {
                const { clientX } = e.changedTouches[0]
                if (!obj) { return }

                if (!!!pastPosition) { return pastPosition = clientX; }

                if (pastPosition > clientX) {
                    obj.rotation.y -= speed
                    if (direction != 'backwards') { speed = 0.02 }
                    direction = 'backwards';
                } else {
                    obj.rotation.y += speed;
                    if (direction != 'forwards') { speed = 0.02 }
                    direction = 'forwards';
                }
                pastPosition = clientX;
                speed *= 1.0001;
                obj.updateMatrixWorld();
                obj.updateWorldMatrix(true, true);
            }

            window.addEventListener('mousedown', () => {
                window.addEventListener('mousemove', animate, false);
            })
            window.addEventListener('mouseup', () => {
                window.removeEventListener('mousemove', animate, false);
                speed = 0.02;
            })
            if (window.matchMedia('(any-pointer: coarse)').matches) {
                window.addEventListener('touchstart', () => {
                    window.addEventListener('touchmove', animateTouch, false);
                })
                window.addEventListener('touchend', () => {
                    window.removeEventListener('mousemove', animate, false);
                    speed = 0.02;
                })

            }
        }, 1500);
    })
    return null;
}



