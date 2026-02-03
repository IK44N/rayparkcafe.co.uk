# Ray Park Café Website

An elegant, café-themed website showcasing Ray Park Café's leaflet designs with a warm, editorial aesthetic.

## Getting Started

1. **Run the development server:**
   ```bash
   cd rayparkcafe
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

2. **Add your leaflet images:**
   - Place your leaflet images in the `public/` folder
   - Name them `leaflet-1.jpg` and `leaflet-2.jpg` (or update the paths in `app/page.tsx`)
   - Recommended size: 1200x1600px or similar portrait orientation
   - Once added, uncomment the `<Image>` components in `app/page.tsx` (around lines 36-45 and 66-74)

3. **Customize:**
   - Edit text in `app/page.tsx` (café name, description, etc.)
   - Adjust colors in `app/globals.css` (CSS variables at lines 5-9)
   - Add more leaflet sections by copying the existing leaflet containers

## Building for Production

```bash
npm run build
npm start
```

## Future: Backend for Hygiene Documents

The Next.js framework is already set up to handle backend routes when you're ready to add the compliance documentation system. This will be added in the `/app/api` directory.

## Design Features

- **Typography**: Playfair Display (serif) for elegant headers, Lato for body text
- **Color Palette**: Warm cream (#FAF7F2), espresso brown (#2D2520), terracotta accent (#C8856A)
- **Aesthetic**: Editorial café style - sophisticated but approachable
- **Animations**: Smooth fade-in effects, hover interactions on leaflet cards
- **Effects**: Subtle paper texture overlay, soft shadows, elegant transitions

---

Built with Next.js 15, React, TypeScript, and Tailwind CSS.
