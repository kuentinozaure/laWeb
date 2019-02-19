<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Astuce;
use AppBundle\Entity\CategorieAstuce;
use AppBundle\Entity\MembreResponsable;

class AstuceController extends Controller
{
    /**
     * @Route("/astuce/", name="astuce_list", methods={"GET"})
     */
    public function getAstuce(Request $request)
    {
        $astuces = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Astuce')
                        ->findAll();

        if (empty($astuces))
        {
          return new JsonResponse(['message' => 'Astuces not found'], Response::HTTP_NOT_FOUND);
        }
                $formatted = [];
                foreach ($astuces as $astuce) {

                  $categorie = $this->get('doctrine.orm.entity_manager')
                                 ->getRepository('AppBundle:CategorieAstuce')
                                 ->findById($astuce->getIdAstuce());

                  $validationMembre = $this->get('doctrine.orm.entity_manager')
                                ->getRepository('AppBundle:MembreResponsable')
                                ->findById($astuce->getIdMembre());

                    $formatted[] = [
                       'id' => $astuce->getId(),
                       'titre' => $astuce->getTitre(),
                       'message' => $astuce->getMessage(),
                       'description' => $astuce->getDescription(),
                       'lienAstuce' => $astuce->getLienAstuce(),
                       'auteur' => $astuce->getAuteur(),
                       'image' => $astuce->getImage(),
                       'type_astuce' => $categorie[0]->getIntitule(),
                       'valide_par' => $validationMembre[0]->getNom()." ".$validationMembre[0]->getPrenom(),
                       'estValide' => $astuce->getEstValide(),
                    ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }
    /**
     * @Route("/astuce/{astuce_id}/", name="astuce_once",methods={"GET"})
     */
     public function getOneAstuce(Request $request)
     {
         $formatted =[];
         $astuce = $this->get('doctrine.orm.entity_manager')
                         ->getRepository('AppBundle:Astuce')
                         ->findById($request->get('astuce_id'));

         if (empty($astuce)) {
             return new JsonResponse(['message' => 'Astuce not found'], Response::HTTP_NOT_FOUND);
         }
         if(count($astuce)>1)
         {
           for($i=0;$i< count($astuce);$i++)
           {
             $categorie = $this->get('doctrine.orm.entity_manager')
                            ->getRepository('AppBundle:CategorieAstuce')
                            ->findById($astuce[$i]->getIdAstuce());

             $validationMembre = $this->get('doctrine.orm.entity_manager')
                           ->getRepository('AppBundle:MembreResponsable')
                           ->findById($astuce[$i]->getIdMembre());

             $formatted[$i]=[
                           'id' => $astuce[$i]->getId(),
                           'titre' => $astuce[$i]->getTitre(),
                           'message' => $astuce[$i]->getMessage(),
                           'description' => $astuce[$i]->getDescription(),
                           'lienAstuce' => $astuce[$i]->getLienAstuce(),
                           'auteur' => $astuce[$i]->getAuteur(),
                           'image' => $astuce[$i]->getImage(),
                           'type_astuce' => $categorie[0]->getIntitule(),
                           'valide_par' => $validationMembre[0]->getNom()." ".$validationMembre[0]->getPrenom(),
                          ];
           }
           return new JsonResponse($formatted);
         }

         $categorie = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:CategorieAstuce')
                        ->findById($astuce[0]->getIdAstuce());

         $validationMembre = $this->get('doctrine.orm.entity_manager')
                       ->getRepository('AppBundle:MembreResponsable')
                       ->findById($astuce[0]->getIdMembre());

         $formatted = [
                       'id' => $astuce[0]->getId(),
                       'titre' => $astuce[0]->getTitre(),
                       'message' => $astuce[0]->getMessage(),
                       'description' => $astuce[0]->getDescription(),
                       'lienAstuce' => $astuce[0]->getLienAstuce(),
                       'auteur' => $astuce[0]->getAuteur(),
                       'image' => $astuce[0]->getImage(),
                       'type_astuce' => $categorie[0]->getIntitule(),
                       'valide_par' => $validationMembre[0]->getNom()." ".$validationMembre[0]->getPrenom(),
                      ];
         return new JsonResponse($formatted);
     }


     /**
        * @Route("/astuce/{astuce_id}/", name="astuce_delete_once", methods={"DELETE"})

        */
        public function deleteInvalidAstuce(Request $request)
        {
            $em = $this->get('doctrine.orm.entity_manager');
            $astuce = $em->getRepository('AppBundle:Astuce')
                        ->find($request->get('astuce_id'));
            if (empty($astuce)) {
              return new JsonResponse(['message' => 'Astucenot found'], Response::HTTP_NOT_FOUND);
            }
            $em->remove($astuce);
            $em->flush();
            return new JsonResponse(['message' => 'Astuce deleted'],Response::HTTP_NOT_FOUND);
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
