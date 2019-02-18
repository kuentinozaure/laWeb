<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Participe;
use AppBundle\Entity\Participant;
use AppBundle\Entity\Ufr;
use AppBundle\Entity\Activite;

class ParticipeController extends Controller
{
    /**
     * @Route("/participants/{activity_id}/", name="participants_list", methods={"GET"})
     */
    public function getParticipantByActivity(Request $request)
    {
        $participants = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Participe')
                        ->findByIdActivite($request->get('activity_id'));

        if (empty($participants))
        {
          return new JsonResponse(['message' => 'Participant not found'], Response::HTTP_NOT_FOUND);
        }
                $formatted = [];
                foreach ($participants as $participant) {

                  $activite = $this->get('doctrine.orm.entity_manager')
                                  ->getRepository('AppBundle:Activite')
                                  ->findById($participant->getIdActivite());

                  $OneParticipant = $this->get('doctrine.orm.entity_manager')
                                         ->getRepository('AppBundle:Participant')
                                         ->findById($participant->getIdParticipant());

                  $ufr = $this->get('doctrine.orm.entity_manager')
                              ->getRepository('AppBundle:Ufr')
                              ->findById($OneParticipant[0]->getIdUfr());



                    $formatted[] = [
                       'id' => $participant->getId(),
                       'placeRestante' => $participant->getPlaceDisponible(),
                       'nom' => $OneParticipant[0]->getNom(),
                       'prenom' => $OneParticipant[0]->getPrenom(),
                       'mail' => $OneParticipant[0]->getMail(),
                       'telephone' => $OneParticipant[0]->getTelephone(),
                       'intitule' => $ufr[0]->getIntitule(),
                       'titre' =>$activite[0]->getTitre(),
                       'description' => $activite[0]->getDescription(),
                       'dateDebut' => $activite[0]->getDateDebut(),
                       'dateFin' => $activite[0]->getDateFin(),
                       'animateur' => $activite[0]->getAnimateur(),
                       'salle' => $activite[0]->getSalle(),
                       'placeDisponible' => $activite[0]->getPlaceDisponible(),
                    ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }

    /**
     * @Route("/participants/{activity_id}/", name="add_participant_list", methods={"POST"})
     */
    public function addParticipantByActivity(Request $request)
    {
      $idActivity = $request->get('idActivity');
      $idParticipant= $request->get('idParticipant');

      if(empty($idActivity) || empty($idParticipant))
      {
        return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
      }
      //CHECK SI L'UTILISATEUR EST DANS L'ACTIVITE
      $em = $this->getDoctrine()
                 ->getManager();

      $query = $em->createQuery(
          'SELECT count(p.idParticipant)
          FROM AppBundle:Participe p
          WHERE p.idParticipant = :idParticipant
          AND p.idActivite = :idActivity'
      )->setParameter('idParticipant', $idParticipant)
       ->setParameter('idActivity',$idActivity);

      $countUser = $query->getResult();
      $count = $countUser[0][1];

      if($count == 1)
      {
        return new JsonResponse(['message' => 'Participant is already participed'], Response::HTTP_NOT_ACCEPTABLE);
      }

      //RECUPERE LE NOMBRE DE PLACE DISPO DANS L'ACTIVITE
      $query = $em->createQuery(
          'SELECT DISTINCT p.placeDisponible
          FROM AppBundle:Participe p
          WHERE p.idActivite = :idActivity'
      )->setParameter('idActivity',$idActivity);

      $NbPlace = $query->getResult();

      //DECREMENTE LES PLACE DISPONIBLE DE L'ACTIVITE
      $placeDispo = $NbPlace[0]["placeDisponible"] -1;
      $query = $em->createQuery(
          'UPDATE AppBundle:Participe p
          SET p.placeDisponible = :placeDispo
          WHERE p.idActivite = :idActivity'
      )->setParameter('idActivity',$idActivity)
       ->setParameter('placeDispo',$placeDispo);
      $exec = $query->getResult();

      $participant = new Participe();
      $participant->setIdActivite(intval($idActivity))
                 ->setIdParticipant(intval($idParticipant))
                 ->setPlaceDisponible($placeDispo);

      $em = $this->get('doctrine.orm.entity_manager');
      $em->persist($participant);
      $em->flush();
      return new JsonResponse(['message' => 'Participant is created'], Response::HTTP_CREATED);
    }

  // /**
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
}
