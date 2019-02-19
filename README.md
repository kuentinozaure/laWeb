# API DESCRIPTION


##  Show list of valid Activity 
  Returns json data about all valid activity 

* **URL**

  /activity/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
None

* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":0,"titre":"VIENS DECOUVRIR LES METIER DE L'IOT","description":"TOUT CE QUE TU VEUT SUR L'IOT","dateDebut":"12\01\2019","dateFin":"12\05\2019","animateur":"PAUL","salle":"GS235","placeDisponible":500,"placeRestante":500,"categorie":"CONFERENCE","estValidePar":"superAdmin"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "activities not found" }`

* **Sample Call :**

  ```javascript
	 $.ajax({
	    url: "/activity/",
	    dataType: "json",
	    type : "GET",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```
  
  ## Show a valid activity

  Returns json data about a valid activity

* **URL**

  /activity/:id/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":0,"titre":"VIENS DECOUVRIR LES METIER DE L'IOT","description":"TOUT CE QUE TU VEUT SUR L'IOT","dateDebut":"12\01\2019","dateFin":"12\05\2019","animateur":"PAUL","salle":"GS235","placeDisponible":500,"placeRestante":500,"categorie":"CONFERENCE","estValidePar":"superAdmin"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "activities not found" }`


* **Sample Call in javascript :**

  ```javascript

	 $.ajax({
	    url: "/activity/0/",
	    dataType: "json",
	    type : "GET",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```


  ## Update a valid activity
  Update  a valid activity

* **URL**

  /activity/:id/

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  * titre
  * description
  * dateDebut
  * dateFin
  * salle
  * animateur
  * placeDispo
  * idCateg

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** `{ message: 'activity updated' }`
 
* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:** `{ message: "NULL VALUES ARE NOT ALLOWED" }`
    
* **Sample Call in javascript :**

  ```javascript
	 $.ajax({
	    url: "/activity/1/?titre=js&description=js&dateDebut=11/04/1998&dateFin=11/04/2018&salle=321&animateur=anim&placeDispo=222&idCateg=1",
	    dataType: "json",
	    type : "PUT",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```
  
  ## Delete a valid activity
  Delete a valid activity

* **URL**

  /activity/:id/

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: 'Activity deleted' }`
 
* **Error Response:**

	 * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Activity not found" }`


* **Sample Call in javascript :**

  ```javascript
	 $.ajax({
	    url: "/activity/1/",
	    dataType: "json",
	    type : "DELETE",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```

  ## Show a list of unvalid activity

  Returns json data about a list of unvalid activity

* **URL**

  /unvalidate/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":0,"titre":"VIENS DECOUVRIR LES METIER DE L'IOT","description":"TOUT CE QUE TU VEUT SUR L'IOT","dateDebut":"12\01\2019","dateFin":"12\05\2019","animateur":"PAUL","salle":"GS235","placeDisponible":500,"placeRestante":500,"categorie":"CONFERENCE","estValidePar":"NULL"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "activity not found" }`


* **Sample Call in javascript :**

  ```javascript

	 $.ajax({
	    url: "/unvalidate/",
	    dataType: "json",
	    type : "GET",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```


##  Show an unvalidate activity
  Returns json data about an unvalidate activity

* **URL**

  /unvalidate/:id/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 `id=[integer]`

* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":0,"titre":"VIENS DECOUVRIR LES METIER DE L'IOT","description":"TOUT CE QUE TU VEUT SUR L'IOT","dateDebut":"12\01\2019","dateFin":"12\05\2019","animateur":"PAUL","salle":"GS235","placeDisponible":500,"placeRestante":500,"categorie":"CONFERENCE","estValidePar":"NULL"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "activity not found" }`

* **Sample Call :**

  ```javascript
	 $.ajax({
	    url: "/unvalidate/1/",
	    dataType: "json",
	    type : "GET",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```


  ## Create an unvalidate activity
  
  Create an unvalidate activity

* **URL**

  /unvalidate/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  * titre
  * description
  * dateDebut
  * dateFin
  * salle
  * animateur
  * placeDispo
  * idCateg

* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** `{ message: 'activity is added' }`
 
* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:** `{ message: "NULL VALUES ARE NOT ALLOWED" }`


* **Sample Call in javascript :**

  ```javascript
	 $.ajax({
	    url: "/unvalidate/?titre=js&description=js&dateDebut=11/04/1998&dateFin=11/04/2018&salle=321&animateur=anim&placeDispo=222&idCateg=1",
	    dataType: "json",
	    type : "POST",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```

  ## Update an unvalidate activity
  Update an unvalidate activity

* **URL**

  /unvalidate/:id/

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  * titre
  * description
  * dateDebut
  * dateFin
  * salle
  * animateur
  * placeDispo
  * idCateg


* **Success Response:**

  * **Code:** 201 Created <br />
    **Content:** `{ message: 'activity updated' }`
 
* **Error Response:**

  * **Code:** 406 NOT ACCEPTABLE <br />
    **Content:** `{ message: "NULL VALUES ARE NOT ALLOWED" }`
 


* **Sample Call in javascript :**

  ```javascript
	 $.ajax({
	    url: "/unvalidate/1/?titre=js&description=js&dateDebut=11/04/1998&dateFin=11/04/2018&salle=321&animateur=anim&placeDispo=222&idCateg=1",
	    dataType: "json",
	    type : "PUT",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```
  
  ## Delete an unvalidate activity
  Delete an unvalidate activity

* **URL**

  /unvalidate/:id/

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

   None

* **Success Response:**

  * **Code:** 204 No Content <br />
    **Content:** `{ message: 'activity deleted' }`
 
* **Error Response:**

	 * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "activity not found" }`


* **Sample Call in javascript :**

  ```javascript
	 $.ajax({
	    url: "/unvalidate/1",
	    dataType: "json",
	    type : "DELETE",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```












  ## Show a list of astuce

  Returns json data about a list of astuce

* **URL**

  /astuce/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":0,"titre":"titre astuce","message":"message super","description":"super description,"lienAstuce":"http://google.com","auteur":"PAUL","image":"src/img.jpg","type_astuce":"trucs","valide_par":"SUPER ADMIN"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message: "Astuce not found" }`


* **Sample Call in javascript :**

  ```javascript

	 $.ajax({
	    url: "/astuce/",
	    dataType: "json",
	    type : "GET",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```


##  Show an astuce 
  Returns json data about an astuce 

* **URL**

  /astuce/:id/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 `id=[integer]`

* **Data Params**

  None
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id":0,"titre":"titre astuce","message":"message super","description":"super description,"lienAstuce":"http://google.com","auteur":"PAUL","image":"src/img.jpg","type_astuce":"trucs","valide_par":"SUPER ADMIN"}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "Astuce not found" }`

* **Sample Call :**

  ```javascript
	 $.ajax({
	    url: "/astuce/1/",
	    dataType: "json",
	    type : "GET",
	    success : function(r) {
	      console.log(r.data);
	    }
	 });
  ```


 
















# PROJET LA WEB

# Suite a des problemes avec l'api au seins de la fac ,notre api et la bdd est stockee sur l hebergeur web always data


# DESCRIPTION API 

Tout les liens presente ci-dessous permette d'acceder a l'api

## RECUPERATION DE TOUTE LES  ACTIVITE
http://laweb.alwaysdata.net/?choix=1

## RECUPERATION DE TOUT LES MEMBRES
http://laweb.alwaysdata.net/?choix=2

## RECUPERATION DU NOMBRE DE PARTICIPANT ET DES NOMBRE DE PLACE DISPO EN FONCTION D UNE ACTIVITE
http://laweb.alwaysdata.net/?choix=3&act=['idACTIVITE']

## RECUPERATION DES ANIMATEUR EN FONCTION D'UNE ACTIVITE
http://laweb.alwaysdata.net/?choix=4&act=['idACTIVITE']

## RECUPERER ACTIVITE EN FONCTION D UNE DATE DEBUT SAISIE
http://laweb.alwaysdata.net/?choix=5&date=['VotreDateDebut']

## RECUPERER ACTIVITE EN FONCTION D UNE DATE FIN SAISIE
http://laweb.alwaysdata.net/?choix=6&date=['VotreDateFin']

## AJOUT D'UN UTILISATEUR
http://laweb.alwaysdata.net/?choix=7&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']

## AJOUT D'UN UTILISATEUR MEMBRE
http://laweb.alwaysdata.net/?choix=8&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']&login=['login']&mdp=['mdp']&desc=['description']

## AJOUT D'UN UTILISATEUR ET A UNE ACTIVITE UNE ACTIVITE
http://laweb.alwaysdata.net/?choix=9&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']&idAct=['id activite']

## ENVOIE MAIL 
http://laweb.alwaysdata.net/?choix=10&nom=['nomUser']&prenom=['prenomUser']&mail=['mailUser']&message=['votreMessage']

## RECUPERATION DES UFR 
http://laweb.alwaysdata.net/?choix=11

## RECUPERATION DES MEMBRES NON VALIDE
http://laweb.alwaysdata.net/?choix=12

## VALIDATION D'UNE ACTIVITE 
http://laweb.alwaysdata.net/?choix=13&idActivite=['idActivite']&idResponsable=['idResponsable']

## CREER UNE ACTIVITE
http://laweb.alwaysdata.net/?choix=14&titre=['titre']&description=['description']&dateDebut=['dateDebut']&dateFin=['dateFin']&salle=['salle']&nombrePlaceDispo=['nombrePlaceDispo']&idOrganisateur=['idOrganisateur']

##  RECUPERATION DES ACTIVITE NON VALIDE
http://laweb.alwaysdata.net/?choix=15

## SUPPRESSION D'UNE ACTIVITE
http://laweb.alwaysdata.net/?choix=16&idAct=['idAct']

## MODIFICATION D'UNE ACTIVITE
http://laweb.alwaysdata.net/?choix=17&idAct=['idAct']&'titre=['titre']&description=['description']&dateDebut=['dateDebut']&dateFin=['dateFin']&salle=['salle']

## AJOUT D'UN UTILISATEUR A LA NEWSLETTER
http://laweb.alwaysdata.net/?choix=18&nom=['nom']&prenom=['prenom']&mail=['mail']

## LISTER LES ASTUCES
http://laweb.alwaysdata.net/?choix=19

## CREER UNE ASTUCE
http://laweb.alwaysdata.net/?choix=20&nom=['nom']&description=['description']&auteur=['auteur']&lien=['lien']&type=['type']