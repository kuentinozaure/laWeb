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