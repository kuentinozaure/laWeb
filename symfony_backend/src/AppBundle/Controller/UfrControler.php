<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Ufr;

class UfrControler extends Controller
{
    /**
     * @Route("/ufr/", name="ufr_list", methods={"GET"})
     */
    public function getActivite(Request $request)
    {
        $ufrs = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Ufr')
                        ->findAll();

        if (empty($ufrs))
        {
          return new JsonResponse(['message' => 'UFR not found'], Response::HTTP_NOT_FOUND);
        }
                $formatted = [];
                foreach ($ufrs as $ufr) {
                    $formatted[] = [
                       'id' => $ufr->getId(),
                       'intitule' => $ufr->getIntitule(),
                    ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }
    /**
     * @Route("/ufr/{ufr_id}/", name="activite_once",methods={"GET"})
     */
    public function getNauticBase(Request $request)
    {
        $formatted =[];
        $Ufrs = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Ufr')
                        ->findById($request->get('ufr_id'));

        if (empty($Ufrs)) {
            return new JsonResponse(['message' => 'UFR not found'], Response::HTTP_NOT_FOUND);
        }
        if(count($Ufrs)>1)
        {
          for($i=0;$i< count($Ufrs);$i++)
          {
            $formatted[$i]=[
                          'id' => $Ufrs[$i]->getId(),
                          'intitule' => $Ufrs[$i]->getIntitule(),
                         ];
          }
          return new JsonResponse($formatted);
        }

        $formatted = [
                      'id' => $Ufrs[0]->getId(),
                      'intitule' => $Ufrs[0]->getIntitule(),
                     ];
        return new JsonResponse($formatted);
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
