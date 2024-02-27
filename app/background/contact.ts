import * as THREE from 'three'
import { borderShaderMaterial } from './display';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { changeOpacity } from './display';
function addDisplayTextVision(scene: THREE.Scene) { 
    const text = 'Contact Us here '
    const loader = new FontLoader();
    loader.load('/font.json', (font) => { 
        const geometry = new TextGeometry(text, { 
            font: font, height: 0.05, size: 0.62
        })
        const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({transparent: true}));
        mesh.position.set(-1, 38, 0);
        mesh.name = 'contactText';
        mesh.renderOrder = 10;
        mesh.material.blending = THREE.NormalBlending;
        scene.add(mesh)
    })
}

function addPlane(scene: THREE.Scene) { 
    const plane = new THREE.PlaneGeometry(30, 20)
    const mesh = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({color: 0x0FFFF, transparent: true}));
    mesh.position.set(0, 30,0)
    mesh.name = 'contactBackground';
    scene.add(mesh);
}

export function handleContactAnimation(currentZ: number, scene: THREE.Scene) { 
    const start = -620, end = -700, startFade = -800, endFade = -1000;
    const form = document.getElementById('contactForm')
    if (!form) return
    const closestDistance = window.innerWidth >= 1366 ? 40 : 40;
    ['contactBackground', 'contactText'].map(e => scene.getObjectByName(e) as THREE.Mesh).filter((e) => e).forEach((e) => { 
        if (currentZ > start) {form.style.opacity = '0'; e.position.z = currentZ-50; return changeOpacity(e, 0)};
        if (currentZ < end && currentZ > startFade) {form.style.opacity = '1'; e.position.z = currentZ-closestDistance; return changeOpacity(e, 0)}
        if (currentZ > end) { 
            const per = (currentZ-start)/(end-start);
            const offset = (1-per)*50+closestDistance;
            e.position.z = currentZ-offset;
            form.style.opacity = `${Math.round(per * 100)}%`;
            //form.style.transform = `scale(${per})`
            changeOpacity(e, 0)
        } else { 
            const per = 1-(currentZ-startFade)/(endFade-startFade);
            const offset = per*50+closestDistance;
            e.position.z = currentZ-offset;
            form.style.opacity = `${Math.round(per * 100)}%`
            //form.style.transform = `scale(${per})`
            changeOpacity(e, 0);
        }
        console.log(form.style.opacity);
    })
}


export function loadContact(scene: THREE.Scene) { 
    addDisplayTextVision(scene);
    addPlane(scene)
}