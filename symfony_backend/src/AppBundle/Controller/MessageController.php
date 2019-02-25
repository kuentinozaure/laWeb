<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Message;


class MessageController extends Controller
{
  /**
   * @Route("/message/",name="message_liste", methods={"GET"})
   */
 
  public function getMessage(Request $request)
  {
      $message = $this->get('doctrine.orm.entity_manager')
                      ->getRepository('AppBundle:Message')
                      ->findAll();
      if (empty($message))
      {
        return new JsonResponse(['message' => 'Invalid responsable member list not found'], Response::HTTP_NOT_FOUND);
      }
              $formatted = [];
              foreach ($message as $message) {
                $CategorieMessage = $this->get('doctrine.orm.entity_manager')
                                ->getRepository('AppBundle:CategorieMessage')
                                ->findAll($message->getCategorieMessage());

                  $formatted[] = [
                     'id' => $message->getId(),
                     'nom' => $message->getNom(),
                     'prenom' => $message->getPrenom(),
                     'mail' => $message->getMail(),
                     'message' => $message->getMessage(),
                     'CategorieMessage' => $CategorieMessage[0]->getIntitule(),
                  ];
              }
      return new JsonResponse($formatted,Response::HTTP_OK);
  }

   /**
    * @Route("/message/{id}/", name="message_delete_once", methods={"DELETE"})
    */
        public function deleteMessage(Request $request)
        {
            $em = $this->get('doctrine.orm.entity_manager');
            $message = $em->getRepository('AppBundle:Message')
                        ->find($request->get('id'));
            if (empty($message)) {
              return new JsonResponse(['message' => 'Messagenot found'], Response::HTTP_NOT_FOUND);
            }
            $em->remove($message);
            $em->flush();
            return new JsonResponse(['message' => 'Message deleted'],Response::HTTP_NOT_FOUND);
        }

}
?>