const reduzirInteracoes = window.matchMedia('(prefers-reduced-motion: reduce)');
const ponteiroPreciso = window.matchMedia('(hover: hover) and (pointer: fine)');
const luz = document.querySelector('.cursor-luz');
const areaEmblema = document.querySelector('.emblema-area');
const elementosRevelar = document.querySelectorAll('.servicos article, .sobre, .depoimentos, .contato, .etapa, .vantagem');
let ponteiroX = -500;
let ponteiroY = -500;
let luzX = -500;
let luzY = -500;
let quadroLuz = 0;

function moverLuz() {
  luzX += (ponteiroX - luzX) * 0.13;
  luzY += (ponteiroY - luzY) * 0.13;
  if (luz) luz.style.transform = 'translate3d(' + luzX + 'px,' + luzY + 'px,0) translate(-50%,-50%)';
  quadroLuz = requestAnimationFrame(moverLuz);
}

if (!reduzirInteracoes.matches && ponteiroPreciso.matches) {
  document.documentElement.classList.add('interacoes-ativas');
  window.addEventListener('pointermove', evento => {
    ponteiroX = evento.clientX;
    ponteiroY = evento.clientY;
    const x = (evento.clientX / innerWidth - 0.5) * 2;
    const y = (evento.clientY / innerHeight - 0.5) * 2;
    window.dispatchEvent(new CustomEvent('qualitech:ponteiro', { detail: { x, y } }));
  }, { passive: true });
  document.addEventListener('pointerleave', () => {
    ponteiroX = -500;
    ponteiroY = -500;
    window.dispatchEvent(new Event('qualitech:repouso'));
  });
  quadroLuz = requestAnimationFrame(moverLuz);

  document.querySelectorAll('.magnetico').forEach(botao => {
    botao.addEventListener('pointermove', evento => {
      const caixa = botao.getBoundingClientRect();
      const x = (evento.clientX - caixa.left - caixa.width / 2) * 0.13;
      const y = (evento.clientY - caixa.top - caixa.height / 2) * 0.13;
      botao.style.translate = x + 'px ' + y + 'px';
    });
    botao.addEventListener('pointerleave', () => { botao.style.translate = '0 0'; });
    botao.addEventListener('blur', () => { botao.style.translate = '0 0'; });
  });

  areaEmblema?.addEventListener('pointermove', evento => {
    const caixa = areaEmblema.getBoundingClientRect();
    const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
    const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
    areaEmblema.style.setProperty('--paralaxe-x', (x * 14).toFixed(1) + 'px');
    areaEmblema.style.setProperty('--paralaxe-y', (y * 10).toFixed(1) + 'px');
  });
  areaEmblema?.addEventListener('pointerleave', () => {
    areaEmblema.style.setProperty('--paralaxe-x', '0px');
    areaEmblema.style.setProperty('--paralaxe-y', '0px');
  });
}

if ('IntersectionObserver' in window && !reduzirInteracoes.matches) {
  const observador = new IntersectionObserver(entradas => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
  elementosRevelar.forEach(elemento => {
    elemento.classList.add('revelar');
    observador.observe(elemento);
  });
}

document.querySelectorAll('.servicos article').forEach(cartao => {
  cartao.addEventListener('pointermove', evento => {
    if (!ponteiroPreciso.matches || reduzirInteracoes.matches) return;
    const caixa = cartao.getBoundingClientRect();
    const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
    const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
    cartao.style.setProperty('--inclinacao-x', (-y * 4).toFixed(2) + 'deg');
    cartao.style.setProperty('--inclinacao-y', (x * 4).toFixed(2) + 'deg');
  });
  cartao.addEventListener('pointerleave', () => {
    cartao.style.setProperty('--inclinacao-x', '0deg');
    cartao.style.setProperty('--inclinacao-y', '0deg');
  });
});
