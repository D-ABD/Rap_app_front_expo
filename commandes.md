# My-Evol-UI

## Commandes GIT

# Initialiser le dépôt Git
git init
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/D-ABD/My-Evol-UI.git
git push -u origin main


# Ajouter tous les fichiers modifiés, creer comit et pousser les changements
git add .
git commit -m "Description des changements effectués"
git push origin main

# Lancer l'app en mode dev
npx expo start
npx expo start -c
