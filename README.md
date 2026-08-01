# M I K Developers — Portfolio Website

Personal portfolio site for M. Ishfaq Khan (M I K Developers) — Frontend & WordPress Developer.

## Folder structure

```
M I K-Developers/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── images/
        ├── logo.png
        └── khan-traders.jpg
```

## How to run

1. Unzip/open the `M I K-Developers` folder in VS Code.
2. Install the **Live Server** extension (if you don't already have it).
3. Right-click `index.html` → **Open with Live Server**.
   - Or just double-click `index.html` to open it directly in a browser — it works without a server too, since everything is plain HTML/CSS/JS with relative paths.

## Sections included

- Hero — intro, tagline, "code card" visual
- About — bio + quick stats
- Skills — HTML, CSS, JavaScript, Bootstrap, WordPress, Figma
- Services — Clean Code, Responsive Design, High Performance, Modern Design, Secure & Reliable, Maintenance
- Projects — Khan Traders & Al Shahbaaz Zarai Allaat (with screenshot)
- Contact — email: balochkhanzada792@gmail.com

## Customizing

- **Add a project**: duplicate a `.project-card` block in `index.html` under `#projects`, and drop a new screenshot into `assets/images/`.
- **Colors**: the whole theme is driven by two colors used throughout `style.css` — background `#0F172A` and accent `#3B82F6`. Find-and-replace those to re-theme everything at once.
- **Logo**: swap `assets/images/logo.png` with your own file of the same name to update it everywhere (navbar, footer, favicon).
