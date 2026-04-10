# Landing Pages Documentation

> Two high-converting landing pages for different audiences

## Overview

Two complete landing pages have been created using the **Glassmorphism + Gradient Modern** design style, perfectly aligned with the Sauvia design system. Both pages feature:

- ✅ Animated background blobs
- ✅ Smooth scroll animations with Framer Motion
- ✅ Responsive design (mobile-first)
- ✅ Conversion-optimized CTAs
- ✅ Social proof sections
- ✅ FAQ sections
- ✅ Pricing/Features showcases

## Landing Pages

### 1. Nutritionist Landing Page (B2B)
**URL:** `/landing-nutritionist`  
**Target Audience:** Nutritionists, dietitians, and nutrition clinics  
**Goal:** Convert professionals into paying customers

#### Design Style: Glassmorphism + Corporate Professional
- **Color Palette**: Primary green dominant with orange accents
- **Emotional Quality**: Authority, trust, professionalism
- **Visual Hierarchy**: Clean, data-driven, results-focused

#### Copy Strategy (B2B)

**Headline Focus:**
- Business growth and profitability
- Time savings and efficiency
- Professional empowerment

**Value Propositions:**
1. **Gestão Completa** - All-in-one practice management
2. **Agenda Inteligente** - Smart scheduling to reduce no-shows
3. **Planos Automatizados** - Automated meal planning
4. **Comunicação Integrada** - Integrated patient communication
5. **Métricas e Evolução** - Progress tracking dashboards
6. **LGPD Compliant** - Full data privacy compliance

**Key Messaging:**
- "Transforme Sua Prática em um Negócio Altamente Lucrativo"
- "Atenda mais pacientes em menos tempo"
- "Redu faltas em até 60%"
- "Aumente seu faturamento"

**Social Proof:**
- 2,500+ active nutritionists
- 150K+ patients served
- 94% satisfaction rate
- 3x productivity increase
- Professional testimonials with specific results

**Pricing Tiers:**
- **Starter**: R$ 97/mês (up to 30 patients)
- **Professional**: R$ 197/mês (up to 100 patients) - Most Popular
- **Enterprise**: R$ 397/mês (unlimited, multi-user)

#### Sections Structure:
1. **Hero** - Bold value proposition with animated blobs
2. **Stats Bar** - Key metrics at a glance
3. **Features Grid** - 6 core features with icons
4. **Benefits** - Left-right layout with floating cards
5. **Testimonials** - 3-column grid with ratings
6. **Pricing** - 3-tier pricing with highlighted popular plan
7. **FAQ** - Common questions answered
8. **Final CTA** - Conversion-focused call to action
9. **Footer** - Brand and copyright

---

### 2. Client/Patient Landing Page (B2C)
**URL:** `/landing-client`  
**Target Audience:** End-users seeking nutrition guidance  
**Goal:** Drive app downloads and sign-ups

#### Design Style: Glassmorphism + Gradient Modern + Organic
- **Color Palette**: Orange secondary dominant with green primary
- **Emotional Quality**: Warmth, accessibility, health, transformation
- **Visual Hierarchy**: Friendly, approachable, aspirational

#### Copy Strategy (B2C)

**Headline Focus:**
- Personal health and transformation
- Ease of use and accessibility
- Support and guidance

**Value Propositions:**
1. **Acesse de Qualquer Lugar** - Mobile access to meal plans
2. **Fale Direto Com Seu Nutricionista** - Direct chat with nutritionist
3. **Acompanhe Sua Evolução** - Visual progress tracking
4. **Receitas Práticas** - Healthy, delicious recipes
5. **Agende Facilmente** - Easy appointment scheduling
6. **Dados Protegidos** - Privacy and security

**Key Messaging:**
- "Sua Jornada Para Uma Vida Mais Saudável Começa Aqui"
- "Plano alimentar 100% personalizado"
- "Acompanhamento contínuo entre consultas"
- "3x mais chances de alcançar seus objetivos"

**Social Proof:**
- 50K+ active patients
- 95% plan adherence rate
- 4.9★ average rating
- 3x better results
- Patient success stories with specific outcomes

**How It Works:**
1. Find your nutritionist
2. Receive personalized plan
3. Follow and track progress
4. Achieve your goals

#### Sections Structure:
1. **Hero** - Emotional transformation message
2. **Stats Bar** - User-centric metrics
3. **Features Grid** - 6 patient-facing features
4. **Benefits** - Health outcomes focus
5. **How It Works** - 4-step process
6. **Testimonials** - Success stories
7. **FAQ** - Patient concerns addressed
8. **Final CTA** - App download buttons (iOS + Android)
9. **Footer** - Brand and copyright

---

## Design System Implementation

### Color Usage

#### Nutritionist Page (B2B)
- **Hero Background**: `from-primary via-primary-dark to-secondary`
- **CTAs**: Secondary (white on green) for professionalism
- **Sections**: Alternating white and surface gradients
- **Accents**: Orange for urgency and highlights

#### Client Page (B2C)
- **Hero Background**: `from-secondary via-primary to-primary-dark`
- **CTAs**: Secondary (warm orange/green blend)
- **Sections**: Warm surface gradients
- **Accents**: Orange for energy and enthusiasm

### Typography

```tsx
// Display font for headings
font-display: Manrope

// Body text
font-body: Plus Jakarta Sans

// Sizes
Hero: text-4xl sm:text-5xl lg:text-6xl
H2: text-3xl lg:text-4xl
H3: text-xl
Body: text-lg - text-xl
```

### Animations

#### Background Blobs
```tsx
<motion.div
  className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl"
  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
  transition={{ duration: 20, repeat: Infinity }}
/>
```

#### Scroll Reveal
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
>
```

#### Floating Cards
```tsx
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
>
```

### Glassmorphism Effects

```tsx
// Navigation and overlays
className="bg-white/20 backdrop-blur-sm"

// Cards on colored backgrounds
className="glass shadow-md"
```

## Conversion Optimization

### B2B (Nutritionists)
1. **Trust Signals**: Stats, testimonials, compliance badges
2. **Risk Reversal**: "14 days free", "No credit card", "Cancel anytime"
3. **ROI Focus**: Specific numbers (60% reduction, 40% more patients)
4. **Professional Tone**: Business-oriented language
5. **Pricing Clarity**: Feature comparison across tiers

### B2C (Clients)
1. **Emotional Appeal**: Transformation stories, health focus
2. **Ease of Use**: "Simple", "Easy", "Automatic" messaging
3. **Social Proof**: Success stories, high ratings
4. **Free Value**: Emphasize free app download
5. **Dual CTAs**: iOS and Android buttons

## Performance Considerations

### Image Optimization
- Use Next.js `<Image>` component for production
- Implement lazy loading for below-fold content
- Use WebP format for better compression

### Animation Performance
- GPU-accelerated transforms (scale, rotate, translate)
- Limited concurrent animations
- Reduced motion support for accessibility

### Code Splitting
- Each landing page is a separate route
- Framer Motion loaded only on these pages
- Icons tree-shaken automatically

## SEO Optimization

### Meta Tags (Add to layout)
```tsx
export const metadata = {
  title: 'Sauvia - CRM para Nutricionistas | Transforme Sua Prática',
  description: 'A plataforma #1 para nutricionistas no Brasil. Gestão completa de pacientes, planos alimentares e consultas online.',
  keywords: 'CRM nutricionista, gestão de pacientes, planos alimentares, teleconsulta',
};
```

### Structured Data
Add JSON-LD for:
- Organization
- Product/Service
- Reviews/Testimonials
- FAQ

## A/B Testing Recommendations

### B2B Page
1. **Hero CTA**: "Comece Grátis" vs "Agende Demo"
2. **Pricing Display**: Monthly vs Annual (with discount)
3. **Testimonial Order**: Rotate based on visitor segment

### B2C Page
1. **Hero CTA**: "Baixar App" vs "Ver Como Funciona"
2. **Stats Position**: Above vs below fold
3. **Social Proof**: Video testimonials vs text

## Customization Guide

### Changing Colors
```tsx
// B2B - Professional, trustworthy
bg-gradient-to-br from-primary via-primary-dark to-secondary

// B2C - warm, energetic  
bg-gradient-to-br from-secondary via-primary to-primary-dark
```

### Updating Copy
1. Edit the component data objects (features, testimonials, etc.)
2. Maintain the same structure for animations to work
3. Keep character counts similar for layout consistency

### Adding Sections
1. Create new section component
2. Add Framer Motion animations
3. Maintain consistent spacing (py-20 lg:py-32)

## Running the Pages

```bash
# Start development server
cd apps/web
pnpm dev

# Visit pages
http://localhost:3000/landing-nutritionist
http://localhost:3000/landing-client
```

## Future Enhancements

### Interactive Elements
- Quiz: "Qual plano é ideal para você?"
- ROI Calculator for nutritionists
- Live chat widget
- Video testimonials

### Personalization
- Dynamic content based on traffic source
- Geo-location for local nutritionists
- Language variants (EN, ES)

### Integration
- Email capture → Mailchimp/ActiveCampaign
- Analytics events for all CTA clicks
- Heat mapping for scroll depth
- Conversion tracking

### Accessibility
- Add `prefers-reduced-motion` checks
- Improve keyboard navigation
- Add ARIA labels
- Ensure color contrast ratios

---

**Created:** March 2024  
**Design Style:** Glassmorphism + Gradient Modern  
**Framework:** Next.js 15 + React 19 + Tailwind CSS v4 + Framer Motion  
**Status:** Production Ready
