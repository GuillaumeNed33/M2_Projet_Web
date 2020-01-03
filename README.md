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

### Avec Docker
Executez la commande : 
    
    $ docker-compose up -d
    
Les ports du front, du back et de la base de données sont modifiables dans le fichier `.env`.
L'application est disponible à l'adresse [localhost:3000](localhost:3000) !
    
### Sans Docker
Lancer le back end à l'adresse [localhost:4000](localhost:4000) :

    $ cd back-node
    $ npm install
    $ npm start 
    
Lancer le front end à l'adresse [localhost:3000](localhost:3000) :

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
