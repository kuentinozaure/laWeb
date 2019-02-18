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
     * @Route("/participe/{activity_id}/", name="participants_list", methods={"GET"})
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

                  $em = $this->getDoctrine()
                             ->getManager();

                  $query = $em->createQuery(
                          'SELECT count(p.id)
                           FROM AppBundle:Participe p
                           WHERE p.idActivite = :idActivity'
                          )->setParameter('idActivity',$request->get('activity_id'));

                  $countPlace = $query->getResult();
                  $placeDispo = $countPlace[0][1];

                    $formatted[] = [
                       'id' => $participant->getId(),
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
                       'placeRestante' => $activite[0]->getPlaceDisponible()-$placeDispo,
                    ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }

    /**
     * @Route("/participe/", name="add_participant_list", methods={"POST"})
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
        'SELECT count(p.id)
         FROM AppBundle:Participe p
         WHERE p.idActivite = :idActivity'
      )->setParameter('idActivity',$idActivity);

      $NbPlace = $query->getResult();

      if($NbPlace == 0)
      {
        return new JsonResponse(['message' => 'Particpant cant add because the activity is full'], Response::HTTP_NOT_ACCEPTABLE);
      }

      $participant = new Participe();
      $participant->setIdActivite(intval($idActivity))
                 ->setIdParticipant(intval($idParticipant));

      $em = $this->get('doctrine.orm.entity_manager');
      $em->persist($participant);
      $em->flush();
      return new JsonResponse(['message' => 'Participant is created'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/participe/{activity_id}/{user_id}/", name="participant_delete_once", methods={"DELETE"})
     */
    public function deleteParticipant(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');

        $participant = $em->getRepository('AppBundle:Participe')
                          ->findBy(array(
                            'idParticipant'=>$request->get('user_id'),
                            'idActivite' =>$request->get('activity_id'),
                          ));

        if(empty($participant))
        {
          return new JsonResponse(['message' => 'Participant not found'], Response::HTTP_NOT_FOUND);
        }

        $partRemove = $em->getRepository('AppBundle:Participe')
                          ->find($participant[0]->getId());

        if (empty($partRemove)) {
          return new JsonResponse(['message' => 'Participant not found'], Response::HTTP_NOT_FOUND);
        }

        $em->remove($partRemove);
        $em->flush();
        return new JsonResponse(['message' => 'participant deleted from activity'], Response::HTTP_NOT_FOUND);
    }
}
