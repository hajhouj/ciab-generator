# Générateur PDF CIAB

Une application web moderne pour générer les Cartes d'Identification et d'Accompagnement des Bovins (CIAB) à partir de données Excel.

## Documentation 

### À propos

Le Générateur PDF CIAB est une application web qui vous permet de créer facilement et avec précision des Cartes d'Identification et d'Accompagnement des Bovins (CIAB) à partir de vos données Excel. Ces cartes sont essentielles dans le cadre du système national d'identification et de traçabilité animale au Maroc.

### Fonctionnalités

- **Traitement 100% côté client** : Toutes vos données sont traitées localement dans votre navigateur, aucune information n'est envoyée à un serveur.
- **Génération précise** : Les positions des éléments sont calibrées en millimètres pour une conformité exacte avec les exigences officielles.
- **Personnalisation** : Choisissez entre générer des documents de nouvelle identification ou des duplicatas.
- **Interface intuitive** : Design moderne et responsive pour une utilisation facile sur tous les appareils.

### Installation et démarrage

1. **Prérequis**
   - Node.js 16+ installé sur votre système
   - Gestionnaire de paquets npm

2. **Installation**
   ```bash
   # Cloner ce dépôt
   git clone [URL-du-dépôt]
   
   # Accéder au répertoire du projet
   cd astro-ciab-printer
   
   # Installer les dépendances
   npm install
   ```

3. **Démarrer l'application en mode développement**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:4321` (ou un autre port si celui-ci est déjà utilisé).

4. **Construire pour la production**
   ```bash
   npm run build
   ```
   Les fichiers de production seront générés dans le dossier `dist/`.

5. **Prévisualiser la version de production**
   ```bash
   npm run preview
   ```

### Utilisation

1. Ouvrez l'application dans votre navigateur
2. Sélectionnez un fichier Excel contenant vos données de bovins
3. Choisissez le type de document à générer (Nouvelle Identification ou Duplicata)
4. Cliquez sur "Générer le PDF"
5. Téléchargez et enregistrez le document généré

### Format du fichier Excel

Votre fichier Excel doit contenir les colonnes suivantes:
- `NNI` - Numéro National d'Identification
- `NomProprietaire` - Nom du propriétaire
- `NumPieceIdentite` - Numéro de pièce d'identité
- `AdresseProprietaire` - Adresse du propriétaire
- `Race` - Race de l'animal
- `DNaissance` - Date de naissance de l'animal
- `Sexe` - Sexe de l'animal

### Déploiement

L'application peut être déployée sur n'importe quel service d'hébergement statique:
- Netlify
- Vercel
- GitHub Pages
- Ou tout autre service d'hébergement statique

## Technologies

- [Astro](https://astro.build/) - Framework web moderne
- [React](https://reactjs.org/) - Bibliothèque UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [pdf-lib](https://pdf-lib.js.org/) - Bibliothèque de génération PDF
- [xlsx](https://sheetjs.com/) - Bibliothèque de traitement Excel

