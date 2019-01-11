<?php
    header('Content-Type: application/json');

    //CHOIX  DE L'UTILISATEUR SUR L'APPLICATION ANDROID
    $choixUtilisateur=$_GET['choix'];

    //INFO SERVANT A LA CONNEXION DE LA BDD
    $hote="10.10.190.39";
    $login="ia.web";
    $mdp="PTUT.iaweb@2018";
    $nombd="18_L3I_ia_web";


//https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php
// Connection au serveur
    try 
        {
            $connexion = new PDO("mysql:host=$hote;dbname=$nombd",$login,$mdp);
            $retour['connect']=true;
            $retour['BDD']="CONNEXION BD OK";
        }
    catch ( Exception $e ) 
    {
            die("\n Connexion a '$hote' impossible :".$e->getMessage());
            $retour['connect']=false;
            $retour['BDD']="ERREUR CONNEXION BD";
    }

    switch ($choixUtilisateur) {

        case 0 :
                $retour['choixUtilisateur'] ="AUCUN CHOIX FAIT";
        break;
            
        case 1 : //RECUPERATION DE TOUTE LES  ACTIVITE
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=1
        
        $retour['choixUtilisateur'] ="RECUPERATION DE TOUTE LES  ACTIVITE";
        $req="SELECT id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo FROM ACTIVITE";
        
        $i=0;
        $res=$connexion->query($req);
        
        while($ligne=$res->fetch())
        {
            $retour['activite'.$i]['id'] = $ligne[0];
            $retour['activite'.$i]['titre'] = $ligne[1];
            $retour['activite'.$i]['description'] = $ligne[2];
            $retour['activite'.$i]['dateDebut'] = $ligne[3];
            $retour['activite'.$i]['DateFin'] = $ligne[4];
            $retour['activite'.$i]['salle'] = $ligne[5];
            $retour['activite'.$i]['placeDispo'] = $ligne[6];
            $i++;
        }
        break;

        case 2 : //RECUPERATION DE TOUT LES MEMBRES
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=2

                $retour['choixUtilisateur'] ="RECUPERATION DE TOUT LES MEMBRES";

                $req="SELECT UTILISATEUR.nom,UTILISATEUR.prenom,UTILISATEUR.mail,UTILISATEUR.telephone,description,photo FROM UTILISATEUR,MEMBRE WHERE UTILISATEUR.id_utilisateur=MEMBRE.id_membre AND MEMBRE.estValide = 1 ";
                
                $i=0;
                $res=$connexion->query($req);
                
                while($ligne=$res->fetch())
                {
                    $retour['membre'.$i]['nom'] = $ligne[0];
                    $retour['membre'.$i]['prenom'] = $ligne[1];
                    $retour['membre'.$i]['mail'] = $ligne[2];
                    $retour['membre'.$i]['telephone'] = $ligne[3];
                    $retour['membre'.$i]['description'] = $ligne[4];
                    $retour['membre'.$i]['photo'] = $ligne[5];
                    $i++;
                }
        break;
        
        case 3://RECUPERATION DU NOMBRE DE PARTICIPANT ET DES NOMBRE DE PLACE DISPO EN FONCTION D UNE ACTIVITE
            //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=3&act=['idACTIVITE']

                $retour['choixUtilisateur'] ="RECUPERATION DU NOMBRE DE PARTICIPANT ET DES NOMBRE DE PLACE DISPO EN FONCTION D UNE ACTIVITE";
                $idAct = $_GET['act'];
                
                $req="SELECT COUNT(id_utilisateur),placeRestante FROM PARTICIPER WHERE id_activite".$idAct;
                $res=$connexion->query($req);
                $ligne=$res->fetch();

                $retour['totalDeParticipant'] = $ligne[0];
                $retour['placeRestante']= $ligne[1];
        break; 

        case 4 : //RECUPERATION DES ANIMATEUR EN FONCTION D'UNE ACTIVITE
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=4&act=['idACTIVITE']
        
                $retour['choixUtilisateur'] ="RECUPERATION DES ANIMATEUR EN FONCTION D'UNE ACTIVITE";
                $idAct = $_GET['act'];

                $req="SELECT UTILISATEUR.nom,UTILISATEUR.prenom FROM UTILISATEUR,ACTIVITE,ANIMER WHERE UTILISATEUR.id_utilisateur = ANIMER.id_utilisateur AND ANIMER.id_activite = ACTIVITE.id_activite AND ACTIVITE.id_activite=".$idAct;
                $i=0;
                $res=$connexion->query($req);
                
                while($ligne=$res->fetch())
                {
                    $retour['ANIMATEUR'.$i]['nom'] = $ligne[0];
                    $retour['ANIMATEUR'.$i]['prenom'] = $ligne[1];
                    $i++;
                }
        break;
        
        case 5 : //RECUPERER ACTIVITE EN FONCTION D UNE DATE DEBUT SAISIE
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=5&date=['VotreDateDebut']

            $retour['choixUtilisateur'] ="RECUPERER ACTIVITE EN FONCTION D UNE DATE DEBUT SAISIE";
            $dateSaisie = $_GET['date'];
            $i=0;
            $req = "SELECT id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo FROM ACTIVITE WHERE dateDebut='".$dateSaisie."'";
            $res=$connexion->query($req);
            while($ligne=$res->fetch())
            {
                $retour['activite'.$i]['id'] = $ligne[0];
                $retour['activite'.$i]['titre'] = $ligne[1];
                $retour['activite'.$i]['description'] = $ligne[2];
                $retour['activite'.$i]['dateDebut'] = $ligne[3];
                $retour['activite'.$i]['DateFin'] = $ligne[4];
                $retour['activite'.$i]['salle'] = $ligne[5];
                $retour['activite'.$i]['placeDispo'] = $ligne[6];
                $i++;
            }

        break;
        case 6 : //RECUPERER ACTIVITE EN FONCTION D UNE DATE FIN SAISIE
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=6&date=['VotreDateFin']

            $retour['choixUtilisateur'] ="RECUPERER ACTIVITE EN FONCTION D UNE DATE FIN SAISIE";
            $dateSaisie = $_GET['date'];
            $i=0;
            $req = "SELECT id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo FROM ACTIVITE WHERE dateFin='".$dateSaisie."'";
            $res=$connexion->query($req);
            while($ligne=$res->fetch())
            {
                $retour['activite'.$i]['id'] = $ligne[0];
                $retour['activite'.$i]['titre'] = $ligne[1];
                $retour['activite'.$i]['description'] = $ligne[2];
                $retour['activite'.$i]['dateDebut'] = $ligne[3];
                $retour['activite'.$i]['DateFin'] = $ligne[4];
                $retour['activite'.$i]['salle'] = $ligne[5];
                $retour['activite'.$i]['placeDispo'] = $ligne[6];
                $i++;
            }
        break;
        case 7 : //AJOUT D'UN UTILISATEUR
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=7&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']

            $retour['choixUtilisateur'] ="AJOUT D'UN UTILISATEUR";
            $nom = $_GET['nom'];
            $prenom = $_GET['prenom'];
            $mail = $_GET['mail'];
            $telephone = $_GET['tel'];
            $abonne = $_GET['abonne'];
            $ufr = $_GET['ufr'];

            $req = "INSERT INTO UTILISATEUR (nom,prenom,mail,telephone,abonneNewsletter,TokenAuthentification,id_ufr) VALUES ('".$nom."','".$prenom."','".$mail."',".$telephone.",".$abonne.",'NULL',".$ufr.")";
            $res=$connexion->exec($req);
            $retour['success'] ="AJOUT OK";

        break;
        case 8 : //AJOUT D'UN UTILISATEUR MEMBRE
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=8&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']&login=['login']&mdp=['mdp']&desc=['description']

                $retour['choixUtilisateur'] ="AJOUT D'UN UTILISATEUR MEMBRE";
                $nom = $_GET['nom'];
                $prenom = $_GET['prenom'];
                $mail = $_GET['mail'];
                $telephone = $_GET['tel'];
                $abonne = $_GET['abonne'];
                $ufr = $_GET['ufr'];
                $login = $_GET['login'];
                $mdp = $_GET['mdp'];
                $desc = $_GET['desc'];
    
                $req = "INSERT INTO UTILISATEUR (nom,prenom,mail,telephone,abonneNewsletter,TokenAuthentification,id_ufr) VALUES ('".$nom."','".$prenom."','".$mail."',".$telephone.",".$abonne.",'NULL',".$ufr.")";
                $res=$connexion->exec($req);

                $req1 ="INSERT INTO MEMBRE (id_membre,login,mdp,photo,description,estValide) VALUES ((Select id_utilisateur FROM UTILISATEUR WHERE nom='".$nom."' AND prenom='".$prenom."' AND mail='".$mail."' AND telephone=".$telephone." AND abonneNewsletter=".$abonne." AND TokenAuthentification='NULL' AND id_ufr=".$ufr."),'".$login."','".$mdp."','NULL','".$desc."',0)";
                $res1=$connexion->exec($req1);

                $retour['success'] ="AJOUT OK";

        break;
        case 9 : //AJOUT D'UN UTILISATEUR ET A UNE ACTIVITE UNE ACTIVITE
                //https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=9&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']&idAct=['id activite']

                $retour['choixUtilisateur'] ="AJOUT D'UN UTILISATEUR ET A UNE ACTIVITE UNE ACTIVITE";
                $nom = $_GET['nom'];
                $prenom = $_GET['prenom'];
                $mail = $_GET['mail'];
                $telephone = $_GET['tel'];
                $abonne = $_GET['abonne'];
                $ufr = $_GET['ufr'];
				$idAct = $_GET['idAct'];
    
				$req2 = "SELECT placeRestante FROM PARTICIPER WHERE id_activite=".$idAct." GROUP BY placeRestante";
				$res=$connexion->query($req2);
                $ligne =$res->fetch();
				
				$placeRestante = $ligne[0];
				
				if($placeRestante <= 0){ //si les place restante sont inferieur ou egale a 0
					$retour['success'] ="PLUS DE PLACE DANS CETTE ACTIVITE";
					
				}else{
					$req = "INSERT INTO UTILISATEUR (nom,prenom,mail,telephone,abonneNewsletter,TokenAuthentification,id_ufr) VALUES ('".$nom."','".$prenom."','".$mail."',".$telephone.",".$abonne.",'NULL',".$ufr.")";
					$res=$connexion->exec($req);
					
					$req3 = "INSERT INTO PARTICIPER (id_utilisateur, id_activite, placeRestante) VALUES ((Select id_utilisateur FROM UTILISATEUR WHERE nom='".$nom."' AND prenom='".$prenom."' AND mail='".$mail."' AND telephone=".$telephone." AND abonneNewsletter=".$abonne." AND TokenAuthentification='NULL' AND id_ufr=".$ufr."),".$idAct.",".$placeRestante.")";
					$res=$connexion->exec($req3);
					
					$req1 = "UPDATE PARTICIPER SET placeRestante= placeRestante - 1 WHERE id_activite = ".$idAct."";
					$res=$connexion->exec($req1);
					
					
					
					$retour['success'] ="AJOUT OK";
				}
				
        break;
    }
        echo json_encode($retour);
?>
