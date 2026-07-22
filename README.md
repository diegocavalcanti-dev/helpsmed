# HelpsMed — Landing Page Premium

Site institucional e de conversão para a **HelpsMed**, consultoria de alta performance para a residência médica. Página única (single page), responsiva, sem dependências de build — pronta para publicar em qualquer host estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3, etc.).

```
helpsmed/
├── index.html          → estrutura + toda a copy
├── assets/
│   ├── styles.css      → design system completo (navy + teal + gold)
│   └── script.js       → interações, contadores, formulário, exit-intent
└── README.md           → este arquivo
```

---

## ⚙️ Antes de publicar — o que preencher

Abra `assets/script.js` e ajuste o objeto `CONFIG` no topo:

| Campo | O que colocar |
|---|---|
| `whatsappNumber` | Número no formato `55` + DDD + número, só dígitos (ex.: `5511999999999`) |
| `whatsappMessage` | Mensagem padrão que abre no WhatsApp |
| `formEndpoint` | (Opcional) URL para receber os leads. Vazio = o formulário abre o WhatsApp com os dados preenchidos |

Depois, faça uma busca por `[` no `index.html` e substitua os placeholders entre colchetes:

- `[URL_DO_SITE]`, `[URL_IMAGEM_COMPARTILHAMENTO]` — SEO / Open Graph
- `[EMAIL]`, `[TELEFONE / WHATSAPP]`, `[CIDADE / UF]`, `[CNPJ]`
- `[LINK_WHATSAPP]`, `[LINK_INSTAGRAM]`, `[LINK_YOUTUBE]`, `[LINK_LINKEDIN]`
- `[LINK_POLITICA_PRIVACIDADE]`, `[LINK_TERMOS_USO]`
- `[VALOR]`, `[VALOR CHEIO]`, `[Nx]` — oferta
- `[Nome do aluno]`, `[Programa/Instituição]`, `[FOTO]` — depoimentos reais
- `[FOTO PROFISSIONAL DA EQUIPE HELPSMED]` — foto da seção Sobre

> Os links de WhatsApp marcados com `data-wa` são preenchidos automaticamente pelo `CONFIG` do JS — não precisa editar cada `[LINK_WHATSAPP]` manualmente.

---

## 1. Posicionamento Estratégico

**Resumo do negócio.** A HelpsMed é uma consultoria educacional de nicho que atua na interseção entre carreira médica e aprovação em residência. Não vende "coaching de carreira" genérico: vende engenharia de pontuação de currículo à luz dos editais mais concorridos do país, somada a capacitação prática em urgência e emergência.

**Proposta de valor.** Transformar o currículo do candidato no seu maior diferencial competitivo — maximizando cada ponto permitido pelo edital — e dar ao recém-formado segurança técnica para o plantão. Em uma frase: *mais pontos no edital, menos peso nos ombros.*

**Público-alvo.** Internos (último ano) e médicos recém-formados generalistas que vão disputar residência em processos seletivos concorridos (ENARE, USP, UNIFESP, UNICAMP e afins) e/ou precisam de capacitação rápida para plantões.

**Diferencial central.** Especialização cirúrgica no mercado médico. Enquanto consultorias genéricas dão conselhos amplos, a HelpsMed lê o edital, entende as bancas e trabalha ponto a ponto, com atendimento 100% individual e metodologia desenhada para os editais mais difíceis. Parceria institucional com a **Rede Curem**.

**Níveis de consciência da copy.** O público está em consciência do problema (sabe que precisa pontuar, mas não sabe como) e consciência da solução (já ouviu falar em mentoria). A copy conecta a dor concreta ("perder a vaga por décimos no currículo") diretamente à solução específica da HelpsMed, sem prometer aprovação garantida.

---

## 2. Estrutura do Site (ordem das seções)

1. **Barra de anúncio** — escassez suave ("vagas limitadas por turma").
2. **Header** — Home · Mentoria de Currículo · Treinamentos · Sobre Nós · Contato + CTA "Falar com Consultor".
3. **Hero** — headline de impacto, subheadline, promessa (diagnóstico em 7 dias), CTA duplo, painel de autoridade com "score" de currículo e estatísticas animadas.
4. **Trust bar** — editais mapeados + Rede Curem.
5. **Dor / Empatia** — nomeia o problema real (a disputa é no currículo, não na prova).
6. **Serviços** — Mentoria de Currículo (carro-chefe) + Treinamentos de Urgência; strip de diferenciais.
7. **Processo** — 4 passos do diagnóstico à banca.
8. **Benefícios** — 6 ganhos práticos e emocionais.
9. **Sobre / Autoridade** — história, propósito, selo Rede Curem, espaço para foto profissional.
10. **Prova social** — métricas + depoimentos (placeholders) + área para prints/vídeos.
11. **Quebra de objeções** — as 4 dúvidas que travam a decisão.
12. **Conversão / Oferta** — Análise Estratégica de Currículo, bônus, ancoragem de valor, escassez, risco zero.
13. **Contato** — canais + formulário de lead qualificado.
14. **FAQ** — acordeão com 7 perguntas.
15. **CTA final** — urgência elegante.
16. **Footer** — institucional, redes, CNPJ, disclaimer ético.
17. **Elementos flutuantes** — botão WhatsApp fixo + modal de intenção de saída.

---

## 4. Direção Visual e Design

**Estilo.** Clean, tecnológico e clínico-premium. Superfícies alternadas claro/escuro para guiar o escaneamento; muito respiro; cartões com cantos arredondados e sombras suaves; micro-interações discretas (hover, reveal on scroll, contadores).

**Paleta.**
| Uso | Cor | Hex |
|---|---|---|
| Autoridade (fundo escuro) | Navy midnight | `#0A1B2E` / `#06121F` |
| Acento principal (saúde/tech) | Teal médico | `#14C4B0` |
| Acento premium (sofisticação) | Champagne gold | `#E4B767` |
| Superfície clara | Off-white | `#F6F9FB` / `#FFFFFF` |
| Alerta/escassez | Coral | `#E5533B` |

O gradiente teal→gold é a assinatura da marca (títulos em destaque, números, "score").

**Tipografia.** `Sora` (display — títulos, números, botões) + `Inter` (corpo). Sans-serif geométrica + neo-grotesca: moderna, limpa e de alta legibilidade em tela. Fallback para fontes de sistema.

**Layout.** Grid de 12 col. simplificado, container de 1200px. Seções em blocos alternados; hero e ofertas em fundo navy, prova/educação em fundo claro. Mobile-first com breakpoints em 960 / 820 / 680 / 420 px.

**Elementos visuais.** Ícones de linha minimalistas (pulso/ECG na marca), grid sutil de fundo no hero, "anel de score" do currículo como metáfora de evolução de nota, selos de editais, cartões de estatística. Placeholders claros para fotos profissionais e prints de aprovação.

**Sensação transmitida.** Confiança inabalável, alta performance acadêmica, alívio da ansiedade e exclusividade — o oposto de "curso barato".

---

## 5. Melhorias de Conversão aplicadas (e roadmap)

**Já implementado na página**
- CTA persistente no header + botão WhatsApp flutuante + CTAs a cada dobra.
- Micro-copy nos botões orientada a benefício ("Quero Analisar Meu Currículo", "Garantir Minha Vaga").
- Prova social (métricas animadas, depoimentos, área para prints reais).
- Gatilhos mentais: escassez (vagas por turma), autoridade (editais + Rede Curem), reciprocidade (bônus), redução de risco ("risco zero").
- Ancoragem de valor na oferta (preço "de/por" + custo de oportunidade de perder um ano).
- Quebra de objeções dedicada + FAQ em acordeão.
- Formulário curto e qualificador (momento na medicina + edital-alvo), com fallback direto para WhatsApp.
- Modal de intenção de saída (desktop) e por engajamento (mobile), exibido uma vez por sessão.
- Contador de progresso do currículo como demonstração visual da promessa.

**Otimizações / atrito a eliminar**
- Reduzir campos do formulário ao mínimo (nome + WhatsApp já bastam para o primeiro contato).
- Resposta rápida no WhatsApp é decisiva — configurar mensagem automática de boas-vindas.
- Substituir todos os placeholders `[FOTO]`/`[Nome]` por prova social real o quanto antes.

**Ideias de teste A/B (roadmap)**
- Headline: "Maximize cada ponto…" vs. "Seu currículo pode valer a vaga — ou custá-la."
- Cor do CTA principal: teal vs. gold.
- Oferta de entrada: "Análise Estratégica paga" vs. "Diagnóstico gratuito de 15 min".
- Prova social acima vs. abaixo da seção de serviços.

**UX / performance**
- Zero dependências de JS de terceiros; fontes com `display=swap`; imagens devem entrar como `webp` com `loading="lazy"`.
- Áreas de toque ≥ 44px, foco visível, navegação por teclado, `prefers-reduced-motion` respeitado, HTML semântico e `aria-*` — bom para acessibilidade e SEO.
- Alvo Lighthouse: 90+ em Performance/Acessibilidade/SEO após inserir imagens otimizadas.

---

## Ética de copy

A página não promete aprovação garantida. O disclaimer no rodapé deixa claro que resultados variam por candidato e que a HelpsMed oferece orientação e capacitação — a aprovação depende do desempenho individual. Métricas marcadas com `*` devem ser substituídas por dados reais e auditáveis antes do lançamento.
