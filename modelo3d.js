import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
const canvas=document.querySelector('#modelo3d'),caixa=canvas?.parentElement,reduzido=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(canvas&&caixa){try{
const cena=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);
camera.position.set(0,.1,10.6);
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
const grupo=new THREE.Group();cena.add(grupo);
const metal=new THREE.MeshPhysicalMaterial({color:0x36353a,metalness:.92,roughness:.24,clearcoat:1,clearcoatRoughness:.12});
const forma=new THREE.Shape();forma.absarc(0,0,1.56,0,Math.PI*2,false);
const furo=new THREE.Path();furo.absarc(0,0,.90,0,Math.PI*2,true);forma.holes.push(furo);
const anelGeo=new THREE.ExtrudeGeometry(forma,{depth:.64,bevelEnabled:true,bevelSegments:6,bevelThickness:.10,bevelSize:.08,curveSegments:110});anelGeo.center();
const anel=new THREE.Mesh(anelGeo,metal);grupo.add(anel);
const cauda=new THREE.Shape();cauda.moveTo(.35,-.68);cauda.lineTo(.99,-.43);cauda.lineTo(2.13,-1.72);cauda.lineTo(1.30,-1.87);cauda.closePath();
const caudaGeo=new THREE.ExtrudeGeometry(cauda,{depth:.66,bevelEnabled:true,bevelSegments:5,bevelThickness:.08,bevelSize:.07});caudaGeo.translate(0,0,-.32);
grupo.add(new THREE.Mesh(caudaGeo,metal));
const borda=new THREE.Mesh(new THREE.TorusGeometry(1.21,.017,10,140),new THREE.MeshBasicMaterial({color:0xff6b14}));borda.position.z=-.32;grupo.add(borda);
grupo.rotation.set(-.08,-.25,-.12);grupo.position.set(-.10,.08,0);
cena.add(new THREE.AmbientLight(0x9298a7,1.1));
const frente=new THREE.DirectionalLight(0xe5e8ff,4.2);frente.position.set(-3,5,7);cena.add(frente);
const laranja=new THREE.PointLight(0xff6311,130,14);laranja.position.set(-4,-2,3);cena.add(laranja);
const fundo=new THREE.PointLight(0xff7b1c,85,13);fundo.position.set(3,-3,-1);cena.add(fundo);
let quadro=0;const alvo={x:0,y:0},atual={x:0,y:0};
addEventListener('qualitech:ponteiro',evento=>{alvo.x=evento.detail.x;alvo.y=evento.detail.y});
addEventListener('qualitech:repouso',()=>{alvo.x=0;alvo.y=0});
function ajustar(){const w=caixa.clientWidth,h=caixa.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=w<390?12.4:w<600?11.5:10.6;camera.updateProjectionMatrix()}
new ResizeObserver(ajustar).observe(caixa);ajustar();
function animar(t){atual.x+=(alvo.x-atual.x)*.055;atual.y+=(alvo.y-atual.y)*.055;grupo.rotation.y=-.25+Math.sin(t*.00038)*.1+atual.x*.24;grupo.rotation.x=-.08+Math.sin(t*.00028)*.03-atual.y*.13;grupo.position.y=.08+Math.sin(t*.001)*.07;laranja.position.x=-4+atual.x*2.8;frente.position.x=-3+atual.x*2;renderer.render(cena,camera);caixa.classList.add('modelo-pronto');if(!reduzido&&!document.hidden)quadro=requestAnimationFrame(animar)}
canvas.addEventListener('webglcontextlost',evento=>{evento.preventDefault();caixa.classList.remove('modelo-pronto');cancelAnimationFrame(quadro)},{passive:false});
quadro=requestAnimationFrame(animar);document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(quadro);if(!document.hidden)quadro=requestAnimationFrame(animar)});
}catch(erro){console.warn('Emblema 3D indisponível; exibindo alternativa.',erro)}}
