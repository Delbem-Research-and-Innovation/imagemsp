# Spec — Página Contato

## Rota

```txt
/contato
```

## Nome da página

```txt
Contato
```

## Objetivo

```txt
Permitir que qualquer usuário saiba como falar com a equipe do IMAGEMSP e como direcionar corretamente sua mensagem.
```

## Decisões obrigatórias

```txt
Não implementar formulário.
Não implementar captcha.
Não implementar upload de arquivos.
Não implementar chat.
Não implementar CRM.
Não implementar sistema de tickets.
Não criar múltiplos emails enquanto não houver operação para gerenciá-los.
Usar um único email oficial do projeto.
Usar prefixos de assunto para triagem manual.
Informar tempo estimado de resposta.
Informar que o canal não atende emergências, casos médicos ou solicitações individuais de serviço.
```

---

# Conteúdo da página

## 1. Hero

```txt
Título:
Contato

Texto:
Fale com a equipe do IMAGEMSP sobre o projeto, dados, parcerias, imprensa ou acessibilidade.
```

---

## 2. Email principal

Usar um bloco visual simples, acima da dobra.

```txt
Título:
Email oficial

Texto:
Para entrar em contato, envie sua mensagem para:

Email:
contato@imagemsp.org.br
```

Enquanto o email real não estiver definido:

```txt
[EMAIL_OFICIAL_DO_PROJETO]
```

O email deve aparecer de duas formas:

```txt
Texto visível copiável:
contato@imagemsp.org.br

Link clicável:
mailto:contato@imagemsp.org.br
```

Texto do link:

```txt
Enviar email para contato@imagemsp.org.br
```

Evitar link genérico como “clique aqui”, porque links devem indicar seu propósito de forma clara para usuários e tecnologias assistivas. ([W3C][2])

---

## 3. Prefixos de assunto

Usar esta lista exatamente:

```txt
[DADOS] dúvidas sobre fontes, indicadores, metodologia, atualização ou correções
[PARCERIA] propostas de colaboração institucional, acadêmica ou técnica
[IMPRENSA] entrevistas, informações públicas ou solicitações de comunicação
[ACESSIBILIDADE] barreiras de acesso, leitura, navegação ou uso do site
[OPORTUNIDADES] dúvidas sobre vagas, bolsas ou formas de colaboração
[GERAL] outros assuntos relacionados ao projeto
```

Texto antes da lista:

```txt
Para ajudar no encaminhamento, comece o assunto do email com uma das marcações abaixo:
```

---

## 4. Tempo de resposta

```txt
Tempo estimado de resposta: até X dias úteis.
```

Usar placeholder enquanto não houver SLA oficial:

```txt
[DEFINIR_PRAZO_DE_RESPOSTA]
```

Recomendação prática:

```txt
até 5 dias úteis
```

---

## 5. Nota de escopo

Texto obrigatório:

```txt
O IMAGEMSP não realiza atendimento médico, atendimento de emergência ou encaminhamento individual para serviços sociais por este canal. Em situações urgentes, procure os serviços públicos responsáveis.
```

Essa nota é necessária porque o projeto trata de envelhecimento, saúde, serviços e vulnerabilidade; a página de contato não deve parecer um canal assistencial direto.

---

## 6. Links relacionados

Adicionar no fim da página:

```txt
Sobre o projeto
Equipe
Dados e indicadores
Acessibilidade
Oportunidades
```

Texto da seção:

```txt
Antes de escrever, talvez uma destas páginas ajude:
```

Cada link deve ter label explícito:

```txt
Conhecer o projeto
Ver equipe
Consultar dados e indicadores
Ver recursos de acessibilidade
Ver oportunidades
```

---

# Layout

## Estrutura

```txt
Main
  PageHeader
  ContactPrimaryBlock
  SubjectPrefixList
  ResponseTimeNote
  ScopeNotice
  RelatedLinks
```

## Largura

```txt
max-width: 760px
```

## Alinhamento

```txt
Conteúdo alinhado à esquerda.
Página centralizada no eixo horizontal.
```

## Estilo

```txt
Fundo: paper / background padrão do site
Texto: ink / text primary
Bloco de email: surface raised
Borda: subtle
Sem imagens
Sem ícones obrigatórios
Sem animação
Sem mapa
Sem tabela
```

---

# Copy final da página

```txt
Contato

Fale com a equipe do IMAGEMSP sobre o projeto, dados, parcerias, imprensa ou acessibilidade.

Email oficial

Para entrar em contato, envie sua mensagem para:

contato@imagemsp.org.br

Para ajudar no encaminhamento, comece o assunto do email com uma das marcações abaixo:

[DADOS] dúvidas sobre fontes, indicadores, metodologia, atualização ou correções
[PARCERIA] propostas de colaboração institucional, acadêmica ou técnica
[IMPRENSA] entrevistas, informações públicas ou solicitações de comunicação
[ACESSIBILIDADE] barreiras de acesso, leitura, navegação ou uso do site
[OPORTUNIDADES] dúvidas sobre vagas, bolsas ou formas de colaboração
[GERAL] outros assuntos relacionados ao projeto

Tempo estimado de resposta: até 5 dias úteis.

O IMAGEMSP não realiza atendimento médico, atendimento de emergência ou encaminhamento individual para serviços sociais por este canal. Em situações urgentes, procure os serviços públicos responsáveis.

Antes de escrever, talvez uma destas páginas ajude:

Conhecer o projeto
Ver equipe
Consultar dados e indicadores
Ver recursos de acessibilidade
Ver oportunidades
```

---

# Acessibilidade

Implementar:

```txt
Email visível como texto.
Email clicável com mailto.
Link com texto descritivo.
Foco visível em todos os links.
Área clicável confortável nos links.
Sem informação apenas por cor.
Sem ícone sem label.
```

WCAG 2.2 exige que o foco de teclado seja visível, e o critério de tamanho mínimo de alvo busca reduzir acionamentos acidentais, especialmente para pessoas com dificuldade motora. ([W3C][3])

---

# SEO

```txt
title: Contato | IMAGEMSP

description: Entre em contato com a equipe do IMAGEMSP para dúvidas sobre o projeto, dados, parcerias, imprensa, acessibilidade e oportunidades.

canonical: /contato
```

---

# Critérios de aceite

A página está pronta quando:

```txt
Existe a rota /contato.
Não há formulário.
O email principal aparece acima da dobra.
O email é copiável e clicável.
Os prefixos de assunto aparecem exatamente como definidos.
O tempo estimado de resposta aparece na página.
A nota de não atendimento médico/emergencial aparece na página.
Há links para Sobre, Equipe, Dados e indicadores, Acessibilidade e Oportunidades.
Todos os links têm texto descritivo.
Todos os links recebem foco visível por teclado.
A página funciona em uma coluna no mobile.
Nenhum dado falso de telefone, endereço ou email secundário foi inventado.
```

---

# Decisão final

Implementar a página **Contato** como página textual simples, com:

```txt
um email oficial
seis prefixos de assunto
tempo de resposta
nota de escopo
links relacionados
```

Nada além disso.
