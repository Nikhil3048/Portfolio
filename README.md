#  Nikhil Raj — Portfolio Website

A modern, dark-mode portfolio website built with **pure HTML, CSS, and JavaScript** (zero frameworks).

## 🚀 Quick Start

1. Clone or download this repository
2. Open `index.html` in your browser (or deploy to GitHub Pages / Netlify)
3. That's it — no build step required!

## 📁 File Structure

```
portfolio/
├── index.html              # Main HTML file (single page)
├── css/
│   ├── style.css           # Design tokens, components, layouts
│   ├── animations.css      # Keyframes, scroll reveal, cursor
│   └── responsive.css      # Mobile-first media queries
├── js/
│   ├── main.js             # Navigation, loader, scroll, cursor
│   ├── particles.js        # Canvas particle animation (hero)
│   ├── animations.js       # IntersectionObserver + typewriter
│   └── contact.js          # EmailJS contact form handler
├── assets/
│   ├── avatar.png          # Profile photo
│   ├── resume.pdf          # Downloadable resume (add your own!)
│   └── projects/           # Project screenshots
└── README.md
```

## ✨ Features

- **Hero**: Animated particle canvas, rotating avatar ring, typewriter effect
- **About**: Two-column layout with highlight cards
- **Skills**: Animated progress bars (IntersectionObserver), tech icon grid, soft skills pills
- **Projects**: Filterable card grid with hover effects and GitHub links
- **Education**: Alternating vertical timeline (Class X → XII → BTech → BS)
- **Resume**: Download button + view online (add your PDF to `assets/resume.pdf`)
- **Blog**: Card grid for posts/insights
- **Contact**: EmailJS-powered form with validation + social links
- **Custom Cursor**: Smooth trailing cursor (desktop only)
- **Scroll Progress Bar**: Top progress indicator
- **Particle Background**: Interactive canvas with mouse repulsion

## 📧 Setting Up the Contact Form

1. Sign up at [EmailJS.com](https://emailjs.com) (free tier: 200 emails/month)
2. Create a service and email template
3. Update `js/contact.js` with your credentials:

```js
const EMAILJS_CONFIG = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key',
};
```

## 🌐 Deployment

### GitHub Pages
1. Push to a GitHub repository
2. Go to Settings → Pages → Source: `main` branch, `/ (root)` folder
3. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo for continuous deployment

## 🎨 Customization

All design tokens are in `css/style.css` under `:root`. Change colors, fonts, and spacing easily:

```css
:root {
  --clr-neon-blue: #00d4ff;    /* Primary accent */
  --clr-neon-purple: #a855f7;  /* Secondary accent */
  --clr-bg: #060612;           /* Background */
  /* ... */
}
```

## 📄 Resume

Replace `assets/resume.pdf` with your actual resume PDF. The download button and view link will both work automatically.

## ♿ Accessibility

- Skip-to-main-content link
- Full ARIA labels and roles
- `prefers-reduced-motion` support
- Focus-visible keyboard navigation
- Screen reader-friendly structure

## 📊 Performance Tips

- Images are lazy-loaded (`loading="lazy"`) except the hero avatar
- Scripts use `defer` attribute
- Custom cursor hidden on touch devices
- Particle count optimized for smooth 60fps

---

Made with ❤️ by ** Nikhil Raj** · [GitHub](https://github.com/Nikhilraj) · [LinkedIn](https://linkedin.com/in/Nikhilraj)
