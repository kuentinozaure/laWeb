<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\MembreResponsable;
use AppBundle\Entity\Ufr;
use AppBundle\Entity\AuthentificationToken;

class MembreResponsableController extends Controller
{
    /**
     * @Route("/members/", name="member_list", methods={"GET"})
     */
    public function getMember(Request $request)
    {
        $members = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:MembreResponsable')
                        ->findBy(array(
                            'estValide'=>1,
                        ));


        if (empty($members))
        {
          return new JsonResponse(['message' => 'Responsable member not found'], Response::HTTP_NOT_FOUND);
        }
                $formatted = [];
                foreach ($members as $member) {
                  $ufr = $this->get('doctrine.orm.entity_manager')
                                  ->getRepository('AppBundle:Ufr')
                                  ->findAll($member->getIdUfr());

                    $formatted[] = [
                       'id' => $member->getId(),
                       'nom' => $member->getNom(),
                       'prenom' => $member->getPrenom(),
                       'mail' => $member->getMail(),
                       'image' => $member->getImage(),
                       'telephone' =>$member ->getTelephone(),
                       'description' => $member->getDescription(),
                       'login' => $member->getLogin(),
                       'mdp' => $member->getMdp(),
                       'estVisible' => $member->getVisible(),
                       'estValide' => $member->getEstValide(),
                       'ufr' => $ufr[0]->getIntitule(),
                    ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }

    /**
     * @Route("/members/{member_id}/",name="members_once",methods={"GET"})
     */
    public function getOneMembers(Request $request)
    {
        $formatted =[];
        $members = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:MembreResponsable')
                        ->findBy(array(
                            'id'=>$request->get('member_id'),
                            'estValide'=>1,
                        ));

        if (empty($members)) {
            return new JsonResponse(['message' => 'Responsable member not found'], Response::HTTP_NOT_FOUND);
        }
        if(count($members)>1)
        {
          for($i=0;$i< count($members);$i++)
          {
            $ufr = $this->get('doctrine.orm.entity_manager')
                            ->getRepository('AppBundle:Ufr')
                            ->findAll($members[$i]->getIdUfr());

            $formatted[$i]=[
                          'id' => $members[$i]->getId(),
                          'nom' => $members[$i]->getNom(),
                          'prenom' => $members[$i]->getPrenom(),
                          'mail' => $members[$i]->getMail(),
                          'image' => $members[$i]->getImage(),
                          'telephone' =>$members[$i] ->getTelephone(),
                          'description' => $members[$i]->getDescription(),
                          'login' => $members[$i]->getLogin(),
                          'mdp' => $members[$i]->getMdp(),
                          'estVisible' => $members[$i]->getVisible(),
                          'estValide' => $members[$i]->getEstValide(),
                          'ufr' => $ufr[0]->getIntitule(),
                         ];
          }
          return new JsonResponse($formatted);
        }

        $ufr = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Ufr')
                        ->findAll($members[0]->getIdUfr());

        $formatted = [
                      'id' => $members[0]->getId(),
                      'nom' => $members[0]->getNom(),
                      'prenom' => $members[0]->getPrenom(),
                      'mail' => $members[0]->getMail(),
                      'image' => $members[0]->getImage(),
                      'telephone' =>$members[0] ->getTelephone(),
                      'description' => $members[0]->getDescription(),
                      'login' => $members[0]->getLogin(),
                      'mdp' => $members[0]->getMdp(),
                      'estVisible' => $members[0]->getVisible(),
                      'estValide' => $members[0]->getEstValide(),
                      'ufr' => $ufr[0]->getIntitule(),
                     ];
        return new JsonResponse($formatted);
    }


    /**
     * @Route("/members/{id}/", name="members_once_del",methods={"DELETE"})
     */
    public function deleteMember(Request $request)
    {
      
      $em = $this->get('doctrine.orm.entity_manager');
      $emT = $this->get('doctrine.orm.entity_manager');

      $member = $em->getRepository('AppBundle:MembreResponsable')
                   ->find($request->get('id'));

      if (empty($member)) {
          return new JsonResponse(['message' => 'Member not found'], Response::HTTP_NOT_FOUND);
      }

      $valeurToken = $member->getToken();
      if($valeurToken == NULL){
        $em->remove($member);
        $em->flush();
        return new JsonResponse(['message' => 'Member deleted'], Response::HTTP_NOT_FOUND);

      }else{
        $token = $emT->getRepository('AppBundle:AuthentificationToken')
                    ->findById($member->getToken());
        $em->remove($member);
        $emT->remove($token[0]);

        $em->flush();
        $emT->flush();
        return new JsonResponse(['message' => 'Member deleted'], Response::HTTP_NOT_FOUND);
    }
  }

    /**
   * @Route("/member/", name="member_add", methods={"POST"})
   */
  public function addMember(Request $request)
  {
      //get data from HTTP get method

      $nom = $request->get('nom');
      $prenom = $request->get('prenom');
      $mail = $request->get('mail');
      $image = $request->get('image');
      $telephone = $request->get('telephone');
      $description = $request->get('description');
      $login = $request->get('login');
      $mdp = $request->get('mdp');
      $visible = $request->get('visible');
      $idUfr = $request->get('idUfr');



      //Check if one of all HTTP:GET value are empty
      $idUfr = $request->get('idUfr');

      if( empty($nom) || empty($prenom) || empty($mail) || empty($image) || empty($telephone) || empty($description) || empty($login) || empty($mdp) || empty($visible) || empty($image))
       {
         return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
       }

       $em = $this->getDoctrine()
                  ->getManager();

      //Check si le login existe pas deja car il est impossible de se connecter avec le meme login
       $query = $em->createQuery(
        'SELECT count(m.id)
         FROM AppBundle:MembreResponsable m
         WHERE m.login = :login'
        )->setParameter('login',$login);

      $countLogin = $query->getResult();
      $loginIsExist = $countLogin[0][1];

      if($loginIsExist>0)
      {
        return new JsonResponse(['message' => 'login is already take'], Response::HTTP_NOT_ACCEPTABLE);
      }

       $ufr = $this->get('doctrine.orm.entity_manager')
       ->getRepository('AppBundle:Ufr')
       ->findById($idUfr);

       $crypt = hash("sha256",$mdp,false);
       $departement = $ufr;

         $member = new MembreResponsable();

         $member ->setNom($nom)
                    ->setPrenom($prenom)
                    ->setMail($mail)
                    ->setImage($image)
                    ->setTelephone($telephone)
                    ->setDescription($description)
                    ->setLogin($login)
                    ->setMdp($crypt)
                    ->setVisible($visible)
                    ->setEstValide(0)
                    ->setidUfr($departement[0]);

         $em = $this->get('doctrine.orm.entity_manager');

         $em->persist($member);
         $em->flush();
         return new JsonResponse(['message' => 'member is added','id'=>$member->getId()], Response::HTTP_CREATED);
  }

  /**
   * @Route("/member/{idMember}/", name="validate_members", methods={"PUT"})
   */
  public function validateMember(Request $request)
  {
     $em = $this->get('doctrine.orm.entity_manager');
     $emT = $this->get('doctrine.orm.entity_manager');

     $member = $em->getRepository('AppBundle:MembreResponsable')
                    ->findById($request->get('idMember'));

       $mem = $member;

       $authToken = new AuthentificationToken();
       $authToken->setToken(base64_encode(random_bytes(50)));
       $authToken->setDateDeCreation(new \DateTime('now'));

       /* $tokenId = $emT->getRepository('AppBundle:AuthentificationToken')
                    ->findById($authToken->getId()); */

       $mem[0]->setEstValide(1);
       $mem[0]->setToken($authToken->getId());

       $emT->getRepository('AppBundle:AuthentificationToken');
       $emT->persist($authToken);
       $emT->flush();

       $em->persist($mem[0]);
       $em->flush();
       return new JsonResponse(['message' => 'member validated'], Response::HTTP_CREATED);
  }
  /**
   * @Route("/members/{idMember}/", name="update_member", methods={"PUT"})
   */
  public function updateMember(Request $request)
  {
    //get data from HTTP get method
    $nom = $request->get('nom');
    $prenom = $request->get('prenom');
    $mail = $request->get('mail');
    $image = $request->get('image');
    $telephone = $request->get('telephone');
    $desc = $request ->get('description');
    $login = $request ->get('login');
    $visible = $request ->get('visible');




    //Check if one of all HTTP:GET value are empty
    if(empty($visible)  || empty($nom) || empty($prenom) || empty($mail) || empty($image) || empty($telephone) || empty($desc) || empty($login))
     {
       return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
     }
     $em = $this->get('doctrine.orm.entity_manager');

     $membre = $em->getRepository('AppBundle:MembreResponsable')
                    ->findById($request->get('idMember'));


    $mem = $membre;

    if($visible == "true"){
      $mem[0] ->setNom($nom)
             ->setPrenom($prenom)
             ->setMail($mail)
             ->setImage($image)
             ->setTelephone($telephone)
             ->setDescription($desc)
             ->setVisible(1)
             ->setLogin($login);
     }else{
       $mem[0] ->setNom($nom)
              ->setPrenom($prenom)
              ->setMail($mail)
              ->setImage($image)
              ->setTelephone($telephone)
              ->setDescription($desc)
              ->setVisible(0)
              ->setLogin($login);
     }


       $em->persist($mem[0]);
       $em->flush();
       return new JsonResponse(['message' => 'member updated'], Response::HTTP_CREATED);
  }

  /**
   * @Route("/membersM/{idMember}/", name="update_password", methods={"PUT"})
   */
  public function updatePassword(Request $request)
  {
    //get data from HTTP get method
    $mdp = $request->get('mdp');

    //Check if one of all HTTP:GET value are empty
    if(empty($mdp))
     {
       return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
     }
     $em = $this->get('doctrine.orm.entity_manager');

     $membre = $em->getRepository('AppBundle:MembreResponsable')
                    ->findById($request->get('idMember'));

    $crypt = hash("sha256",$mdp,false);

    $mem = $membre;

       $mem[0] ->setMdp($crypt);

       $em->persist($mem[0]);
       $em->flush();
       return new JsonResponse(['message' => 'member updated'], Response::HTTP_CREATED);
  }

  /**
   * @Route("/member/{loginMember}/", name="member_id", methods={"GET"})
   */
  public function getIdMember(Request $request)
  {
    $em = $this->getDoctrine()
               ->getManager();

    $query = $em->createQuery(
      'SELECT count(p.login)
       FROM AppBundle:MembreResponsable p
       WHERE p.login = :loginMember'
      )->setParameter('loginMember',$request->get('loginMember'));

      $count = $query->getResult();

      if(intval($count[0][1]) > 1){
        return new JsonResponse(['message' => 'member no unique'], Response::HTTP_CREATED);
      }

      $member = $em->getRepository('AppBundle:MembreResponsable')
                    ->findBy(array('login' => $request->get('loginMember')));

      $mem = $member;
      return new JsonResponse($mem[0]->getId(), Response::HTTP_CREATED);
  }
}
