# TeissIA

Mini-app PWA humoristique en vanilla HTML/CSS/JS qui simule une analyse ultra sérieuse des préférences en sirop.

## Lancer localement

### Option rapide
1. Télécharger/cloner ce dépôt.
2. Ouvrir `index.html` directement dans un navigateur mobile ou desktop.

### Option recommandée (serveur local)
Certains navigateurs gèrent mieux le manifest/PWA via HTTP local.

```bash
python3 -m http.server 8080
```

Puis ouvrir : `http://localhost:8080`

## Publier sur GitHub Pages

1. Push le projet sur GitHub.
2. Dans le repo GitHub : **Settings** → **Pages**.
3. Dans **Build and deployment** :
   - Source : `Deploy from a branch`
   - Branch : `main` (ou votre branche de publication), dossier `/root`
4. Sauvegarder.
5. Attendre l’URL de publication (exemple : `https://<user>.github.io/<repo>/`).

## Installer la PWA sur iPhone (Safari)

1. Ouvrir l’URL de l’app dans **Safari**.
2. Appuyer sur le bouton **Partager** (carré + flèche).
3. Choisir **Sur l’écran d’accueil**.
4. Confirmer le nom “TeissIA” puis **Ajouter**.

L’app sera installée comme une web app autonome depuis l’écran d’accueil.
