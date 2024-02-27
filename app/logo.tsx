"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import CustomLogo from "./threejs/page";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)


export default function Logo() {
    const image = useRef<any>();
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
      });
    
      useEffect(() => {
        const handleResize = () => {
            setAnimations();
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          });
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); // Empty dependency array ensures that this effect only runs once
    

    useEffect(() => {


        const resizeObserver = new ResizeObserver(() => {
            setAnimations();
        })
        resizeObserver.observe(document.body)
        setAnimations();

        const safariRegex = /^((?!chrome|android|vivaldi).)*safari/i;

        // Check if the user agent string matches Safari
        const isSafari = safariRegex.test(navigator.userAgent);
   
        if (!isSafari) {
            const logoElement = document.getElementById('logo');
            //@ts-ignore
          
            logoElement.style.padding = '20px';
        }
        if (document.body.scrollHeight < 1000) {
            setMobileScrollDetection(50)
        }
        else if (window.screen.width <= 640) {
            setMobileScrollDetection(100)

        }


    }, [])


    function setAnimations() {
        const logo = document.getElementById('logo');
        const main = document.getElementById('navbarContainer');

        if (!logo || !main) { return }
 
        gsap.to(main, {

            translateY: `-=${window.screen.width >= 1920 ? "50" : "10"}%`,
            scrollTrigger: {
                trigger: main,
                scrub: true,
                start: '+=150%',
                end: "+=100%",
            }
        })
        gsap.to(logo, {
            translateY: "-150%",
            scrollTrigger: {
                trigger: logo,
                scrub: true,
                start: '+=100%',
                end: '+=100%',
            }
        });

        ["Home", "Contact", "Product", "Internal"].forEach((e) => {
            const el = document.getElementById(e);
            if (!el) { return }
            gsap.fromTo(el, { width: '100%' }, {
                width: '50%',
                scrollTrigger: {
                    trigger: main,
                    scrub: true,
                    start: '+=100%',
                    end: '+=100%'
                }
            });
            const text = document.getElementById(`button${e}`);
            if (!text) { return }
            gsap.set(text, { textAlign: "center" })
            gsap.to(text, {
                translateX: `${["Home", "Product"].includes(e) ? "-" : ""}${getHomeAndContactX(window.screen.width)}%`,
                scrollTrigger: {
                    trigger: main,
                    scrub: true,
                    start: '+=100%',
                    end: '+=100%'
                }
            })
        });
        ["Product", "Internal"].forEach((e, i) => {
            const el = document.getElementById(e);
            if (!el) { return }
            gsap.to(el, {
                translateX: `${i != 0 ? "-" : ""}${getInternalandProductX(window.screen.width)}%`,
                translateY: `-${getInternalandProductY(window.screen.width)}%`,
                scrollTrigger: {
                    trigger: main,
                    scrub: true,
                    start: '+=100%',
                    end: '+=100%'
                }
            })
        });
        ["Home", "Contact"].forEach((e) => {
            const el = document.getElementById(e);
            if (!el) { return }
            gsap.to(el, {
                translateY: `+=${window.screen.width >= 1920 ? "30" : "10"}%`,
                scrollTrigger: {
                    trigger: main,
                    scrub: true,
                    start: '+=100%',
                    end: '+=100%'
                }
            })
        })
    }


    return (
        <div suppressHydrationWarning id='main' className="fixed w-full left-0 top-0 pt-[27px] 2xl:pt-10z-50  ">
            <div id='navbarContainer' className="w-full h-[80px] 2xl:h-[120px]  fixed z-50 hidden md:block">
                <div id='logo' className=" bg-black hidden md:block h-[100px] xl:h-[140px] 2xl:h-[200px] 3xl:-translate-y-8 xl:-translate-y-6 aspect-square mx-auto rounded-full z-50 absolute md:left-1/2 md:-translate-x-[50%] overflow-hidden -translate-y-3 ">
                    <CustomLogo/>
                    <img ref={image} className=" mx-auto absolute -z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%]" src="/badge.webp" />
                </div>

            <div id='buttonGrid' className="grid md:grid-cols-[10fr_1fr_10fr]   3xl:grid-cols-[49%_2%_49%]  md:grid-rows-[30px_10px_30px] 2xl:mt-8 2xl:grid-rows-[40%_10%_40%] top-1/2 -translate-y-1/2 absolute  headerButton w-full">
                <Button e={'Home'} />
                <div />
                <Button e={'Contact'} />
                <div />
                <div />
                <div />
                <Button e={'Product'} />
                <div />
                <Button e={'Internal'} />
            </div>
            </div>
            <div className="h-36 w-full fixed pt-2   bg-inherit md:hidden">

                <div className="h-[180px] w-[180px] -translate-y-5  rounded-full bg-inherit  z-50 right-0  absolute">
                    <CustomLogo />
                    <img ref={image} className=" mx-auto absolute -z-10 top-0 left-0" src="/badge.webp" />
                </div>

                <div id='buttonGrid' className="grid -z-10 absolute h-full w-3/4 backdrop-blur-xl bg-[rgba(1,1,1,0.2)] gap-y-2 grid-col-1 grid-rows-4">
                    <Button e={'Home'} />
                    <Button e={'Contact'} />
                    <Button e={'Product'} />
                    <Button e={'Internal'} />
                </div>

            </div>
        </div>
    )
}
function Button({ e }: { e: string }) {
    const ref = useRef<any>();
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (!ref.current || window.screen.width <= 640) { return; }
        ref.current.addEventListener('mouseenter', setHoverBackground);
        ref.current.addEventListener('mouseleave', removeHoverBackground);
        return () => {
            ref.current.removeEventListener('mouseenter', setHoverBackground);
            ref.current.removeEventListener('mouseleave', removeHoverBackground);
        };
    }, []);

    function removeHoverBackground() {
        setHover(false);
    }

    function setHoverBackground() {
        setHover(true);
    }

    function handleClick(e: string) {
        if (window.screen.width > 640) {
            ref.current.removeEventListener('mouseenter', setHoverBackground);
            ref.current.addEventListener('mouseleave', removeHoverBackground);
        }

        setHover(false);

        const children = document.querySelectorAll('#buttonGrid')[window.screen.width <= 640 ? 1 : 0].children;
        if (!children) { return; }
        setTimeout(() => {
            setHover(true);
        }, 200);
        setTimeout(() => {
            setHover(false);
            window.location.replace(`/${e === 'Home' ? '' : e.toLowerCase()}`);
        }, 600);
    }

    return (
        <div ref={ref} className={`w-full flex ${["Contact", "Product"].includes(e) ? "justify-end" : ""}`}>
            <div
                id={e}
                onClick={() => { handleClick(e); }}
                className={`flex z-40 cursor-pointer h-auto self-stretch w-full menuButtonContainer text-lg lg:text-xl 2xl:text-2xl 3xl:text-5xl md:p-1 font-bold items-center relative ${
                    ["Home", "Product"].includes(e) ? "md:justify-end" : 'md:justify-start'
                }${hover ? " bg-[#FFF000]" : " bg-[#F2CC00]"}`}
       // Center text horizontally and vertically
            >
                <a id={`button${e}`} className={getClass(e) + " cursor-pointer text-black px-4 md:m-2 rounded-full"}>{e}</a>
            </div>
        </div>
    );
}

function setMobileScrollDetection(amount: number) {
    var lastY = 0;
    window.addEventListener('touchmove', (e: TouchEvent) => {
        let currentY = window.scrollY;
        if (currentY >= lastY && currentY >= amount) {
            animateOut();
        } else {
            animateIn();
        }
        lastY = currentY;
    })
}




function getClass(e: string): string {
    switch (e) {
        case "Home":
            return 'md:-translate-x-[50%]'
        case "Product":
            return 'md:-translate-x-[70%]'
        case "Contact":
            return 'md:translate-x-[50%]'
        case "Internal":
            return 'md:translate-x-[70%]'
        default:
            return ""
    }
}


function animateIn() {
    const main = document.getElementById('main');

    gsap.to(main, {
        translateY: '0',
        duration: 0.8,
        delay: 0.05,
        ease: 'power1.out',
    })
}

function animateOut() {
    const main = document.getElementById('main');

    gsap.to(main, {
        translateY: '-1115%',
        duration: 0.8,
        delay: 0.05,
        ease: 'power1.out',
    })
}



function getHomeAndContactX(width: number) {
    
    if (width <= 1366) {
        return "95"
    }
    if (width <= 1536) {
        return "90"
    }
    if (width <= 1920) {
        return "120"
    }
    if (width <= 3840) {
        return "150";
    }


}


function getInternalandProductX(width: number) {
    if (width < 1366) {
        return "6"
    }
    if (width <= 1536) {
        return "6.5"
    }
    if (width <= 1920) {
        return "7"
    }
    if (width <= 3840) {
        return "6"
    };
}


function getInternalandProductY(width: number) {
    if (width <= 1366) {
        return "122"
    }
    if (width <= 1536) {
        return "115"
    }
    if (width < 1920) {
        return "123"
    }

    if (width <= 3840) {
        return "94"
    }

}
