# Images Directory

Ce dossier contient toutes les images utilisées dans le portfolio.

## Structure

```
images/
├── logo.svg                 # Logo Alex Spencer (61x32px)
├── favicon-32x32.png        # Favicon du site
├── hero-mockup.jpg          # Image hero de la page d'accueil (~540x600px)
├── profile.jpg              # Photo de profil (~350x400px)
└── projects/
    ├── bookmark-preview.jpg  # Aperçu projet Bookmark
    ├── manage-preview.jpg    # Aperçu projet Manage
    ├── insure-preview.jpg    # Aperçu projet Insure
    └── fylo-preview.jpg      # Aperçu projet Fylo
```

## Spécifications des Images

### Logo
- **Fichier**: `logo.svg`
- **Dimensions**: 61x32px
- **Format**: SVG
- **Couleur**: #33323D (avec version blanche pour le footer)

### Favicon
- **Fichier**: `favicon-32x32.png`
- **Dimensions**: 32x32px
- **Format**: PNG avec transparence

### Hero Image
- **Fichier**: `hero-mockup.jpg`
- **Dimensions recommandées**: ~540x600px
- **Format**: JPG optimisé
- **Poids max**: 200KB

### Photo de Profil
- **Fichier**: `profile.jpg`
- **Dimensions recommandées**: ~350x400px
- **Format**: JPG optimisé
- **Poids max**: 100KB

### Images de Projets
- **Dimensions recommandées**: ~540x400px
- **Format**: JPG optimisé
- **Poids max**: 150KB chacune

## Optimisation des Images

Pour optimiser les images, utilisez un des outils suivants :

1. **En ligne** :
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [Compressor.io](https://compressor.io/)

2. **Ligne de commande** :
   ```bash
   # Avec ImageMagick
   convert input.jpg -quality 85 -resize 540x output.jpg
   
   # Avec cwebp (pour WebP)
   cwebp -q 80 input.jpg -o output.webp
   ```

## Format Responsive

Pour une meilleure performance, envisagez d'utiliser :

1. **Formats modernes** : WebP avec fallback JPG
2. **Images responsive** : srcset et sizes
3. **Lazy loading** : Attribut loading="lazy"

Exemple :
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

## Notes

- Toutes les images doivent avoir un texte alternatif (`alt`) descriptif
- Utilisez des images optimisées pour le web (compression)
- Prévoyez des versions @2x pour les écrans Retina
- Gardez les originaux dans un dossier séparé (non versionné)
