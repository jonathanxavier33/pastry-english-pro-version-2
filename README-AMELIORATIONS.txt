PASTRY ENGLISH PRO — VERSION AMÉLIORÉE

CONTENU
- Interface mobile modernisée avec palette prune, rose et or.
- Nouvelle icône baguette dorée sur fond noir (icône web, Android et Apple).
- Les QCM affichent maintenant une explication après la réponse et ne passent plus automatiquement à la question suivante.
- Le bouton de question suivante reste bloqué tant qu'aucune réponse n'a été choisie.
- La navigation clavier ne permet plus de sélectionner une proposition inexistante.
- Gestion du stockage plus robuste si le navigateur refuse l'enregistrement.
- Cache du service worker versionné en v4 pour forcer la mise à jour des ressources.
- Avertissement plus clair concernant la sécurité de la clé API Gemini.

INSTALLATION / MISE À JOUR
1. Décompressez le dossier complet pastry-english-pro.
2. Publiez le dossier sur un hébergement HTTPS (par exemple Netlify ou Vercel). L'installation PWA ne fonctionne pas correctement en ouvrant simplement index.html comme un fichier local.
3. Sur Android, ouvrez l'URL dans Chrome puis menu ⋮ > Installer l'application ou Ajouter à l'écran d'accueil.
4. Sur iPhone, ouvrez l'URL dans Safari > Partager > Sur l'écran d'accueil.
5. Si une ancienne icône persiste, supprimez l'ancien raccourci, fermez le navigateur puis recréez le raccourci après avoir ouvert la nouvelle version en ligne. Les navigateurs peuvent conserver les anciennes icônes en cache.

SÉCURITÉ
La clé Gemini est utilisée depuis le navigateur et stockée localement. Cela convient à un usage individuel prudent, mais pas à une application publique multi-utilisateurs. Pour diffuser ou commercialiser l'application, placez les appels IA derrière un serveur et gardez la clé API côté serveur.

VÉRIFICATIONS EFFECTUÉES
- Syntaxe JavaScript vérifiée avec Node.js pour app.js, core.js, exam.js et sw.js.
- JSON du manifeste vérifié.
- Présence et dimensions des icônes vérifiées.
- Tous les fichiers listés dans le précache du service worker existent.
- Une capture navigateur automatisée a été tentée, mais le navigateur de test n'a pas terminé son lancement dans cet environnement ; aucun test visuel complet sur appareil réel n'est donc revendiqué.
