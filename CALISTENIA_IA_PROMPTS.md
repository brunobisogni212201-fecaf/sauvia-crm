# 🏋️ Sauvia — Prompts de IA para Geração de Vídeos de Calistenia

> **Objetivo:** Gerar vídeos demonstrativos de exercícios de calistenia com IA para a biblioteca do app  
> **Ferramentas:** Sora (OpenAI) / Kling AI / RunwayML Gen-3 / Pika Labs  
> **Resolução alvo:** 1080×1920 (vertical, mobile-first) ou 1920×1080 (horizontal, web)  
> **Duração alvo:** 15–45 segundos por exercício  
> **Estilo visual:** Minimalista, fundo neutro, personagem realista, iluminação profissional  
> **Versão:** 1.0 — Abril 2026

---

## 1. Diretrizes Globais de Estilo

Aplicar em TODOS os prompts como prefixo ou sufixo:

```
[ESTILO BASE]
Cinematic quality, 4K resolution, professional gym lighting with soft key light 
and fill light, neutral matte background (light gray #F5F7FA), 
athlete wearing black fitted shorts and white fitted t-shirt, 
barefoot or white athletic shoes, shot from 45-degree angle showing full body, 
slow motion during peak movement phases, text overlay: exercise name in 
clean sans-serif font (white, bottom center), no music required, 
loop-friendly (end frame matches start frame), duration: 20-30 seconds.
```

```
[ESTILO BASE PT-BR para ferramentas que aceitam português]
Qualidade cinemática, 4K, iluminação profissional de estúdio com luz suave, 
fundo liso cinza claro neutro (#F5F7FA), atleta usando roupas esportivas pretas, 
câmera a 45 graus mostrando corpo inteiro, câmera lenta nos momentos de pico, 
texto com nome do exercício em fonte limpa na parte inferior, 
início e fim do vídeo com mesmo frame para looping perfeito, 
duração 20-30 segundos.
```

---

## 2. Prompts por Categoria de Exercício

---

### 📦 CATEGORIA: UPPER BODY (Membros Superiores)

---

#### 2.1 Flexão de Braço (Push-Up)

**Prompt Principal (Sora / RunwayML):**
```
A fit male athlete performing a perfect push-up on a gym mat. 
Starting position: plank with hands shoulder-width apart, body in straight line. 
Camera angle: side view (90 degrees), showing full body alignment. 
Movement: controlled descent until chest nearly touches mat (2 seconds), 
explosive push up (1 second), pause at top (1 second). 
Emphasis on: straight spine, engaged core, controlled breathing visible. 
Slow motion at bottom position. Loop from starting plank position. 
Professional studio lighting, gray background, 1920x1080, 25 seconds.
```

**Variações para gerar:**
```
Variation 1 — Flexão Diamante:
Same as push-up but hands form diamond shape under chest. 
Close-up shot showing hand position, then wide shot showing full movement.

Variation 2 — Flexão Inclinada (pés elevados):
Feet on a 40cm box/bench, hands on floor. Same movement quality.
Camera from slightly elevated angle to show incline.

Variation 3 — Flexão Archer (lateral):
Wide hand stance, alternating weight side to side, one arm nearly straight.
Camera from front 45 degrees showing lateral weight shift.
```

---

#### 2.2 Barra Fixa (Pull-Up)

**Prompt Principal:**
```
Athletic person performing strict pull-ups on a horizontal bar mounted at 2.5m height. 
Starting position: dead hang, arms fully extended, slight hollow body position. 
Movement: controlled pull until chin clears the bar (2 seconds up), 
slow descent to dead hang (3 seconds down). 
Camera: side view showing full range of motion, slight pan up during pull phase. 
Slow motion at top position showing chin above bar. 
No kipping. Professional quality, gray background, 1920x1080.
```

**Variações:**
```
Variation 1 — Barra Supinada (Chin-Up):
Underhand grip (supinated), elbows close to body during pull.
Camera slightly in front showing bicep engagement.

Variation 2 — Barra com Pausa:
2-second pause at top (chin above bar). Emphasize isometric contraction.
Close-up on hands gripping bar, then wide shot.

Variation 3 — Barra Negativa:
Start at top position (chin above bar), slow 5-second descent to dead hang.
Camera tracking downward movement, slow motion throughout.
```

---

#### 2.3 Mergulho em Paralelas (Dip)

**Prompt:**
```
Fit athlete performing parallel bar dips. 
Two parallel bars at hip height, 60cm apart. 
Starting position: arms extended, body vertical, slight forward lean. 
Movement: bend elbows to 90 degrees (chest between bars), 
press back to starting position. 
Focus on: controlled descent, chest slightly forward, 
no shoulder shrugging. 2 repetitions shown clearly.
Camera: 45-degree front angle, full body visible.
```

---

### 🦵 CATEGORIA: LOWER BODY (Membros Inferiores)

---

#### 2.4 Agachamento (Squat)

**Prompt Principal:**
```
Perfect bodyweight squat demonstration. 
Starting position: feet shoulder-width apart, toes slightly turned out 15 degrees.
Movement: controlled descent (3 seconds) until thighs parallel to floor,
knees tracking over toes, chest upright, arms extended forward for balance.
Pause at bottom (1 second), controlled ascent (2 seconds).
Camera: 45-degree front-side view showing knee tracking and depth.
Slow motion during descent. Text overlay: "Agachamento — 3x12-15".
Professional lighting, gray background, 30 seconds, loop.
```

**Variações:**
```
Variation 1 — Agachamento Sumô:
Wide stance (120cm), toes pointed out 45 degrees. 
Camera from front showing inner thigh engagement.

Variation 2 — Pistol Squat (Agachamento Unilateral):
Single leg squat, other leg extended forward. 
Start with assisted version (hand on wall), then full freestanding.
Camera: side view showing full depth.

Variation 3 — Squat Jump:
Explosive jump from squat position. Soft landing shown.
Slow motion during peak jump height.
```

---

#### 2.5 Avanço (Lunge)

**Prompt:**
```
Dynamic lunge exercise on gym mat.
Starting: standing position, feet together.
Movement: step forward 80cm with right leg, lower back knee toward floor
(maintaining 5cm clearance), push back to starting position.
Alternate legs for 3 repetitions each side.
Camera: side view showing 90-degree knee angles.
Emphasis on: upright torso, front knee behind toe line.
30 seconds, slow motion at bottom position.
```

---

#### 2.6 Elevação de Panturrilha (Calf Raise)

**Prompt:**
```
Standing calf raise on slightly elevated surface (2cm edge for full range).
Starting: toes on edge, heels hanging below surface level.
Movement: raise heels maximum height (3 seconds), 
pause at top (2 seconds), controlled descent below platform level (3 seconds).
Camera: side profile showing full ankle range of motion.
Close-up on ankle/foot movement, then wide shot.
```

---

### 🔥 CATEGORIA: CORE (Abdômen e Core)

---

#### 2.7 Prancha (Plank)

**Prompt Principal:**
```
Athlete in perfect plank position on yoga mat.
Position: forearms on mat, elbows under shoulders, 
body in straight diagonal line from heels to head.
Static 30-second hold with focus on perfect form.
Camera slowly rotates 180 degrees showing all angles.
Overlay: timer counting 0-30 seconds in bottom corner.
Emphasis on: neutral spine, engaged glutes, no hip sagging or piking.
Breathing visible through slight chest movement.
```

**Variações:**
```
Variation 1 — Prancha Lateral:
Side plank on forearm, hips stacked, top arm pointing to ceiling.
Camera: front view showing straight body line.

Variation 2 — Prancha com Toque no Ombro:
High plank (hands), alternating shoulder taps while minimizing hip rotation.
Camera: slightly elevated angle showing hip stability.

Variation 3 — Prancha Dinâmica (Up-Down):
Transition from low plank (forearms) to high plank (hands) and back.
Camera: side view.
```

---

#### 2.8 Abdominal Bicicleta (Bicycle Crunch)

**Prompt:**
```
Bicycle crunch exercise on gym mat.
Starting: lying on back, hands behind head, knees bent 90 degrees.
Movement: alternate elbow-to-opposite-knee rotation while extending other leg.
Slow, controlled rotation emphasizing oblique contraction.
NO neck strain — elbows wide, look at ceiling not at knees.
Camera: 45-degree overhead angle showing rotation clearly.
Slow motion on each rotation. 8 repetitions shown.
```

---

#### 2.9 Superman

**Prompt:**
```
Superman exercise (back extension) on mat.
Starting: face down, arms extended overhead, legs straight.
Movement: simultaneously lift arms and legs off floor,
hold peak position 2 seconds, controlled return.
Camera: side view showing parallel lift height.
Emphasis on: squeezing glutes and back at top, no neck extension.
Close-up on facial expression showing effort but no strain.
```

---

### ⚡ CATEGORIA: FULL BODY

---

#### 2.10 Burpee

**Prompt Principal:**
```
Classic burpee performed with perfect form at moderate pace.
Sequence: standing → squat → jump back to plank → 
push-up → jump feet to hands → explosive jump with arms overhead.
Camera: side view, full body visible throughout entire movement.
Clear distinction of each phase with slight slow motion at:
1) plank position 2) push-up bottom 3) peak jump height.
4 complete repetitions. Total duration 25-30 seconds.
No excessive speed — emphasize form over pace.
```

---

#### 2.11 Mountain Climber

**Prompt:**
```
Mountain climbers exercise starting from high plank position.
Movement: alternate driving knees to chest at controlled pace 
(not maximum speed — instructional demo).
Hips level with shoulders throughout, no piking or sagging.
Camera: side view showing hip stability and knee drive range.
Overlay: "Mountain Climber — Core + Cardio".
16 alternating knee drives shown. Slight slow motion.
```

---

#### 2.12 Bear Crawl

**Prompt:**
```
Bear crawl movement on gym mat.
Starting position: hands and knees, knees hovering 5cm from floor (hover position).
Movement: crawl forward 3 meters maintaining hover, 
then crawl backward to starting position.
Camera: side view then following from behind.
Emphasis on: opposite hand-foot coordination, stable spine, 
knees never touching floor.
```

---

## 3. Prompts de Thumbnails (Imagens Estáticas)

Para cada vídeo, gerar 1 thumbnail. Usar Midjourney / DALL-E 3 / Stable Diffusion:

```
[TEMPLATE THUMBNAIL]
Athletic person demonstrating [NOME_EXERCICIO] at peak position,
wearing black athletic wear, light gray clean background (#F5F7FA),
dramatic cinematic lighting with soft shadows, 
Sauvia brand purple gradient overlay (10% opacity) at bottom,
white text "[NOME_EXERCICIO]" in bold sans-serif font bottom center,
difficulty badge top-right corner: green "INICIANTE" / yellow "INTERMEDIÁRIO" / red "AVANÇADO",
professional sports photography style, 1920x1080 for web or 1080x1920 for mobile.
```

**Exemplo completo — Flexão:**
```
Athletic muscular man in perfect push-up top position, 
arms fully extended, body in straight plank line, 
wearing black compression shorts and white fitted t-shirt,
barefoot on gray yoga mat, dramatic side lighting casting clean shadows,
light gray studio background, professional sports photography,
text overlay at bottom "FLEXÃO DE BRAÇO" in Manrope Bold white font,
green badge "INICIANTE" top-right, 
subtle purple gradient at bottom (rgba(124,58,237,0.15)),
1920x1080 resolution.
```

---

## 4. Estrutura da Biblioteca — Categorias e IDs

```json
{
  "categories": [
    {
      "id": "UPPER",
      "name": "Membros Superiores",
      "icon": "💪",
      "exercises": [
        { "id": "UP-001", "name": "Flexão de Braço", "difficulty": "BEGINNER", "duration_sec": 25 },
        { "id": "UP-002", "name": "Flexão Diamante", "difficulty": "INTERMEDIATE", "duration_sec": 25 },
        { "id": "UP-003", "name": "Barra Fixa", "difficulty": "INTERMEDIATE", "duration_sec": 30 },
        { "id": "UP-004", "name": "Barra Supinada", "difficulty": "BEGINNER", "duration_sec": 30 },
        { "id": "UP-005", "name": "Mergulho Paralelas", "difficulty": "INTERMEDIATE", "duration_sec": 25 }
      ]
    },
    {
      "id": "LOWER",
      "name": "Membros Inferiores",
      "icon": "🦵",
      "exercises": [
        { "id": "LO-001", "name": "Agachamento", "difficulty": "BEGINNER", "duration_sec": 30 },
        { "id": "LO-002", "name": "Agachamento Sumô", "difficulty": "BEGINNER", "duration_sec": 25 },
        { "id": "LO-003", "name": "Pistol Squat", "difficulty": "ADVANCED", "duration_sec": 30 },
        { "id": "LO-004", "name": "Avanço", "difficulty": "BEGINNER", "duration_sec": 30 },
        { "id": "LO-005", "name": "Elevação de Panturrilha", "difficulty": "BEGINNER", "duration_sec": 25 }
      ]
    },
    {
      "id": "CORE",
      "name": "Core e Abdômen",
      "icon": "🔥",
      "exercises": [
        { "id": "CO-001", "name": "Prancha", "difficulty": "BEGINNER", "duration_sec": 35 },
        { "id": "CO-002", "name": "Prancha Lateral", "difficulty": "INTERMEDIATE", "duration_sec": 30 },
        { "id": "CO-003", "name": "Abdominal Bicicleta", "difficulty": "INTERMEDIATE", "duration_sec": 25 },
        { "id": "CO-004", "name": "Superman", "difficulty": "BEGINNER", "duration_sec": 25 },
        { "id": "CO-005", "name": "Prancha com Toque no Ombro", "difficulty": "INTERMEDIATE", "duration_sec": 30 }
      ]
    },
    {
      "id": "FULL",
      "name": "Corpo Inteiro",
      "icon": "⚡",
      "exercises": [
        { "id": "FU-001", "name": "Burpee", "difficulty": "ADVANCED", "duration_sec": 30 },
        { "id": "FU-002", "name": "Mountain Climber", "difficulty": "INTERMEDIATE", "duration_sec": 25 },
        { "id": "FU-003", "name": "Bear Crawl", "difficulty": "INTERMEDIATE", "duration_sec": 30 }
      ]
    }
  ]
}
```

---

## 5. Roteiro de Produção IA

### Passo a passo para gerar os vídeos

**Ferramenta recomendada por objetivo:**

| Ferramenta | Melhor para | Custo | Qualidade |
|-----------|-------------|-------|-----------|
| **Sora (OpenAI)** | Vídeos realistas, movimento fluido | ~$0,10/seg | ⭐⭐⭐⭐⭐ |
| **Kling AI** | Melhor custo-benefício, loop | ~$0,03/seg | ⭐⭐⭐⭐ |
| **RunwayML Gen-3** | Controle fino de câmera | ~$0,05/seg | ⭐⭐⭐⭐ |
| **Pika Labs** | Thumbnails animados, baixo custo | ~$0,01/seg | ⭐⭐⭐ |

**Estimativa de custo para gerar todos os 18 exercícios:**
- 18 vídeos × 25s média × $0,03/seg (Kling) = **~$13,50 total**
- 18 thumbnails × $0,05 (DALL-E 3) = **~$0,90 total**
- **Custo total da biblioteca:** ~$15–20

### Ordem de geração (priori por persona)

Para o MVP (Ana Paula + Marcos como personas principais):

**Fase 1 (gerar primeiro — aparecem nos planos do nutri):**
1. UP-001 Flexão de Braço
2. LO-001 Agachamento
3. CO-001 Prancha
4. FU-002 Mountain Climber

**Fase 2 (completar biblioteca básica):**
5-10: Variações das categorias principais

**Fase 3 (pré-lançamento):**
11-18: Exercícios avançados e full body

---

## 6. Metadados para o Banco de Dados

Cada vídeo gerado deve ter estes metadados no PostgreSQL:

```sql
INSERT INTO videos (
  id,           -- UP-001, LO-002, etc.
  title,        -- "Flexão de Braço"
  description,  -- Instrução detalhada de execução
  url,          -- S3 presigned URL
  thumbnail_url,-- S3 URL thumbnail
  category,     -- UPPER | LOWER | CORE | FULL_BODY
  difficulty,   -- BEGINNER | INTERMEDIATE | ADVANCED
  duration_sec, -- 25
  muscles,      -- ARRAY['peito', 'tríceps', 'core']
  equipment,    -- ARRAY[] (vazio = sem equipamento)
  tags,         -- ARRAY['push', 'upper', 'iniciante']
  calories_est, -- Estimativa de calorias em 3 séries
  is_active,    -- true
  created_at    -- NOW()
)
```

---

*Biblioteca de prompts para geração de conteúdo IA — Sauvia v1.0 — Abril 2026*
