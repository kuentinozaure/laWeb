<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\MembreResponsable;
use AppBundle\Entity\AuthentificationToken;

class ConnexionController extends Controller
{
    /**
     *@Route("/connexion/{login_user}/{mdp_user}/", name="connexion_check", methods={"GET"})
    */
    public function seConnecter(Request $request)
    {
        $login = $request->get('login_user');
        $mdp = $request->get('mdp_user');

        if( empty($login) || empty($mdp))
         {
           return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
         }

        $crypt = hash("sha256",$mdp,false);

        $em = $this->getDoctrine()
                   ->getManager();

        $query = $em->createQuery(
                'SELECT count(m.id)
                 FROM AppBundle:MembreResponsable m
                 WHERE m.login = :login
                 AND m.mdp = :mdp
                 AND m.estValide = :valide
                 AND m.token is NOT NULL'
                )->setParameter('login',$login)
                ->setParameter('valide',1)
                ->setParameter('mdp',$crypt);

        $count = $query->getResult();
        $totalUser = intval($count[0][1]);

        if($totalUser != 1)
        {
          return new JsonResponse(['message' => 'Connexion failed','IsConnect'=>false], Response::HTTP_NOT_FOUND);
        }

        $members = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:MembreResponsable')
                        ->findBy(array(
                            'login'=>$login,
                            'estValide'=>1,
                        ));

        $token = $this->get('doctrine.orm.entity_manager')
                      ->getRepository('AppBundle:AuthentificationToken')
                      ->findById($members[0]->getToken());

        $formatted = [
                      'id' => $members[0]->getId(),
                      'nom' => $members[0]->getNom(),
                      'prenom' => $members[0]->getPrenom(),
                      'mail' => $members[0]->getMail(),
                      'image' => $members[0]->getImage(),
                      'telephone' =>$members[0] ->getTelephone(),
                      'description' => $members[0]->getDescription(),
                      'login' => $members[0]->getLogin(),
                      'estVisible' => $members[0]->getVisible(),
                      'estValide' => $members[0]->getEstValide(),
                      'isConnect' => true,
                      'token' => $token[0]->getToken(),
                     ];
        return new JsonResponse($formatted,Response::HTTP_OK);
    }

    /**
     *@Route("/deconnexion/", name="deconnexion", methods={"GET"})
    */
    public function seDeconnecter(Request $request)
    {
        $formatted = [
                      'isConnect' => false,
                     ];
        return new JsonResponse($formatted,Response::HTTP_OK);
    }


}
