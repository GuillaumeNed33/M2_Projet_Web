# Projet Programmation Web - M2 Informatique

# Description
Cette application permet aux utilisateurs de composer une liste de films.
Ils peuvent ajouter leurs films à la main dans l'application, ou bien exploiter les données de l'API OMDB pour cela.

**OMDB** : [http://www.omdbapi.com/][1]  
**API key** : ed0805fe

## Technologies
**Front :** [React][2] / [Next.js][3]  
**Backend :** [NodeJS][4] ([ExpressJS][5])  
**Base de données :** [MongoDB][6]  

## Manuel d'installation

### Configuration par défaut

Par défaut l'application, est configurée pour fonctionner sur heroku.  
La base de données MongoDB est hebergé sur MongoAtlas. 
Voici les liens vers l'application et vers l'api :

* Front : [https://app-movietime-front.herokuapp.com/]()
* Back  : [https://app-movietime-back.herokuapp.com/]()

### Avec Docker

Pour utiliser la configuration de docker vous devrez effectuer quelques changements :
* Commentez la **ligne 8** du fichier `back-node/.env`
* Décommentez la **ligne 5** du fichier `back-node/.env`
* Commentez la **ligne 2** du fichier `front-end/.env`
* Décommentez la **ligne 1** du fichier `front-end/.env`

Ensuite, vous pourrez executer la commande : 
    
    $ docker-compose up -d
    
Les ports du front, du back et de la base de données sont modifiables dans le fichier `.env`.
L'application est disponible à l'adresse [localhost:3000](localhost:3000) !
    
### Sans Docker, en local
Pour utiliser la configuration locale vous devrez effectuer quelques changements :
* Commentez la **ligne 8** du fichier `back-node/.env`
* Décommentez la **ligne 2** du fichier `back-node/.env`
* Commentez la **ligne 2** du fichier `front-end/.env`
* Décommentez la **ligne 1** du fichier `front-end/.env`

On suppose que vous possédez sur votre machine un SGBD MongoDB actif.  
Dans le fichier `back-node/.env`, commentez la ligne 5 et décommentez la ligne 2.  
Ensuite, lancez le back end à l'adresse [localhost:4000](localhost:4000) :

    $ cd back-node
    $ npm install
    $ npm start 
    
Enfin, lancez le front end à l'adresse [localhost:3000](localhost:3000) :

    $ cd front-end
    $ npm install
    $ npm run build 
    $ npm start 
    
## L'Équipe 
* Guillaume NEDELEC
* Florian LAJOINIE 

[1]: http://www.omdbapi.com/
[2]: https://fr.reactjs.org/
[3]: https://nextjs.org/
[4]: https://nodejs.org/en/
[5]: https://expressjs.com/fr/
[6]: https://www.mongodb.com/fr
