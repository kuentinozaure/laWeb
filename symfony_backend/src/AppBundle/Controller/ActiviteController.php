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
use AppBundle\Entity\Participe;

class ActiviteController extends Controller
{
    /**
     * @Route("/activity/", name="activity_list", methods={"GET"})
     */
    public function getActivite(Request $request)
    {
        $activites = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Activite')
                        ->findBy(array(
                            'estValide' => 1,

                        ));

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

                  $em = $this->getDoctrine()
                             ->getManager();

                  $query = $em->createQuery(
                      'SELECT count(p.id)
                       FROM AppBundle:Participe p
                       WHERE p.idActivite = :idActivity'
                      )->setParameter('idActivity',$activity->getId());

                      $NbPlace = $query->getResult();
                      $placeDispo = $NbPlace[0][1];

                      $formatted[] = [
                         'id' => $activity->getId(),
                         'titre' => $activity->getTitre(),
                         'description' => $activity->getDescription(),
                         'dateDebut' => $activity->getDateDebut(),
                         'dateFin' => $activity->getDateFin(),
                         'animateur' => $activity->getAnimateur(),
                         'salle' => $activity->getSalle(),
                         'placeDisponible' => $activity->getPlaceDisponible(),
                         'placeRestante' =>$activity->getPlaceDisponible()-$placeDispo,
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
                        ->findBy(array(
                            'estValide' => 1,
                            'id' => $request->get('activity_id')

                        ));
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

                          $em = $this->getDoctrine()
                                     ->getManager();

                          $query = $em->createQuery(
                              'SELECT count(p.id)
                               FROM AppBundle:Participe p
                               WHERE p.idActivite = :idActivity'
                              )->setParameter('idActivity',$activity[$i]->getId());

                              $NbPlace = $query->getResult();
                              $placeDispo = $NbPlace[0][1];

            $formatted[$i]=[
                          'id' => $activity[$i]->getId(),
                          'titre' => $activity[$i]->getTitre(),
                          'description' => $activity[$i]->getDescription(),
                          'dateDebut' => $activity[$i]->getDateDebut(),
                          'dateFin' => $activity[$i]->getDateFin(),
                          'animateur' => $activity[$i]->getAnimateur(),
                          'salle' => $activity[$i]->getSalle(),
                          'placeDisponible' => $activity[$i]->getPlaceDisponible(),
                          'placeRestante' =>$activity[$i]->getPlaceDisponible()-$placeDispo,
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

                      $em = $this->getDoctrine()
                                 ->getManager();

                      $query = $em->createQuery(
                          'SELECT count(p.id)
                           FROM AppBundle:Participe p
                           WHERE p.idActivite = :idActivity'
                          )->setParameter('idActivity',$activity[0]->getId());

                          $NbPlace = $query->getResult();
                          $placeDispo = $NbPlace[0][1];

        $formatted = [
                      'id' => $activity[0]->getId(),
                      'titre' => $activity[0]->getTitre(),
                      'description' => $activity[0]->getDescription(),
                      'dateDebut' => $activity[0]->getDateDebut(),
                      'dateFin' => $activity[0]->getDateFin(),
                      'animateur' => $activity[0]->getAnimateur(),
                      'salle' => $activity[0]->getSalle(),
                      'placeDisponible' => $activity[0]->getPlaceDisponible(),
                      'placeRestante' =>$activity[0]->getPlaceDisponible()-$placeDispo,
                      'categorie' => $categorie[0]->getIntitule(),
                      'estValidePar' => $validationMembre[0]->getNom()." ".$validationMembre[0]->getPrenom(),
                     ];
        return new JsonResponse($formatted);
    }



    /**
     * @Route("/activity/", name="activity_add", methods={"POST"})
     */
     public function addInvalidActivite(Request $request)
       {
           //get data from HTTP get method
           $titre = $request->get('titre');
           $description = $request->get('description');
           $dateDebut = $request->get('dateDebut');
           $dateFin = $request->get('dateFin');
           $salle = $request->get('salle');
           $animateur = $request ->get('animateur');
           $placeDisponible = $request -> get('placeDispo');
           $idCateg= $request-> get('idCateg');

           //Check if one of all HTTP:GET value are empty
           if(empty($titre) || empty($description) || empty($dateDebut) || empty($dateFin) || empty($salle) || empty($animateur) || empty($placeDisponible) || empty($idCateg))
            {
              return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
            }
            $categorie = $this->get('doctrine.orm.entity_manager')
                           ->getRepository('AppBundle:CategorieActivite')
                           ->findById($idCateg);


              $activity = new Activite();
              $activity->setTitre($titre)
                       ->setDescription($description)
                         ->setDateDebut($dateDebut)
                         ->setDateFin($dateFin)
                         ->setSalle($salle)
                         ->setPlaceDisponible($placeDisponible)
                         ->setIdCategorieActivite($categorie[0])
                         ->setAnimateur($animateur)
                         ->setEstValide(false);

              $em = $this->get('doctrine.orm.entity_manager');
              $em->persist($activity);
              $em->flush();
              return new JsonResponse(['message' => 'activity is added'], Response::HTTP_CREATED);
       }

       /**
        * @Route("/activity/{id}/", name="activity_delete_once", methods={"DELETE"})
        */
       public function deleteInvalidActivity(Request $request)
       {
           $em = $this->get('doctrine.orm.entity_manager');
           $activity = $em->getRepository('AppBundle:Activite')
                       ->find($request->get('id'));
           if (empty($activity)) {
             return new JsonResponse(['message' => 'Activitynot found'], Response::HTTP_NOT_FOUND);
           }
           $em->remove($activity);
           $em->flush();
           return new JsonResponse(['message' => 'Activity deleted'],Response::HTTP_NOT_FOUND);
       }


    /**
     * @Route("/activity/{id}/", name="activity_put_once", methods={"PUT"})
     */
    public function putUnvalidActivity(Request $request)
    {
      //get data from HTTP get method
      $titre = $request->get('titre');
      $description = $request->get('description');
      $dateDebut = $request->get('dateDebut');
      $dateFin = $request->get('dateFin');
      $salle = $request->get('salle');
      $animateur = $request ->get('animateur');
      $placeDisponible = $request -> get('placeDispo');
      $idCateg= $request-> get('idCateg');

      //Check if one of all HTTP:GET value are empty
      if(empty($titre) || empty($description) || empty($dateDebut) || empty($dateFin) || empty($salle) || empty($animateur) || empty($placeDisponible) || empty($idCateg))
       {
         return new JsonResponse(['message' => 'NULL VALUES ARE NOT ALLOWED'], Response::HTTP_NOT_ACCEPTABLE);
       }
       $em = $this->get('doctrine.orm.entity_manager');
       $activity = $em->getRepository('AppBundle:Activite')
                      ->findById($request->get('id'));

       $categorie = $this->get('doctrine.orm.entity_manager')
                      ->getRepository('AppBundle:CategorieActivite')
                      ->findById($idCateg);

         $act = $activity;

         $act[0]->setTitre($titre)
                  ->setDescription($description)
                    ->setDateDebut($dateDebut)
                    ->setDateFin($dateFin)
                    ->setSalle($salle)
                    ->setPlaceDisponible($placeDisponible)
                    ->setIdCategorieActivite($categorie[0])
                    ->setAnimateur($animateur);

         $em->persist($act[0]);
         $em->flush();
         return new JsonResponse(['message' => 'activity updated'], Response::HTTP_CREATED);
    }

    /**
     * @Route("/activity/{idAct}/{idMembre}/", name="validate_activity", methods={"PUT"})
     */
    public function validateActivity(Request $request)
    {
       $em = $this->get('doctrine.orm.entity_manager');
       
       $activity = $em->getRepository('AppBundle:Activite')
                      ->findById($request->get('idAct'));

       $membre = $em->getRepository('AppBundle:MembreResponsable')
                    ->findById($request->get('idMembre'));

         $act = $activity;

         $act[0]->setEstValide(1)
                ->setIdMembre($membre[0]);

         $em->persist($act[0]);
         $em->flush();
         return new JsonResponse(['message' => 'activity updated'], Response::HTTP_CREATED);
    }
}

