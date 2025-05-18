# Générateur PDF CIAB

![CIAB Generator](/public/ciab-preview.svg)

Une application web moderne pour générer les Cartes d'Identification et d'Accompagnement des Bovins (CIAB) à partir de données Excel.

## 🇫🇷 Documentation en Français

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

## 🇬🇧 English Documentation

### About

The CIAB PDF Generator is a web application that allows you to easily and accurately create Bovine Identification and Accompaniment Cards (CIAB) from your Excel data. These cards are essential as part of the national animal identification and traceability system in Morocco.

### Features

- **100% Client-side Processing**: All your data is processed locally in your browser, no information is sent to any server.
- **Precise Generation**: Element positions are calibrated in millimeters for exact compliance with official requirements.
- **Customization**: Choose between generating new identification documents or duplicates.
- **Intuitive Interface**: Modern and responsive design for easy use on all devices.

### Installation and Setup

1. **Prerequisites**
   - Node.js 16+ installed on your system
   - npm package manager

2. **Installation**
   ```bash
   # Clone this repository
   git clone [repository-URL]
   
   # Navigate to the project directory
   cd astro-ciab-printer
   
   # Install dependencies
   npm install
   ```

3. **Start the application in development mode**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:4321` (or another port if this one is already in use).

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be generated in the `dist/` folder.

5. **Preview the production version**
   ```bash
   npm run preview
   ```

### Usage

1. Open the application in your browser
2. Select an Excel file containing your bovine data
3. Choose the type of document to generate (New Identification or Duplicate)
4. Click on "Generate PDF"
5. Download and save the generated document

### Excel File Format

Your Excel file should contain the following columns:
- `NNI` - National Identification Number
- `NomProprietaire` - Owner's name
- `NumPieceIdentite` - ID document number
- `AdresseProprietaire` - Owner's address
- `Race` - Animal breed
- `DNaissance` - Animal date of birth
- `Sexe` - Animal gender

### Deployment

The application can be deployed on any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Or any other static hosting service

## Technologies

- [Astro](https://astro.build/) - Framework web moderne
- [React](https://reactjs.org/) - Bibliothèque UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [pdf-lib](https://pdf-lib.js.org/) - Bibliothèque de génération PDF
- [xlsx](https://sheetjs.com/) - Bibliothèque de traitement Excel

