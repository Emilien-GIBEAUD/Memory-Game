# Memory-Game

Page accessible ici : https://emilien-gibeaud.github.io/Memory-Game/

Pour un lancement local à l'aide de docker :
- Avoir docker d'installé

- Cloner ce dépôt git

- Création de l'image => se placer dans le dossier source de ce fichier et lancer dans un terminal :
docker build -t memory .

- Création du conteneur, lancer dans un terminal :
docker run -d -p 8080:80 --name memory memory

- Le projet est accessible sur : http://localhost:8080/