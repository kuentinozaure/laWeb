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

class UnvalidateActiviteController extends Controller
{
    /**
     * @Route("/unvalidate/",name="Uactivity_list",methods={"GET"})
     */
    public function getActiviteUnvalidate(Request $request)
    {
        $activites = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Activite')
                        ->findBy(array(
                            'estValide' => 0,
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
                         'valide_par' => "NULL",
                      ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }
    /**
     * @Route("/unvalidate/{activity_id}/", name="Uactivite_once",methods={"GET"})
     */
    public function getOneUnvalidActivity(Request $request)
    {
        $formatted =[];
        $activity = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Activite')
                        ->findBy(array(
                            'estValide' => 0,
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
                          'estValidePar' => "NULL",
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
                      'estValidePar' => "NULL",
                     ];
        return new JsonResponse($formatted);
    }
}
