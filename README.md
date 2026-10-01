# 🩹 SecoursQuiz

**SecoursQuiz** est un site web interactif consacré à l'apprentissage et à la révision des gestes de premiers secours.

Le projet propose **20 thèmes** et **400 questions**, avec correction immédiate, explications, suivi de progression et un mode Quiz Express. L'interface est responsive et utilise une identité visuelle moderne basée sur des dégradés de rouge, du blanc et des tons neutres.

> [!IMPORTANT]
> SecoursQuiz est un outil pédagogique. Il ne remplace pas une formation pratique aux premiers secours ni les consignes d'un professionnel de santé ou des services d'urgence.

## ✨ Fonctionnalités

- 20 thèmes de premiers secours
- 20 questions par thème, soit 400 questions au total
- 4 propositions de réponse par question
- correction immédiate après chaque réponse
- explication associée à chaque correction
- score final et pourcentage de réussite
- sauvegarde locale des meilleurs scores avec `localStorage`
- suivi de la progression par thème
- Quiz Express de 20 questions aléatoires
- ordre des questions mélangé à chaque partie
- interface responsive pour ordinateur, tablette et smartphone
- favicon intégré au site
- chargement différé des banques de questions pour améliorer les performances
- aucune dépendance JavaScript ni framework requis

## 📚 Les 20 thèmes

| # | Thème |
|---:|---|
| 1 | Protéger & alerter |
| 2 | Hémorragies |
| 3 | Étouffement |
| 4 | Arrêt cardiaque & RCP |
| 5 | Défibrillateur automatisé externe (DAE) |
| 6 | Inconscience & PLS |
| 7 | Malaises & AVC |
| 8 | Plaies |
| 9 | Brûlures |
| 10 | Traumatismes |
| 11 | Intoxications & empoisonnements |
| 12 | Monoxyde de carbone & fumées |
| 13 | Noyade & milieu aquatique |
| 14 | Chaleur, froid & hypothermie |
| 15 | Accidents électriques |
| 16 | Convulsions & épilepsie |
| 17 | Allergies sévères & anaphylaxie |
| 18 | Enfant & nourrisson |
| 19 | Accidents de la route |
| 20 | Piqûres, morsures & animaux |

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure et contenu du site |
| CSS3 | Mise en page, responsive et animations |
| JavaScript | Logique des quiz, scores et chargement des questions |
| LocalStorage | Sauvegarde de la progression dans le navigateur |

Le projet n'utilise ni React, ni Vue, ni Angular, ni bibliothèque JavaScript externe.

## 📁 Structure du projet

```text
secours-quiz/
├── index.html
├── styles.css
├── app.js
├── README.md
└── data/
    ├── proteger-alerter.js
    ├── hemorragies.js
    ├── etouffement.js
    ├── arret-cardiaque.js
    ├── dae.js
    ├── inconscience-pls.js
    ├── malaises-avc.js
    ├── plaies.js
    ├── brulures.js
    ├── traumatismes.js
    ├── intoxications-empoisonnements.js
    ├── monoxyde-fumees.js
    ├── noyade-milieu-aquatique.js
    ├── chaleur-froid-hypothermie.js
    ├── accidents-electriques.js
    ├── convulsions-epilepsie.js
    ├── allergies-anaphylaxie.js
    ├── enfant-nourrisson.js
    ├── accidents-route.js
    └── piqures-morsures-animaux.js
```

## 🚀 Lancer le projet en local

Le site est entièrement statique. Cependant, les fichiers de questions sont chargés dynamiquement : il est donc préférable de le lancer avec un petit serveur local plutôt qu'en ouvrant directement `index.html` avec le protocole `file://`.

### Avec VS Code et Live Server

1. Ouvrez le dossier du projet dans Visual Studio Code.
2. Installez l'extension **Live Server** si nécessaire.
3. Faites un clic droit sur `index.html`.
4. Cliquez sur **Open with Live Server**.

Le site s'ouvrira alors dans votre navigateur.

### Avec Python

Si Python est installé :

```bash
python3 -m http.server 8000
```

Puis ouvrez :

```text
http://localhost:8000
```

## 🌐 Publier le site avec GitHub Pages

Après avoir envoyé le projet sur GitHub :

1. Ouvrez le dépôt GitHub.
2. Allez dans **Settings**.
3. Ouvrez **Pages**.
4. Dans **Build and deployment**, sélectionnez **Deploy from a branch**.
5. Choisissez la branche `main`.
6. Choisissez le dossier `/ (root)`.
7. Cliquez sur **Save**.

GitHub publiera ensuite le site à une adresse de la forme :

```text
https://VOTRE-UTILISATEUR.github.io/secours-quiz/
```

## ⚡ Optimisations

La version actuelle a été pensée pour limiter au maximum le poids et le temps de chargement :

- les 400 questions ne sont pas chargées au démarrage ;
- seul le fichier correspondant au thème sélectionné est récupéré ;
- le Quiz Express charge les banques nécessaires uniquement lorsqu'il est lancé ;
- aucune police web externe n'est requise ;
- le favicon est intégré directement au document ;
- les données dupliquées ont été supprimées ;
- le JavaScript utilise la délégation d'événements ;
- certaines sections hors écran utilisent `content-visibility` lorsque le navigateur le permet.

## 💾 Sauvegarde des scores

La progression est enregistrée avec `localStorage` directement dans le navigateur de l'utilisateur.

Cela permet de conserver les meilleurs scores et les thèmes terminés après la fermeture de la page. En revanche, ces données ne sont pas synchronisées entre plusieurs appareils et peuvent être supprimées si l'utilisateur efface les données de son navigateur.

## 🆘 Numéros d'urgence en France

| Numéro | Service |
|---:|---|
| **15** | SAMU |
| **18** | Sapeurs-pompiers |
| **112** | Numéro d'urgence européen |
| **114** | Urgences par SMS / application pour les personnes sourdes, malentendantes, sourdaveugles ou aphasiques |

En situation réelle d'urgence, contactez immédiatement les services compétents.

## 📖 Références pédagogiques

Le contenu du quiz est conçu à partir de recommandations françaises de premiers secours, notamment les références techniques nationales de la Sécurité civile.

Pour une utilisation pédagogique ou professionnelle, les questions doivent toujours être confrontées aux recommandations officielles les plus récentes.

## 🔮 Évolutions possibles

- comptes utilisateurs
- synchronisation des résultats en ligne
- niveaux Débutant, Intermédiaire et Expert
- mode examen chronométré
- badges et succès
- statistiques détaillées par thème
- historique des réponses
- classement
- interface d'administration des questions
- illustrations pédagogiques des gestes
- mode sombre
- application mobile ou PWA

## 👤 Auteur

Projet développé par **Teddy Sibu**.

---

**SecoursQuiz — Apprendre, réviser et tester ses connaissances en premiers secours.**
