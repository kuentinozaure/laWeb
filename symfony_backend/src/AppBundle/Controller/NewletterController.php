<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Newsletter;

class NewletterController extends Controller
{
    
    /**
     * @Route("/newletter/", name="add_newletter", methods={"POST"})
     */
    public function addParticipanttoNewletter(Request $request)
    {
         //get data from HTTP get method
         $nom = $request->get('nom');
         $prenom = $request->get('prenom');
         $mail = $request->get('mail');
         
      if(empty($nom)||empty($prenom)||empty($mail))
      {
        return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
      }
      //CHECK SI L'UTILISATEUR EST DANS L'ACTIVITE
      $em = $this->getDoctrine()
                 ->getManager();

      $Newsletter = new Newsletter();
      $Newsletter->setTitre($nom)
                 ->setMessage($prenom)
                 ->setMail($mail);


      $em = $this->get('doctrine.orm.entity_manager');
      $em->persist($Newsletter);
      $em->flush();
      return new JsonResponse(['message' => 'Newsletter is created'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/newletter/", name="get_newletter", methods={"GET"})
     */
    public function getParticipantToNewletter(Request $request)
    {
         
        $newsletters = $this->get('doctrine.orm.entity_manager')
        ->getRepository('AppBundle:Newsletter')
        ->findAll();

        if (empty($newsletters))
        {
        return new JsonResponse(['message' => 'Newsletters not found'], Response::HTTP_NOT_FOUND);
        }
        $formatted = [];
        foreach ($newsletters as $newsletter) {

                $formatted[] = [
                    'id' => $newsletter->getId(),
                    'nom' => $newsletter->getNom(),
                    'prenom' => $newsletter->getPrenom(),
                    'mail' => $newsletter->getMail(),
                ];
        }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }

    /**
     * @Route("/newletter/{id}/", name="newsletters_once_del",methods={"DELETE"})
     */
    public function deleteNewsletter(Request $request)
    {
      $em = $this->get('doctrine.orm.entity_manager');
      $newletter = $em->getRepository('AppBundle:Newsletter')
                      ->find($request->get('id'));

      if (empty($newletter)) {
          return new JsonResponse(['message' => 'Newletter not found'], Response::HTTP_NOT_FOUND);
      }
      $em->remove($newletter);
      $em->flush();
      return new JsonResponse(['message' => 'Newletter deleted'], Response::HTTP_NOT_FOUND);
    }
}

?>