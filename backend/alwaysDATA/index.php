<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');

    //CHOIX  DE L'UTILISATEUR SUR L'APPLICATION ANDROID
    $choixUtilisateur=$_GET['choix'];

    //INFO SERVANT A LA CONNEXION DE LA BDD
    $hote="mysql-laweb.alwaysdata.net";
    $login="laweb";
    $mdp="PTUT.iaweb@2018";
    $nombd="laweb_bd";


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
                //http://laweb.alwaysdata.net/?choix=1

        $retour['choixUtilisateur'] ="RECUPERATION DE TOUTE LES  ACTIVITE";
        //$req="SELECT id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo FROM ACTIVITE";
        $req= "SELECT ACTIVITE.id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo,PARTICIPER.placeRestante,type_activite,UTILISATEUR.nom,UTILISATEUR.prenom FROM ACTIVITE,PARTICIPER,ORGANISER,UTILISATEUR WHERE ACTIVITE.id_activite =ORGANISER.id_activite AND PARTICIPER.id_activite = ACTIVITE.id_activite AND UTILISATEUR.id_utilisateur = ORGANISER.id_membre AND ACTIVITE.id_president IN (SELECT PRESIDENT.id_president FROM PRESIDENT) GROUP BY id_activite";
        $i=0;
        $res=$connexion->query($req);

        
        while($ligne=$res->fetch())
        {
            $retour['activite'][$i]['id'] = $ligne[0];
            $retour['activite'][$i]['titre'] = $ligne[1];
            $retour['activite'][$i]['description'] = $ligne[2];
            $retour['activite'][$i]['dateDebut'] = $ligne[3];
            $retour['activite'][$i]['DateFin'] = $ligne[4];
            $retour['activite'][$i]['salle'] = $ligne[5];
            $retour['activite'][$i]['placeDispo'] = $ligne[6];
            $retour['activite'][$i]['placeRestante'] = $ligne[7];
            $retour['activite'][$i]['type'] = $ligne[8];
            $retour['activite'][$i]['animateur'] = $ligne[9]." ".$ligne[10];
            $i++;
        }
        
        break;

        case 2 : //RECUPERATION DE TOUT LES MEMBRES
                //http://laweb.alwaysdata.net/?choix=2

                $retour['choixUtilisateur'] ="RECUPERATION DE TOUT LES MEMBRES";

                $req="SELECT UTILISATEUR.nom,UTILISATEUR.prenom,UTILISATEUR.mail,UTILISATEUR.telephone,description,photo FROM UTILISATEUR,MEMBRE WHERE UTILISATEUR.id_utilisateur=MEMBRE.id_membre AND MEMBRE.estValide = 1 ";
                
                $i=0;
                $res=$connexion->query($req);
                
                while($ligne=$res->fetch())
                {
                    $retour['membres'][$i]['nom'] = $ligne[0];
                    $retour['membres'][$i]['prenom'] = $ligne[1];
                    $retour['membres'][$i]['mail'] = $ligne[2];
                    $retour['membres'][$i]['telephone'] = $ligne[3];
                    $retour['membres'][$i]['description'] = $ligne[4];
                    $retour['membres'][$i]['photo'] = $ligne[5];
                    $i++;
                }
        break;

        case 3://RECUPERATION DU NOMBRE DE PARTICIPANT ET DES NOMBRE DE PLACE DISPO EN FONCTION D UNE ACTIVITE
            //http://laweb.alwaysdata.net/?choix=3&act=['idACTIVITE']

                $retour['choixUtilisateur'] ="RECUPERATION DU NOMBRE DE PARTICIPANT ET DES NOMBRE DE PLACE DISPO EN FONCTION D UNE ACTIVITE";
                $idAct = $_GET['act'];
                
                $req="SELECT COUNT(id_utilisateur),placeRestante FROM PARTICIPER WHERE id_activite=".$idAct;
                $res=$connexion->query($req);
                $ligne=$res->fetch();

                $retour['totalDeParticipant'] = $ligne[0];
                $retour['placeRestante']= $ligne[1];
        break; 

        case 4 : //RECUPERATION DES ANIMATEUR EN FONCTION D'UNE ACTIVITE
                //http://laweb.alwaysdata.net/?choix=4&act=['idACTIVITE']

                $retour['choixUtilisateur'] ="RECUPERATION DES ANIMATEUR EN FONCTION D'UNE ACTIVITE";
                $idAct = $_GET['act'];

                $req="SELECT UTILISATEUR.nom,UTILISATEUR.prenom FROM UTILISATEUR,ACTIVITE,ANIMER WHERE UTILISATEUR.id_utilisateur = ANIMER.id_utilisateur AND ANIMER.id_activite = ACTIVITE.id_activite AND ACTIVITE.id_activite=".$idAct;
                $i=0;
                $res=$connexion->query($req);
                
                while($ligne=$res->fetch())
                {
                    $retour['anim'][$i]['nom'] = $ligne[0];
                    $retour['anim'][$i]['prenom'] = $ligne[1];
                    $i++;
                }
        break;

        case 5 : //RECUPERER ACTIVITE EN FONCTION D UNE DATE DEBUT SAISIE
                //http://laweb.alwaysdata.net/?choix=5&date=['VotreDateDebut']

            $retour['choixUtilisateur'] ="RECUPERER ACTIVITE EN FONCTION D UNE DATE DEBUT SAISIE";
            $dateSaisie = $_GET['date'];
            $i=0;
            $req = "SELECT id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo FROM ACTIVITE WHERE  dateDebut='".$dateSaisie."'";
            $retour['REEE'] = $req;
            $res=$connexion->query($req);
            while($ligne=$res->fetch())
            {
                $retour['activite'][$i]['id'] = $ligne[0];
                $retour['activite'][$i]['titre'] = $ligne[1];
                $retour['activite'][$i]['description'] = $ligne[2];
                $retour['activite'][$i]['dateDebut'] = $ligne[3];
                $retour['activite'][$i]['DateFin'] = $ligne[4];
                $retour['activite'][$i]['salle'] = $ligne[5];
                $retour['activite'][$i]['placeDispo'] = $ligne[6];
                $i++;
            }

        break;
        case 6 : //RECUPERER ACTIVITE EN FONCTION D UNE DATE FIN SAISIE
                //http://laweb.alwaysdata.net/?choix=6&date=['VotreDateFin']

            $retour['choixUtilisateur'] ="RECUPERER ACTIVITE EN FONCTION D UNE DATE FIN SAISIE";
            $dateSaisie = $_GET['date'];
            $i=0;
            $req = "SELECT id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo FROM ACTIVITE WHERE dateFin='".$dateSaisie."'";
            $res=$connexion->query($req);
            while($ligne=$res->fetch())
            {
                $retour['activite'][$i]['id'] = $ligne[0];
                $retour['activite'][$i]['titre'] = $ligne[1];
                $retour['activite'][$i]['description'] = $ligne[2];
                $retour['activite'][$i]['dateDebut'] = $ligne[3];
                $retour['activite'][$i]['DateFin'] = $ligne[4];
                $retour['activite'][$i]['salle'] = $ligne[5];
                $retour['activite'][$i]['placeDispo'] = $ligne[6];
                $i++;
            }
        break;
        case 7 : //AJOUT D'UN UTILISATEUR
                //http://laweb.alwaysdata.net/?choix=7&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']

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
                //http://laweb.alwaysdata.net/?choix=8&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']&login=['login']&mdp=['mdp']&desc=['description']

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

                $req = "INSERT INTO UTILISATEUR (nom,prenom,mail,telephone,abonneNewsletter,TokenAuthentification,id_ufr) VALUES ('".$nom."','".$prenom."','".$mail."',".$telephone.",".$abonne.",NULL,".$ufr.")";
                $res=$connexion->exec($req);

                $req1 ="INSERT INTO MEMBRE (id_membre,login,mdp,photo,description,estValide) VALUES ((Select id_utilisateur FROM UTILISATEUR WHERE nom='".$nom."' AND prenom='".$prenom."' AND mail='".$mail."' AND telephone=".$telephone." AND abonneNewsletter=".$abonne." AND id_ufr=".$ufr."),'".$login."','".$mdp."',NULL,'".$desc."',0)";
                $res1=$connexion->exec($req1);

                $retour['success'] ="AJOUT OK";

        break;
        case 9 : //AJOUT D'UN UTILISATEUR ET A UNE ACTIVITE UNE ACTIVITE
                //http://laweb.alwaysdata.net/?choix=9&nom=['nom']&prenom=['prenom']&mail=['mail']&tel=['telephone']&abonne=['abonne']&ufr=['ufr']&idAct=['id activite']

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
                    $req = "INSERT INTO UTILISATEUR (nom,prenom,mail,telephone,abonneNewsletter,TokenAuthentification,id_ufr) VALUES ('".$nom."','".$prenom."','".$mail."',".$telephone.",".$abonne.",NULL,".$ufr.")";
                    $res0=$connexion->exec($req);
                    $retour['$req'] =$req;
                    
                    $req3 = "INSERT INTO PARTICIPER (id_utilisateur, id_activite, placeRestante) VALUES ((Select id_utilisateur FROM UTILISATEUR WHERE nom='".$nom."' AND prenom='".$prenom."' AND mail='".$mail."' AND telephone=".$telephone." AND abonneNewsletter=".$abonne." AND id_ufr=".$ufr."),".$idAct.",".$placeRestante.")";
                    $res3=$connexion->exec($req3);
                    $retour['$$req3'] =$req3;
                    
                    $req1 = "UPDATE PARTICIPER SET placeRestante= placeRestante - 1 WHERE id_activite = ".$idAct."";
                    $res1=$connexion->exec($req1);
                    $retour['$req1'] =$req1;
                    
                    $retour['success'] ="AJOUT OK";
                }
                
        break;
        case 10 : //ENVOIE MAIL 
                //http://laweb.alwaysdata.net/?choix=10&nom=['nomUser']&prenom=['prenomUser']&mail=['mailUser']&message=['votreMessage']
            
            $retour['choixUtilisateur'] ="ENVOIE MAIL";
            $nom = $_GET['nom'];
            $prenom = $_GET['prenom'];
            $mail = $_GET['mail'];
            $mes = $_GET['message'];

            try 
            {
                // Adresse email du destinataire
                $destinataire = $mail;
                // Titre de l'email
                $sujet = 'DEMANDE D INFORMATION DE L UTILISATEUR '.$nom." ".$prenom."";
                 

                $message = '<html>';
                    $message .= '<head>';
                        $message .= '<meta name="viewport" content="width=device-width, initial-scale=1.0"/>';
                    $message .= '</head>';
                    $message .= '<body style="margin:0px; padding:0px; -webkit-text-size-adjust:none;">';
                        $message .= '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:rgb(0, 215, 216)">';
                            $message .= '<tbody>';
                                $message .= '<tr>';
                                    $message .= '<td align="center" bgcolor="#ffffff">';
                                        $message .= '<table cellpadding="0" cellspacing="0" border="0">';
                                            $message .= '<tbody>';
                                                $message .= '<tr>';
                                                    $message .= '<td  width="640" height="10"></td>';
                                                $message .= '</tr>';
                                                $message .= '<tr>';
                                                    $message .= '<td align="center" width="640" height="20"> <a style="color:#000000; font-size:12px;" href="#"><span style="color:#000000; font-size:12px;">Voir le contenu de ce mail en ligne</span></a> </td>';
                                                $message .= '</tr>';
                                                $message .= '<tr>';
                                                    $message .= '<td  width="640" height="10"></td>';
                                                $message .= '</tr>';
                                                $message .= '<tr>';
                                                    $message .= '<td width="640">';
                                                        $message .= '<table  width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#F2F0F0">';
                                                            $message .= '<tbody>';
                                                                $message .= '<tr>';
                                                                    $message .= '<td  width="30"></td>';
                                                                    $message .= '<td  width="580" valign="middle" align="left">';
                                                                        $message .= '<div class="pagetoplogo-content">';
                                                                            $message .= '<img  style="text-decoration: none; display: block; color:#476688; font-size:30px;" src="https://mi-phpmut.univ-tlse2.fr/~ia.web/images/logo3.png" alt="Mon Logo" width="256" height="135">';
                                                                        $message .= '</div>';
                                                                    $message .= '</td> ';
                                                                    $message .= '<td  width="500"><h1>~LA WEB~</h1></td>';
                                                                $message .= '</tr>';
                                                            $message .= '</tbody>';
                                                        $message .= '</table>';
                                                    $message .= '</td>';
                                                $message .= '</tr>';
                                                $message .= ' <tr>';
                                                    $message .= '<td  width="640" height="1" bgcolor="#000000"></td>';
                                                $message .= '</tr>';
                                                $message .= '<tr class="content">';
                                                    $message .= '<td  width="640" bgcolor="#d7d6d6">';
                                                        $message .= '<table  width="640" cellpadding="0" cellspacing="0" border="0">';
                                                            $message .= '<tbody>';
                                                                $message .= '<tr>';
                                                                    $message .= '<td  width="30"></td>';
                                                                    $message .= '<td  width="580">';
                                                                        $message .= '<table  width="580" cellpadding="0" cellspacing="0" border="0">';
                                                                            $message .= '<tbody> ';
                                                                                $message .= '<tr>';
                                                                                    $message .= '<td  width="580">';
                                                                                        $message .= '<h2 style="color:#0E7693; font-size:22px; padding-top:12px;">VOICI LES INFORMATIONS POUR '.$nom.' ' .$prenom.' </h2>';
                                                                                            $message .= '<div align="left" class="article-content">';
                                                                                                $message .= '<p'  .$nom.' ' .$prenom. '</p>';
                                                                                                $message .= 'A ecrit :';
                                                                                                $message .= '<p>';
                                                                                                    $message .= '<div style="text-indent: 20">';
                                                                                                        $message .= ''.$mes.'';
                                                                                                    $message .= '</div>';
                                                                                                $message .= '</p>';
                                                                                                $message .= '<p>';
                                                                                                    $message .= 'voici son mail pour le recontacter : '.$destinataire.'</a>';
                                                                                                $message .= '</p>';
                                                                                            $message .= '</div>';
                                                                                    $message .= '</td>';
                                                                                $message .= '</tr>';
                                                                                $message .= '<tr>';
                                                                                    $message .= '<td  width="580" height="1" bgcolor="#c7c5c5"></td>';
                                                                                $message .= '</tr>';
                                                                            $message .= '</tbody>';
                                                                        $message .= '</table>';
                                                                    $message .= '</td>';
                                                                    $message .= '<td  width="30"></td>';
                                                                $message .= '</tr>';
                                                            $message .= '</tbody>';
                                                        $message .= '</table>';
                                                    $message .= '</td>';
                                                $message .= '</tr>';
                                                $message .= '<tr>';
                                                    $message .= '<td  width="640" height="15" bgcolor="#ffffff"></td>';
                                                $message .= '</tr>';
                                                $message .= '<tr>';
                                                    $message .= '<td  width="640">';
                                                        $message .= '<table  width="640" cellpadding="0" cellspacing="0" border="0" bgcolor="#c7c7c7">';
                                                            $message .= '<tbody>';
                                                                $message .= ' <tr>';
                                                                    $message .= '<td colspan="5" height="10"></td>';
                                                                $message .= '</tr>';
                                                                $message .= '<tr>';
                                                                    $message .= '<td  width="30"></td>';
                                                                    $message .= ' <td  width="580" valign="top">';
                                                                        $message .= '<p align="right" class="pagebottom-content-left">';
                                                                            $message .= '<a style="color:#255D5C;" href="https://mi-phpmut.univ-tlse2.fr/~ia.web/"><span style="color:#255D5C;">LA WEB 2018</span></a>';
                                                                        $message .= ' </p>';
                                                                    $message .= '</td>';
                                                                    $message .= '<td  width="30"></td>';
                                                                $message .= '</tr>';
                                                                $message .= '<tr>';
                                                                    $message .= '<td colspan="5" height="10"></td>';
                                                                $message .= '</tr>';
                                                            $message .= '</tbody>';
                                                        $message .= '</table>';
                                                    $message .= '</td>';
                                                $message .= '</tr>';
                                                $message .= '<tr>';
                                                    $message .= '<td  width="640" height="60"></td>';
                                                $message .= '</tr>';
                                            $message .= '</tbody>';
                                        $message .= '</table>';
                                    $message .= '</td>';
                                $message .= '</tr>';
                            $message .= '</tbody>';
                        $message .= '</table>';
                    $message .= '</body>';
                $message .= '</html>';   

                // Pour envoyer un email HTML, l'en-tête Content-type doit être défini
                $headers = 'MIME-Version: 1.0'."\r\n";
                $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
                 
                // Fonction principale qui envoi l'email
                mail("aubryquentin700@gmail.com", $sujet, $message, $headers);
                mail("associationlaweb@gmail.com", $sujet, $message, $headers);
                
                $retour['html'] = $message;
                $retour['status'] = "ENVOYE";
            }
            catch(Exception $e)
            {
                $retour['status'] = "NON ENVOYE";
            }
            
        break;
        case 11 : //RECUPERATION DES UFR 
                //http://laweb.alwaysdata.net/?choix=11

                $retour['choixUtilisateur'] ="RECUPERATION DES UFR ";

                $req="SELECT * FROM UFR";
                $i=0;
                $res=$connexion->query($req);
                
                while($ligne=$res->fetch())
                {
                    $retour['ufr'][$i]['id'] = $ligne[0];
                    $retour['ufr'][$i]['ufr'] = $ligne[1];
                    $i++;
                }
        break;
        case 12 : //RECUPERATION DES MEMBRES NON VALIDE
                //http://laweb.alwaysdata.net/?choix=12

                $retour['choixUtilisateur'] ="RECUPERATION DES MEMBRES NON VALIDE";

                $req ='SELECT UTILISATEUR.telephone,UTILISATEUR.mail,UTILISATEUR.nom,UTILISATEUR.prenom,login,description FROM MEMBRE,UTILISATEUR WHERE UTILISATEUR.id_utilisateur = MEMBRE.id_membre AND estValide = 0 GROUP BY id_utilisateur';
                
                $i=0;
                $res=$connexion->query($req);
                
                while($ligne=$res->fetch())
                {
                    $retour['membre'][$i]['telephone'] = $ligne[0];
                    $retour['membre'][$i]['mail'] = $ligne[1];
                    $retour['membre'][$i]['nom'] = $ligne[2];
                    $retour['membre'][$i]['prenom'] = $ligne[3];
                    $retour['membre'][$i]['login'] = $ligne[4];
                    $retour['membre'][$i]['description'] = $ligne[5];
                    $i++;
                }
        
        break;
        case 13 : //VALIDATION D'UNE ACTIVITE
                //http://laweb.alwaysdata.net/?choix=13&idActivite=['idActivite']&idResponsable=['idResponsable']

        $retour['choixUtilisateur'] ="VALIDATION D'UNE ACTIVITE";
        $idActivite = $_GET['idActivite'];
        $idResponsable = $_GET['idResponsable'];
        
        $req = "UPDATE `ACTIVITE` SET `id_president` = '".$idResponsable."' WHERE `ACTIVITE`.`id_activite` = ".$idActivite."";
        $res=$connexion->exec($req);

        $retour['OK'] ="VOTRE ACTIVITE EST VALIDE";
        break;

        case 14 : //CREER UNE ACTIVITE
                //http://laweb.alwaysdata.net/?choix=14&titre=['titre']&description=['description']&dateDebut=['dateDebut']&dateFin=['dateFin']&salle=['salle']&nombrePlaceDispo=['nombrePlaceDispo']&idOrganisateur=['idOrganisateur']

        $retour['choixUtilisateur'] ="CREER UNE ACTIVITE";

        $titre = $_GET['titre'];
        $description = $_GET['description'];
        $dateDebut = $_GET['dateDebut'];
        $dateFin = $_GET['dateFin'];
        $salle = $_GET['salle'];
        $nbPlaceDispo = $_GET['nombrePlaceDispo'];
        $idOrga = $_GET['idOrganisateur'];

        $req = "INSERT INTO ACTIVITE (`id_activite`, `titre`, `description`, `dateDebut`, `dateFin`, `salle`, `nombrePlaceDispo`, `id_president`) VALUES (NULL, '".$titre."', '".$description."', '".$dateDebut."', '".$dateFin."', '".$salle."', '".$nbPlaceDispo."', NULL)";
        $res=$connexion->exec($req);

        $req1 = "INSERT INTO `ORGANISER` (`id_membre`, `id_activite`) VALUES (".$idOrga.", (SELECT id_activite FROM `ACTIVITE` WHERE titre ='".$titre."' AND description = '".$description."' AND dateDebut = '".$dateDebut."' AND dateFin = '".$dateFin."' AND salle = '".$salle."' AND nombrePlaceDispo = '".$nbPlaceDispo."'))";
        $res1=$connexion->exec($req1);

        $req1 = "INSERT INTO `PARTICIPER`(`id_utilisateur`, `id_activite`, `placeRestante`) VALUES ('".$idOrga."',(SELECT id_activite FROM `ACTIVITE` WHERE titre ='".$titre."' AND description = '".$description."' AND dateDebut = '".$dateDebut."' AND dateFin = '".$dateFin."' AND salle = '".$salle."' AND nombrePlaceDispo = '".$nbPlaceDispo."'),'".$nbPlaceDispo."')";
        $res1=$connexion->exec($req1);

        $retour['OK'] = "ajout ok";
        
        break;
        case 15 : //RECUPERATION DES ACTIVITE NON VALIDE
        //http://laweb.alwaysdata.net/?choix=15

        $retour['choixUtilisateur'] ="RECUPERATION DES ACTIVITE NON VALIDE";

        $req ='SELECT ACTIVITE.id_activite,titre,description,dateDebut,dateFin,salle,nombrePlaceDispo FROM ACTIVITE WHERE ACTIVITE.id_activite NOT IN(SELECT id_activite FROM ORGANISER) OR ACTIVITE.id_president IS NULL GROUP BY id_activite';
                
                $i=0;
                $res=$connexion->query($req);
                
                while($ligne=$res->fetch())
                {
                    $retour['activite'][$i]['id'] = $ligne[0];
                    $retour['activite'][$i]['titre'] = $ligne[1];
                    $retour['activite'][$i]['description'] = $ligne[2];
                    $retour['activite'][$i]['dateDebut'] = $ligne[3];
                    $retour['activite'][$i]['dateFin'] = $ligne[4];
                    $retour['activite'][$i]['salle'] = $ligne[5];
                    $retour['activite'][$i]['nbPlaceDispo'] = $ligne[6];
                    $i++;
                }
break;
case 16 : //SUPPRESSION D'UNE ACTIVITE
        //http://laweb.alwaysdata.net/?choix=16&idAct=['idAct']

        $retour['choixUtilisateur'] ="SUPPRESSION D'UN ACTIVITE";
        $idAct = $_GET['idAct'];

        $req ="DELETE FROM ORGANISER WHERE ORGANISER.id_activite =".$idAct."";
        $res=$connexion->exec($req);

        $req1="DELETE FROM PARTICIPER WHERE PARTICIPER.id_activite = ".$idAct."";
        $res1=$connexion->exec($req1);

        $req2="DELETE FROM ACTIVITE WHERE ACTIVITE.id_activite =".$idAct."";
        $res2=$connexion->exec($req2);


        $retour['OK'] ="SUPPRESSION D'UNE ACTIVITE";
break;
case 17 : //MODIFICATION DES INFORMATIONS D'UNE ACTIVITE
        //http://laweb.alwaysdata.net/?choix=17&idAct=['idAct']&'titre=['titre']&description=['description']&dateDebut=['dateDebut']&dateFin=['dateFin']&salle=['salle']

        $retour['choixUtilisateur'] ="MODIFICATION D'UNE ACTIVITE";

        $idAct = $_GET['idAct'];
        $titre = $_GET['titre'];
        $description = $_GET['description'];
        $dateDebut = $_GET['dateDebut'];
        $dateFin = $_GET['dateFin'];
        $salle = $_GET['salle'];
        //$idOrga = $_GET['idOrganisateur'];

        $req ="UPDATE ACTIVITE SET titre = '".$titre."', description = '".$description."', dateDebut = '".$dateDebut."' ,dateFin ='".$dateFin."',salle ='".$salle."'WHERE id_activite = ".$idAct;
        $res=$connexion->exec($req);
	    $retour['ooo'] =  $req;
        $retour['OK'] ="MODIFICATION D'UNE ACTIVITE";
break;
case 18 : //AJOUT D'UN ABONNE A LA NEWS LETTER
        //http://laweb.alwaysdata.net/?choix=18&nom=['nom']&prenom=['prenom']&mail=['mail']

        $retour['choixUtilisateur'] ="MODIFICATION D'UNE ACTIVITE";

       
        $nom = $_GET['nom'];
        $prenom = $_GET['prenom'];
        $mail = $_GET['mail'];

        $req ="INSERT INTO NEWSLETTER (id, nom, prenom, mail) VALUES (NULL, '".$nom."', '".$prenom."', '".$mail."')";
        $res=$connexion->exec($req);
        $retour['OK'] = "add Activity";
break;
case 19 : //RECUPERATION DE TOUTE LES  ASTUCE
                //http://laweb.alwaysdata.net/?choix=19

        $retour['choixUtilisateur'] ="RECUPERATION DE TOUTE LES  ASTUCE";
        $req= "SELECT id,titre,description,auteur,image,lienAstuce,type FROM ASTUCE WHERE estValide = 1";
        $i=0;
        $res=$connexion->query($req);

        
        while($ligne=$res->fetch())
        {
            $retour['astuce'][$i]['id'] = $ligne[0];
            $retour['astuce'][$i]['titre'] = $ligne[1];
            $retour['astuce'][$i]['description'] = $ligne[2];
            $retour['astuce'][$i]['auteur'] = $ligne[3];
            $retour['astuce'][$i]['image'] = $ligne[4];
            $retour['astuce'][$i]['lienAstuce'] = $ligne[5];
            $retour['astuce'][$i]['type'] = $ligne[6];
            $i++;
        }
        
        break;
        case 20 : 
        $retour['choixUtilisateur'] ="CREER ASTUCE";
        //http://laweb.alwaysdata.net/?choix=20&nom=['nom']&description=['description']&auteur=['auteur']&lien=['lien']&type=['type']
    
            
        $titre = $_GET['titre'];
        $description = $_GET['description'];
        $auteur = $_GET['auteur'];
        $lien = $_GET['lien'];
        $type =  $_GET['type'];
    
        $req = "INSERT INTO ASTUCE (id, titre, description, auteur, image, lienAstuce, type,estValide) VALUES (NULL, '".$titre."', '".$description."', '".$auteur."', '', '".$lien."', '".$type."',0)";
        $res=$connexion->exec($req);
        $retour['OK'] = "AJOUT DE VOTRE ASTUCES";
    
    break;
    }
        echo json_encode($retour);
?>