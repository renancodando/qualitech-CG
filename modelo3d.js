import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas = document.querySelector('#modelo3d');
const container = canvas?.parentElement;
const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && container) {
  try {
    const cena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
    camera.position.set(0, 0.25, 11.8);

    const renderizador = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    canvas.addEventListener('webglcontextlost', evento => { evento.preventDefault(); container.classList.remove('modelo-pronto'); cancelAnimationFrame(quadro); }, { passive: false });
    renderizador.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderizador.outputColorSpace = THREE.SRGBColorSpace;
    renderizador.toneMapping = THREE.ACESFilmicToneMapping;
    renderizador.toneMappingExposure = 1.35;

    const grupo = new THREE.Group();
    cena.add(grupo);

    const forma = new THREE.Shape();
    forma.absarc(0, 0, 1.55, 0, Math.PI * 2, false);
    const furo = new THREE.Path();
    furo.absarc(0, 0, 0.88, 0, Math.PI * 2, true);
    forma.holes.push(furo);

    const geometria = new THREE.ExtrudeGeometry(forma, {
      depth: 0.53,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.12,
      bevelThickness: 0.12,
      curveSegments: 100
    });
    geometria.center();

    const metal = new THREE.MeshPhysicalMaterial({
      color: 0x393a41,
      metalness: 0.96,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14
    });
    const aro = new THREE.Mesh(geometria, metal);
    grupo.add(aro);

    const caudaForma = new THREE.Shape();
    caudaForma.moveTo(0.48, -0.6);
    caudaForma.lineTo(1.08, -0.46);
    caudaForma.lineTo(2.08, -1.73);
    caudaForma.lineTo(1.22, -1.83);
    caudaForma.closePath();
    const caudaGeo = new THREE.ExtrudeGeometry(caudaForma, {
      depth: 0.58, bevelEnabled: true, bevelSegments: 4,
      bevelThickness: 0.09, bevelSize: 0.08
    });
    caudaGeo.translate(0, 0, -0.27);
    grupo.add(new THREE.Mesh(caudaGeo, metal));

    const contorno = new THREE.Mesh(
      new THREE.TorusGeometry(1.22, 0.018, 10, 120),
      new THREE.MeshBasicMaterial({ color: 0xff681a })
    );
    contorno.position.z = -0.24;
    contorno.scale.set(1.02, 1.02, 1);
    grupo.add(contorno);

    grupo.rotation.set(-0.12, -0.25, -0.13);
    grupo.position.set(-0.12, 0.08, 0);

    cena.add(new THREE.AmbientLight(0xadb4d1, 1.1));
    const luzFrontal = new THREE.DirectionalLight(0xe7edff, 4.4);
    luzFrontal.position.set(-3, 5, 8);
    cena.add(luzFrontal);
    const luzLaranja = new THREE.PointLight(0xff5c0c, 125, 14);
    luzLaranja.position.set(-3.8, -2, 3);
    cena.add(luzLaranja);
    const luzBorda = new THREE.PointLight(0xff8227, 85, 12);
    luzBorda.position.set(3, -3, -1);
    cena.add(luzBorda);

    function ajustar() {
      const largura = container.clientWidth;
      const altura = container.clientHeight;
      if (!largura || !altura) return;
      renderizador.setSize(largura, altura, false);
      camera.aspect = largura / altura;
      camera.position.z = largura < 390 ? 13.3 : largura < 600 ? 12.2 : 11.2;
      camera.updateProjectionMatrix();
    }
    const observador = new ResizeObserver(ajustar);
    observador.observe(container);
    ajustar();

    let quadro = 0;
    function animar(tempo) {
      grupo.rotation.y = -0.25 + Math.sin(tempo * 0.00038) * 0.11;
      grupo.rotation.x = -0.12 + Math.sin(tempo * 0.00026) * 0.035;
      grupo.position.y = 0.08 + Math.sin(tempo * 0.0011) * 0.07;
      renderizador.render(cena, camera);
      container.classList.add('modelo-pronto');
      if (!reduzido && !document.hidden) quadro = requestAnimationFrame(animar);
    }
    quadro = requestAnimationFrame(animar);
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(quadro);
      if (!document.hidden) quadro = requestAnimationFrame(animar);
    });
  } catch (erro) {
    console.warn('Exibindo versão alternativa do emblema.', erro);
  }
}
