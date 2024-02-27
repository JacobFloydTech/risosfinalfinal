"use client"
import {  LoadTree, addLights, addMiddleGround, addWater, changeSunPosition, getMiddleGround, loadMountainGLB , animateMountains, addUnderlyingLandscape, addPointLight } from './functions';
import { MutableRefObject, useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import { BokehPass, EffectComposer, RenderPass, ShaderPass, Water } from 'three/examples/jsm/Addons.js';
import {   animateRings,  changeTImeValue, handleAnimation} from './display';
import { VignetteShader } from 'three/examples/jsm/Addons.js';

let velocity = -0.05;

export default function ThreeJSBackground({setLoaded}: { setLoaded: Function}) {
    const ref = useRef<any>(null);
    const [loadedImage, setLoadedImage] = useState(true)
    const [loadedScene, setLoadedScene] = useState(false);
    useEffect(() => {
        if (loadedImage && loadedScene) { setLoaded(true)}
     },[setLoadedImage, setLoadedScene, loadedImage, loadedScene])
    useEffect(() => { setScene(ref, setLoadedScene) }, [])
    return (
        <div className={'w-full h-full fixed -bottom-12 -z-10 bg-orange-600'  + (loadedImage && loadedScene ? " opacity-1" : " opacity-0")}>
               <img id="sun" src='/sun1.jpg' fetchPriority='high' className='w-full object-cover absolute top-0 left-0 translate-y-50 -z-40 h-full'/>
               <img id="sun" src='/sun1.jpg' fetchPriority='high' className='w-full object-cover absolute top-0 left-0 -z-40 -translate-y-60 h-full'/>


 
            <div className='w-full h-full'  ref={ref} />
    
     

        </div>

    )
}




async function setScene(ref: MutableRefObject<any>, setLoading: Function) {
    if (!ref.current) { return }
    let fov = window.innerWidth >= 1366 ? 100 : 110, devicePixelRatio = window.innerWidth >= 1366 ? 7 : 7.5;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 300);
    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: false, powerPreference: 'high-performance'})
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio/devicePixelRatio);
    ref.current.appendChild(renderer.domElement);
    await Promise.all([
    loadMountainGLB(scene),
        addWater(scene),
        addMiddleGround(scene),

    ]) 
    LoadTree(scene)

    setLoading(true)

    //loadContact(scene);

    scene.fog = new THREE.FogExp2( 0xd28032, 0.008 );
    const water = scene.getObjectByName('waterMesh') as Water;
    scene.background = null
    camera.position.set(0, 30, 0);
    camera.lookAt(0, 30, -200);

    
 
    //let mixer = await (window.outerWidth >= 1366 ? addWaicorder(scene) :addWaicorderMobile(scene) )

    //const waicorder = scene.getObjectByName("Armature008") as THREE.Object3D;
    //waicorder.rotation.z = Math.PI*2;
   

    //postprocessing

    let composer = new EffectComposer( renderer );
    const bokehPass = new BokehPass(scene, camera, {
        focus: 1,   // Adjust focus distance (0 to 1)
        aperture: 0.0001,  // Adjust aperture size (0 to 1)
        maxblur: 0.28,  // Adjust maximum blur strength (0 to 1)
        
    });
    bokehPass.materialBokeh.fragmentShader = fragmentShader;
	composer.addPass( new RenderPass( scene, camera ) );
	composer.addPass(bokehPass)
	var shaderVignette = VignetteShader;
	var effectVignette = new ShaderPass( shaderVignette );
	// larger values = darker closer to center
	// darkness < 1  => lighter edges
	effectVignette.uniforms[ "offset" ].value = 1
	effectVignette.uniforms[ "darkness" ].value = 0.7;
    effectVignette.renderToScreen = true;
    //composer.addPass(blur)
	composer.addPass(effectVignette);

    
    const light = addPointLight(scene)
    function animate() {
        animateMountains(scene, camera.position)
        handleAnimation(camera.position.z, scene);



       // mixer?.update(0.02);
        light.position.z =  camera.position.z -100;
        requestAnimationFrame(animate);
        camera.position.z += velocity
        if (velocity <  -0.3) { 
            velocity = -0.3;
        }
        if (velocity < 0) { 
            velocity += 0.0008;
        }
        camera.position.z += velocity;
        camera.position.z -= 0.1;
        if (camera.position.z <= -2300 || camera.position.z > 1) {
            if (camera.position.z > 1) { 
                velocity = 0;
            }
            camera.position.z = 0;
        }
        camera.updateMatrix();
        camera.updateProjectionMatrix();
        if (water) { water.material.uniforms.time.value -= 0.015; }
        //if (waicorder){ waicorder.rotation.y += 0.05;}
        composer.render()


    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function onWheel(e: WheelEvent) {
        velocity += Math.abs(e.deltaY*0.00015)*-1;
    }
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('wheel', onWheel, false);
    addMobileListeners()
    animate()

}


function addMobileListeners() { 

    let startY: number | null = 0;
    
    window.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    window.addEventListener('touchmove', (e) => { 
        if (!startY) return
        const newY = e.touches[0].clientY;
        const diff = startY-newY;
        if (diff > 0) { 
            velocity -= diff*0.0000005;
        } else { 
            velocity += diff*0.0000005;
        }
        
    })
    window.addEventListener('touchend', () => startY = null)
}

let fragmentShader = `

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
	

		}`