# Qualitech CG — site responsivo

Página criada a partir da referência fornecida, em português, com HTML, CSS e JavaScript, sem instalação de dependências e sem compilação.

## Abrir

Abra `index.html` no navegador. Todos os recursos visuais e fontes estão incluídos. Para uma prévia via HTTP, dentro desta pasta execute:

```powershell
python -m http.server 4173
```

Depois acesse http://localhost:4173.

## Configurar o WhatsApp

Edite `config.js` e preencha `whatsapp` com o telefone da assistência, incluindo código do país e DDD, apenas números. Exemplo de formato: `5567999999999`.

O número `5583987579714` foi preservado do site que já estava no repositório GitHub `renancodando/qualitech-CG`. Se o campo ficar vazio, o site informa essa pendência e permite escolher o contato. Nenhuma mensagem é enviada automaticamente.

## Interações

- Formulário com validação, revisão e edição da mensagem antes de abrir o WhatsApp.
- Rascunho do formulário salvo no navegador do visitante.
- Menu móvel, links internos e indicação da seção atual.
- Abas de smartphones, computadores e videogames, com seleção de serviço para o orçamento.
- Etapas do atendimento com explicações expansíveis.
- Perguntas frequentes com expansão e recolhimento.
- Navegação por teclado, foco visível e respeito à preferência por movimento reduzido.
- Entrada animada do destaque, luz passando pelo título e brilho pulsante nos botões.
- Partículas laranja e ondas de energia ao tocar na área visual do destaque.
- Fundo com paralaxe suave no desktop, cartões reagindo ao cursor e seções reveladas ao rolar.
- Animações pausadas quando a aba ou a abertura saem de vista; partículas limitadas a cerca de 30 quadros por segundo.

As seções adicionais foram escritas para completar os links do menu da referência. Serviços, condições de garantia e textos institucionais devem ser revisados pelo responsável antes do uso comercial. Nenhum depoimento de cliente foi inventado.

## Arquivos

- `index.html`: estrutura e conteúdo.
- `styles.css` e `refinements.css`: composição, tipografia e responsividade.
- `app.js`: interações.
- `config.js`: número do WhatsApp.
- `motion.css` e `motion.js`: animações e efeitos interativos.
- `assets/`: imagem, favicon e fontes locais.


## Arte

O fundo `assets/hero.png` foi preparado com a ferramenta integrada de geração de imagens a partir da referência enviada. O pedido foi preservar o Q metálico, pedestal e ondas laranja, removendo textos, logotipos pequenos, campos, botões e demais elementos da interface, para permitir a sobreposição de HTML interativo. A marca no cabeçalho e os ícones são vetores em código.

Prompt utilizado: "Edit target: attached website mockup. Create a clean website background plate, same 1536x864 wide composition. Preserve exactly the central giant metallic dark graphite 3D letter Q, orange glowing edges, circular pedestal, dark wave terrain with fine orange wire lines, and existing atmospheric lighting. Remove ALL text, all small logos, all UI, header, navigation, buttons, badges, input fields, form panel, icons and step cards. Fill their areas seamlessly with matching charcoal background and orange wave terrain. Keep giant Q positioned at x=840 y=270, and pedestal at x=840 y=470. Leave left third dark with ample empty space for HTML headline. Keep black floor waves at bottom. No text or UI whatsoever. This is an image background asset to be used underneath real HTML."

## Publicação

A raiz deste repositório contém o site estático pronto para hospedagem, sem instalação ou build. O histórico anterior foi preservado na substituição dos arquivos.
