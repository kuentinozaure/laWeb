<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Participant;
use AppBundle\Entity\Ufr;

class ParticipantController extends Controller
{
  /**
   * @Route("/participant/", name="add_participant", methods={"POST"})
   */
  public function addParticipantByActivity(Request $request)
  {
    $nom = $request->get('nom');
    $prenom = $request->get('prenom');
    $mail = $request->get('mail');
    $telephone = $request->get('telephone');
    $ufrId = $request->get('ufr');

    if(empty($nom) || empty($prenom) || empty($mail) || empty($telephone) || empty($ufrId))
     {
       return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
     }

     $ufr = $this->get('doctrine.orm.entity_manager')
                    ->getRepository('AppBundle:Ufr')
                    ->findById($ufrId);

     $participant = new Participant();
     $participant->setNom($nom)
                 ->setPrenom($prenom)
                 ->setMail($mail)
                 ->setTelephone($telephone)
                 ->setIdUfr($ufr[0]);

     $em = $this->get('doctrine.orm.entity_manager');
     $em->persist($participant);
     $em->flush();

     return new JsonResponse(['message' => 'Participant is created','id' => $participant->getId(),], Response::HTTP_CREATED);
  }

}
?>
