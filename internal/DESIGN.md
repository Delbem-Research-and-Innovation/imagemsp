> **IMAGEMSP é um atlas público computacional: quente como uma peça editorial, preciso como uma ferramenta científica, claro como um produto público e tátil como uma boa interface material.**

O design não deve parecer “bonito por cima”. Deve parecer inevitável.

---

# 1. Design System redefinido

## Nome do sistema

# IMAGEMSP Civic Atlas System

Eu manteria “Civic Material Atlas” como conceito interno, mas refinaria o nome do sistema para:

```txt
IMAGEMSP Civic Atlas System
```

E a definição operacional:

```txt
A warm, editorial, cartographic, material design system for a public territorial intelligence platform about aging in São Paulo.
```

Ou, em português:

```txt
Um sistema visual editorial, cartográfico e material para uma plataforma pública de inteligência territorial sobre envelhecimento em São Paulo.
```

---

# 2. Princípios centrais

## 2.1 Atlas, não dashboard

O IMAGEMSP não deve parecer uma coleção de cards, gráficos e botões. Deve parecer um **atlas digital vivo**.

O projeto já foi definido nas conclusões do desk research como um sistema de apoio à decisão territorial, não como um produto de visualização estática; seu valor está em revelar relações, desencontros e prioridades, não em simplesmente exibir camadas de dados.

**Implicação visual:**

```txt
menos dashboard
mais atlas editorial
menos lista de features
mais narrativa territorial
menos grid genérico
mais composição cartográfica
```

---

## 2.2 Tecnologia calma, não espetáculo tecnológico

O site precisa parecer moderno e estado da arte, mas sem cair em neon, dark mode futurista, glassmorphism excessivo ou estética de startup IA.

A sofisticação deve aparecer em:

```txt
clareza
ritmo
microinterações
tipografia
hierarquia
mapas bem compostos
componentes consistentes
estados bem resolvidos
```

Não em efeitos visuais gratuitos.

A NN/g observa que estética pode melhorar a percepção de usabilidade, mas também reforça que clareza e valor informacional devem vencer floreio visual. ([Nielsen Norman Group][1])

---

## 2.3 Material como gramática, atlas como identidade

Material entra como filosofia de interação: superfícies, estados, elevação, foco, seleção, feedback, affordance.

Material não entra como aparência Google.

O Material Design 3 define estados como indicadores visuais para comunicar o status de componentes interativos, e essa lógica é útil para um produto como o IMAGEMSP, onde o usuário precisa entender o que está ativo, selecionado, carregando ou disponível. ([Material Design][2])

**Tradução para o IMAGEMSP:**

```txt
botões parecem botões
cards parecem superfícies
painéis parecem camadas
filtros parecem selecionáveis
estado ativo é inequívoco
foco de teclado é visível
loading não parece erro
```

---

## 2.4 Público antes do técnico, sem perder profundidade

O desk research é claro: a plataforma precisa ser compreensível para pessoas idosas e usuários não técnicos, mas manter profundidade para pesquisadores e gestores por meio de progressive disclosure.

Isso deve governar a homepage.

**Primeira camada:**

```txt
o que é
por que importa
o que posso fazer
como começo
```

**Camada posterior:**

```txt
metodologia
fontes
indicadores
incerteza
downloads
comparações avançadas
```

---

# 3. Audience and tone

## Definição final de audiência

O site não é para “idosos” apenas. Também não é para “gestores” apenas.

A audiência real é uma pirâmide de confiança:

| Camada        | Público                                            | O que precisa sentir                 |
| ------------- | -------------------------------------------------- | ------------------------------------ |
| Pública       | pessoas idosas, familiares, população geral        | “Eu entendo o que é e consigo usar.” |
| Cívica        | organizações sociais, imprensa, parceiros          | “Isso é sério, claro e útil.”        |
| Institucional | gestores públicos, universidades, pesquisadores    | “Isso é tecnicamente confiável.”     |
| Técnica       | analistas, desenvolvedores, pesquisadores de dados | “Há método, fonte e estrutura.”      |

A plataforma deve servir esses públicos sem misturar todas as densidades na primeira tela. O projeto também já identifica essa tensão multi-audiência como central: older adults precisam de clareza, enquanto pesquisadores e gestores precisam de profundidade analítica.

---

## Tom final

O tom correto não é “institucional formal” nem “warm/community” puro. Também não é urgente/ativista.

O tom deve ser:

```txt
cívico
calmo
preciso
humano
editorial
confiável
tecnológico sem hype
institucional sem burocracia
```

**Frase de calibração:**

> O IMAGEMSP fala como uma instituição pública inteligente, não como uma campanha, uma startup ou um artigo acadêmico.

---

## O que evitar

```txt
tom de ONG
tom de campanha
tom alarmista
tom acadêmico denso
tom SaaS promocional
tom IA futurista
tom municipal burocrático
```

**Exemplos ruins:**

```txt
Revolucionando o cuidado com nossos idosos.
A plataforma inovadora que transforma dados em impacto.
Um ecossistema inteligente para a população vulnerável.
```

**Exemplos bons:**

```txt
Entenda o envelhecimento em São Paulo pelo território.

Veja como população, serviços e condições urbanas se distribuem pela cidade.

Compare regiões, consulte fontes e compreenda lacunas de acesso.
```

---

# 4. Brand assets

## 4.1 Personalidade da marca

A marca deve ser definida por tensão controlada:

```txt
pública, mas não burocrática
tecnológica, mas não fria
artística, mas não decorativa
científica, mas não acadêmica demais
acessível, mas não infantilizada
sofisticada, mas não elitista
```

A W3C reforça que necessidades de usuários idosos são cobertas pelos padrões existentes de acessibilidade web, então a identidade visual precisa nascer acessível, não receber acessibilidade depois. ([W3C][3])

---

## 4.2 Direção visual

A direção visual deve ser:

```txt
editorial cartográfica
material civic
warm data
institutional art
```

A homepage deve parecer algo entre:

```txt
atlas contemporâneo
public research lab
data essay interativo
instrumento de planejamento público
```

E nunca:

```txt
landing SaaS genérica
dashboard corporativo
portal municipal cinza
site acadêmico estático
campanha assistencialista
```

---

## 4.3 Paleta

A paleta que definimos continua correta, mas precisa ser tratada com mais disciplina.

**Sistema cromático:**

```txt
Base: papel quente / parchment
Texto: ink brown / quase preto
Primária: oliva profundo
Secundária: oliva acinzentado / stone
Acento: âmbar / clay / terracota
Dados: escalas cartográficas acessíveis
Estados: sucesso, alerta, erro e info com contraste suficiente
```

A paleta não deve virar “bege e verde aplicados em tudo”. O fundo quente cria atmosfera; o oliva dá autoridade; o acento deve ser raro e memorável.

**Regra:**

```txt
80% neutros quentes
15% oliva institucional
5% acento quente
```

Para texto e componentes, WCAG exige contraste suficiente entre texto e fundo; o critério 1.4.3 existe para garantir leitura por pessoas com baixa visão ou menor percepção de contraste. ([W3C][4])

---

## 4.4 Superfícies

As superfícies são o ponto onde o sistema atual provavelmente precisa melhorar.

Não basta ter cards. Os cards precisam ter função.

**Tipos de superfície:**

| Superfície      | Função              | Sensação          |
| --------------- | ------------------- | ----------------- |
| Page background | atmosfera editorial | papel quente      |
| Content surface | leitura             | calma e clara     |
| Data surface    | indicadores         | precisa e técnica |
| Map surface     | território          | cartográfica      |
| Action surface  | CTA, filtros        | tátil e evidente  |
| Trust surface   | fontes, metodologia | institucional     |

**Regra:** cada superfície deve comunicar se é leitura, ação, dado ou orientação.

---

## 4.5 Componentes

O sistema deve priorizar menos componentes, porém mais bem definidos.

**Componentes essenciais para a homepage:**

```txt
Hero editorial
Map preview card
Indicator panel
Question card
Domain card
Trust strip
CTA band
Institutional badge
Navigation header
Footer
Text size control
```

**Estados obrigatórios:**

```txt
default
hover
focus
active
selected
disabled
loading
empty
error
success
```

A documentação do projeto também reforça que controles, filtros, legendas, busca e switches devem ser grandes, visíveis e espaçados, especialmente considerando usuários mais velhos.

---

## 4.6 Imagem, ilustração e mapas

A linguagem visual deve vir da cartografia, não de ilustração genérica.

**Usar:**

```txt
linhas de território
contornos abstratos de São Paulo
grades cartográficas
micro mapas
pontos proporcionais
texturas de papel
diagramas de fluxo
painéis de evidência
```

**Evitar:**

```txt
stock photo de idosos sorrindo
mãos segurando tablet
ícones genéricos de saúde
ilustrações SaaS com bonecos
gradientes futuristas
mapa decorativo ilegível
```

O desk research de mapas recomenda cuidado com visualizações multivariadas e aponta small multiples, linked views e mapas esquemáticos como recursos úteis para comparação e comunicação, desde que não substituam o mapa analítico principal.

---

# 5. Typography intent

## Decisão final

A tipografia do IMAGEMSP deve ser:

```txt
editorial-first
data-capable
map-compatible
accessibility-led
```

Não é apenas body-heavy, nem apenas data-heavy, nem visual-first.

É um híbrido:

| Uso                 | Peso no sistema | Implicação                                                    |
| ------------------- | --------------: | ------------------------------------------------------------- |
| Texto editorial     |            Alto | headings fortes, parágrafos legíveis, ritmo de leitura.       |
| Dados e indicadores |            Alto | numerais claros, tabelas legíveis, metadados visíveis.        |
| Mapas e UI          |            Alto | labels, filtros, chips, legendas e painéis sem texto pequeno. |
| Visual artístico    |           Médio | display face pode existir, mas não pode dominar.              |

---

## Estrutura tipográfica recomendada

### 1. Primary UI/Text Face

Uma sans-serif altamente legível para tudo:

```txt
body
cards
botões
navegação
painéis
filtros
legendas
forms
metadados
```

Características:

```txt
humanista ou grotesk contemporânea
x-height generosa
boa leitura em tamanhos pequenos e médios
pesos 400, 500, 600, 700
bons numerais
boa renderização em web
```

---

### 2. Optional Display Face

Pode existir, mas com regra rígida.

Usar apenas para:

```txt
hero title
grandes chamadas editoriais
títulos de seção muito curtos
```

Não usar em:

```txt
parágrafos
botões
filtros
mapa
legenda
metadados
tabelas
```

A display face deve dar sensação de arte/editorial, não de ornamento.

---

### 3. Numeric / Tabular Support

O sistema precisa de numerais tabulares ou boa configuração OpenType para:

```txt
indicadores
percentuais
comparações
tabelas
cards de dados
legendas
```

Isso é importante porque o produto será intensivo em dados.

---

## Escala tipográfica

A escala deve ser confortável por padrão e responsiva.

**Direção de tokens, não valores hardcoded:**

```txt
display
h1
h2
h3
lead
body-lg
body
body-sm
label
caption
data-lg
data
metadata
```

**Regras práticas:**

```txt
body default confortável, próximo de 18px ou mais
line-height generoso
small text nunca minúsculo
metadata legível
botões com 16–18px
legendas de mapa legíveis
tabelas com espaçamento real
```

O desk research do projeto já define que a plataforma não deve assumir visão forte, precisão motora ou familiaridade com mapas complexos, e que a primeira camada deve ser legível e geradora de confiança. A NN/g também aponta desafios específicos para usuários com 65+ em sites e apps, mesmo com aumento da literacia digital. ([Nielsen Norman Group][5])

---

## Text resizer

O text resizer não é acessório. Ele deve fazer parte do sistema.

**Estados:**

```txt
Padrão
Grande
Muito grande
```

**Regra:** não permitir fonte menor que o padrão.

**Onde aparece:**

```txt
header
página de acessibilidade
preferencialmente persistente via localStorage
```

**O que deve escalar:**

```txt
body
headings
botões
cards
painéis
filtros
legendas
metadados
forms
mensagens
```

O navegador ainda deve continuar permitindo zoom; WCAG 2.2 inclui exigências relacionadas a redimensionamento de texto e reflow sem perda de conteúdo ou funcionalidade. ([W3C][6])

---

# 6. Design system final resumido

```txt
System name:
IMAGEMSP Civic Atlas System

Core feeling:
public intelligence, editorial warmth, cartographic precision, material clarity

Visual language:
warm paper + deep olive + ink + cartographic surfaces + restrained accent

Interaction language:
Material as philosophy; visible states, tactile surfaces, clear affordance

Content language:
plain public language first; technical depth by disclosure

Typography:
editorial-first, data-capable, map-compatible, accessibility-led

Homepage role:
reveal, explain, build trust, route to map

Primary audience:
general public, older adults, families, public managers, researchers, civil society, journalists, institutional partners

Tone:
civic, calm, precise, human, trustworthy, modern without hype

Avoid:
SaaS generic, government portal, NGO campaign, academic PDF, cold dashboard, trendy AI aesthetic
```

---

# 7. Decisão final

A homepage deve parar de tentar apenas “apresentar o projeto” e passar a **encenar a experiência mental do IMAGEMSP**:

```txt
território → dado → interpretação → decisão → confiança
```

Esse é o salto de qualidade.

Quando a página conseguir fazer o usuário sentir que está diante de um **instrumento público moderno, bonito, confiável e intuitivo**, sem perder legibilidade nem precisão, ela estará na direção certa.

[1]: https://www.nngroup.com/articles/aesthetic-usability-effect/?utm_source=chatgpt.com 'The Aesthetic-Usability Effect'
[2]: https://m3.material.io/foundations/interaction/states?utm_source=chatgpt.com 'States – Material Design 3'
[3]: https://www.w3.org/WAI/older-users/?utm_source=chatgpt.com 'Older Users and Web Accessibility: Meeting the Needs of ...'
[4]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum?utm_source=chatgpt.com 'Understanding Success Criterion 1.4.3: Contrast (Minimum)'
[5]: https://www.nngroup.com/articles/usability-for-senior-citizens/?utm_source=chatgpt.com 'Usability for Older Adults: Challenges and Changes'
[6]: https://www.w3.org/TR/WCAG22/?utm_source=chatgpt.com 'Web Content Accessibility Guidelines (WCAG) 2.2'
