<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Message;
use AppBundle\Entity\CategorieMessage;


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
        return new JsonResponse(['message' => 'Message not found'], Response::HTTP_NOT_FOUND);
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
     * @Route("/categoriemessage/", name="categorie_message_list", methods={"GET"})
     */
    public function getUfr(Request $request)
    {
        $categoriemessage = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:CategorieMessage')
                        ->findAll();

        if (empty($categoriemessage))
        {
          return new JsonResponse(['message' => 'categoriemessage not found'], Response::HTTP_NOT_FOUND);
        }
                $formatted = [];
                foreach ($categoriemessage as $categoriemessage) {
                    $formatted[] = [
                       'id' => $categoriemessage->getId(),
                       'intitule' => $categoriemessage->getIntitule(),
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


        /**
     * @Route("/message/{id}/", name="message_once",methods={"GET"})
     */
     public function getOneMessage(Request $request)
     {
         $formatted =[];
         $message = $this->get('doctrine.orm.entity_manager')
                         ->getRepository('AppBundle:Message')
                         ->findById($request->get('id'));

         if (empty($message)) {
             return new JsonResponse(['message' => 'Message not found'], Response::HTTP_NOT_FOUND);
         }
         if(count($message)>1)
         {
           for($i=0;$i< count($message);$i++)
           {
             $categorie = $this->get('doctrine.orm.entity_manager')
                            ->getRepository('AppBundle:CategorieMessage')
                            ->findById($message[$i]->getCategorieMessage());


             $formatted[$i]=[
                           'id' => $message[$i]->getId(),
                           'nom' => $message[$i]->getNom(),
                           'prenom' => $message[$i]->getPrenom(),
                           'message' => $message[$i]->getMessage(),
                           'mail' => $message[$i]->getMail(),
                      
                           'type_astuce' => $categorie[0]->getIntitule(),
                          ];
           }
           return new JsonResponse($formatted);
         }

         $categorie = $this->get('doctrine.orm.entity_manager')
         ->getRepository('AppBundle:CategorieMessage')
         ->findById($message[0]->getCategorieMessage());


        $formatted=[
              'id' => $message[0]->getId(),
               'nom' => $message[0]->getNom(),
               'prenom' => $message[0]->getPrenom(),
              'message' => $message[0]->getMessage(),
                'mail' => $message[0]->getMail(),
   
                'type_astuce' => $categorie[0]->getIntitule(),
       ];
     }


     /**
     * @Route("/message/", name="message_add", methods={"POST"})
     */
    public function addMessage(Request $request)
    {
        //get data from HTTP get method
        $nom = $request->get('nom');
        $prenom = $request->get('prenom');
        $mail = $request->get('mail');
        $message= $request->get('message');
        $CategorieMessage = $request->get('CategorieMessage');
        

        //Check if one of all HTTP:GET value are empty
        if(empty($nom) || empty($prenom) || empty($mail) || empty($message) || empty($CategorieMessage))
         {
           return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
         }
         $CategorieMessage = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:CategorieMessage')
                        ->findById($CategorieMessage);


           $messages = new Message();
           $messages->setNom($nom)
                    ->setPrenom($prenom)
                      ->setMail($mail)
                      ->setMessage($message)
                      ->setidCategorieMessage($CategorieMessage[0]);

           $em = $this->get('doctrine.orm.entity_manager');
           $em->persist($messages);
           $em->flush();
           return new JsonResponse(['message' => 'message is added'], Response::HTTP_CREATED);
    }

}
?>