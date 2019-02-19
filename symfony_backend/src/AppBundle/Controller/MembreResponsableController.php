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
     * @Route("/members/delete/{id}/", name="members_once_del",methods={"DELETE"})
     */
    public function deleteMember(Request $request)
    {
      $em = $this->get('doctrine.orm.entity_manager');
      $member = $em->getRepository('AppBundle:MembreResponsable')
                      ->find($request->get('id'));
      if (empty($member)) {
          return new JsonResponse(['message' => 'Member not found'], Response::HTTP_NOT_FOUND);
      }
      $em->remove($member);
      $em->flush();
      return new JsonResponse(['message' => 'Member deleted'], Response::HTTP_NOT_FOUND);
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
         $ufr = $this->get('doctrine.orm.entity_manager')
         ->getRepository('AppBundle:Ufr')
         ->findById($idUfr);

         $departement = $ufr;

           $member = new MembreResponsable();
           
           $member ->setNom($nom)
                      ->setPrenom($prenom)
                      ->setMail($mail)
                      ->setImage($image)
                      ->setTelephone($telephone)
                      ->setDescription($description)
                      ->setLogin($login)
                      ->setMdp($mdp)
                      ->setVisible($visible)
                      ->setEstValide(0)
                      ->setidUfr($departement[0]);

           $em = $this->get('doctrine.orm.entity_manager');

           $em->persist($member);
           $em->flush();
           return new JsonResponse(['message' => 'member is added'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/member/{idMember}/", name="validate_member", methods={"PUT"})
     */
    public function validateMember(Request $request)
    {
       $em = $this->get('doctrine.orm.entity_manager');
       
       $member = $em->getRepository('AppBundle:MembreResponsable')
                      ->findById($request->get('idMember'));

         $mem = $member;

         $mem[0]->setEstValide(1);

         $em->persist($mem[0]);
         $em->flush();
         return new JsonResponse(['message' => 'member updated'], Response::HTTP_CREATED);
    }


  //  * @Route("/nauticbases", name="nauticBase_add", methods={"POST"})
  //  */
  //   public function addNauticBase(Request $request)
  //   {
  //       //get data from HTTP get method
  //       $name = $request->get('name');
  //       $description = $request->get('description');
  //       $address = $request->get('address');
  //       $city = $request->get('city');
  //       $postalCode = $request->get('postalCode');
  //       //Check if one of all HTTP:GET value are empty
  //       if(empty($name) || empty($description) || empty($address) || empty($city) || empty($postalCode))
  //        {
  //          return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
  //        }
  //          $nauticBase = new NauticBase();
  //          $nauticBase->setName($name)
  //                     ->setDescription($description)
  //                     ->setAddress($address)
  //                     ->setCity($city)
  //                     ->setPostaleCode($postalCode);
  //          $em = $this->get('doctrine.orm.entity_manager');
  //          $em->persist($nauticBase);
  //          $em->flush();
  //          return new JsonResponse(['message' => 'nautical base is added'], Response::HTTP_CREATED);
  //   }
  //   /**
  //    * @Route("/nauticbases/{id}", name="nauticBase_delete_once", methods={"DELETE"})
  //    */
  //   public function deleteNauticBase(Request $request)
  //   {
  //       $em = $this->get('doctrine.orm.entity_manager');
  //       $bases = $em->getRepository('AppBundle:NauticBase')
  //                   ->find($request->get('id'));
  //       if (empty($bases)) {
  //         return new JsonResponse(['message' => 'Nautic base not found'], Response::HTTP_NOT_FOUND);
  //       }
  //       $em->remove($bases);
  //       $em->flush();
  //       return new JsonResponse(['message' => 'Nautic base deleted'],Response::HTTP_NO_CONTENT);
  //   }
  //   /**
  //    * @Route("/nauticbases/{id}", name="nauticBase_put_once", methods={"PUT"})
  //    */
  //   public function putNauticBase(Request $request)
  //   {
  //       //get data from HTTP get method
  //       $name = $request->get('name');
  //       $description = $request->get('description');
  //       $address = $request->get('address');
  //       $city = $request->get('city');
  //       $postalCode = $request->get('postalCode');
  //       //Check if one of all HTTP:GET value are empty
  //       if(empty($name) || empty($description) || empty($address) || empty($city) || empty($postalCode))
  //        {
  //          return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
  //        }
  //       //get nauticBase with the id in the url
  //       $em = $this->get('doctrine.orm.entity_manager');
  //       $bases = $em->getRepository('AppBundle:NauticBase')
  //                   ->findById($request->get('id'));
  //       //if the nauticBase in db is empty
  //       if (empty($bases)) {
  //         return new JsonResponse(['message' => 'Nautic base not found'], Response::HTTP_NOT_FOUND);
  //       }
  //       $nauticBase = $bases;
  //       $nauticBase[0]->setName($name)
  //                  ->setDescription($description)
  //                  ->setAddress($address)
  //                  ->setCity($city)
  //                  ->setPostaleCode($postalCode);
  //       $em->persist($nauticBase);
  //       $em->flush();
  //       return new JsonResponse(['message' => 'Nautic base updated'],Response::HTTP_OK);
  //   }
  // /**
}