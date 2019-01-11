<?php
    header('Content-Type: application/json');

    //CHOIX  DE L'UTILISATEUR SUR L'APPLICATION ANDROID
    $choixUtilisateur=$_GET['choix'];

    //INFO SERVANT A LA CONNEXION DE LA BDD
    /*$hote="10.10.190.39";
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
    }*/

    switch ($choixUtilisateur) {

        case 0 :
                $retour['choixUtilisateur'] ="AUCUN CHOIX FAIT";
        break;

        //https://webdesign.tutsplus.com/articles/build-an-html-email-template-from-scratch--webdesign-12770
        case 1 : //ENVOIE MAIL 
                //http://laweb.alwaysdata.net/?choix=1&nom=quentin&prenom=aubry&mail=aubryquentin123@gmail.com&message=salut
                //http://laweb.alwaysdata.net/?choix=1&nom=['nomUser']&prenom=['prenomUser']&mail=['mailUser']&message=['votreMessage']
            
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
                                                                                        $message .= '<h2 style="color:#0E7693; font-size:22px; padding-top:12px;">VOICI LES INFORMATIONS POUR'.$nom.' '.$prenom.'</h2>';
                                                                                            $message .= '<div align="left" class="article-content">';
                                                                                                $message .= '<p> NOM + PRENOM</p>';
                                                                                                $message .= 'A ecrit :';
                                                                                                $message .= '<p>';
                                                                                                    $message .= '<div style="text-indent: 20">';
                                                                                                        $message .= ''.$mes.'';
                                                                                                    $message .= '</div>';
                                                                                                $message .= '</p>';
                                                                                                $message .= '<p>';
                                                                                                    $message .= 'voici son mail pour le recontacter : <a href="mailto:test@test.com">nom + prenom</a>';
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
    }
        echo json_encode($retour);
?>