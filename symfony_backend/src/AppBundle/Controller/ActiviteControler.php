<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\Activite;
use AppBundle\Entity\CategorieActivite;
use AppBundle\Entity\MembreResponsable;

class ActiviteControler extends Controller
{
    /**
     * @Route("/activity/", name="activity_list", methods={"GET"})
     */
    public function getActivite(Request $request)
    {
        $activites = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Activite')
                        ->findAll();

        if (empty($activites))
        {
          return new JsonResponse(['message' => 'activities not found'], Response::HTTP_NOT_FOUND);
        }
                $formatted = [];
                foreach ($activites as $activity) {

                  $categorie = $this->get('doctrine.orm.entity_manager')
                                 ->getRepository('AppBundle:CategorieActivite')
                                 ->findById($activity->getIdCategorieActivite());

                  $validationMembre = $this->get('doctrine.orm.entity_manager')
                                ->getRepository('AppBundle:MembreResponsable')
                                ->findById($activity->getIdMembre());

                    $formatted[] = [
                       'id' => $activity->getId(),
                       'titre' => $activity->getTitre(),
                       'description' => $activity->getDescription(),
                       'dateDebut' => $activity->getDateDebut(),
                       'dateFin' => $activity->getDateFin(),
                       'animateur' => $activity->getAnimateur(),
                       'salle' => $activity->getSalle(),
                       'placeDisponible' => $activity->getPlaceDisponible(),
                       'categorie' => $categorie[0]->getIntitule(),
                       'estValidePar' => $validationMembre[0]->getNom()." ".$validationMembre[0]->getPrenom(),
                    ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }
    /**
     * @Route("/activity/{activity_id}/", name="activite_once",methods={"GET"})
     */
    public function getOneActivity(Request $request)
    {
        $formatted =[];
        $activity = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Activite')
                        ->findById($request->get('activity_id'));
        if (empty($activity)) {
            return new JsonResponse(['message' => 'Activity not found'], Response::HTTP_NOT_FOUND);
        }
        if(count($activity)>1)
        {
          for($i=0;$i< count($activity);$i++)
          {
            $categorie = $this->get('doctrine.orm.entity_manager')
                           ->getRepository('AppBundle:CategorieActivite')
                           ->findById($activity[$i]->getIdCategorieActivite());

            $validationMembre = $this->get('doctrine.orm.entity_manager')
                          ->getRepository('AppBundle:MembreResponsable')
                          ->findById($activity[$i]->getIdMembre());

            $formatted[$i]=[
                          'id' => $activity[$i]->getId(),
                          'titre' => $activity[$i]->getTitre(),
                          'description' => $activity[$i]->getDescription(),
                          'dateDebut' => $activity[$i]->getDateDebut(),
                          'dateFin' => $activity[$i]->getDateFin(),
                          'animateur' => $activity[$i]->getAnimateur(),
                          'salle' => $activity[$i]->getSalle(),
                          'placeDisponible' => $activity[$i]->getPlaceDisponible(),
                          'categorie' => $categorie[0]->getIntitule(),
                          'estValidePar' => $validationMembre[0]->getNom()." ".$validationMembre[0]->getPrenom(),
                         ];
          }
          return new JsonResponse($formatted);
        }

        $categorie = $this->get('doctrine.orm.entity_manager')
                       ->getRepository('AppBundle:CategorieActivite')
                       ->findById($activity[0]->getIdCategorieActivite());

        $validationMembre = $this->get('doctrine.orm.entity_manager')
                      ->getRepository('AppBundle:MembreResponsable')
                      ->findById($activity[0]->getIdMembre());

        $formatted = [
                      'id' => $activity[0]->getId(),
                      'titre' => $activity[0]->getTitre(),
                      'description' => $activity[0]->getDescription(),
                      'dateDebut' => $activity[0]->getDateDebut(),
                      'dateFin' => $activity[0]->getDateFin(),
                      'animateur' => $activity[0]->getAnimateur(),
                      'salle' => $activity[0]->getSalle(),
                      'placeDisponible' => $activity[0]->getPlaceDisponible(),
                      'categorie' => $categorie[0]->getIntitule(),
                      'estValidePar' => $validationMembre[0]->getNom()." ".$validationMembre[0]->getPrenom(),
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
