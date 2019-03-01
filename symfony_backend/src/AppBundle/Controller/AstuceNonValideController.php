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

class AstuceNonValideController extends Controller
{
/**
 * @Route("/unvalidateAstuces/",name="unvalideAstuce_list",methods={"GET"})
 */
public function getAstucesUnvalidate(Request $request)
{
    $astuces = $this->get('doctrine.orm.entity_manager')
                    ->getRepository('AppBundle:Astuce')
                    ->findBy(array(
                        'estValide' => 0,
                    ));

    if (empty($astuces))
    {
        return new JsonResponse(['message' => 'Astuces not found'], Response::HTTP_NOT_FOUND);
    }
            $formatted = [];
            foreach ($astuces as $astuce) {

                $categorieAstuce = $this->get('doctrine.orm.entity_manager')
                                ->getRepository('AppBundle:CategorieAstuce')
                                ->findById($astuce->getIdAstuce());

                    $formatted[] = [
                        'id' => $astuce->getId(),
                        'titre' => $astuce->getTitre(),
                        'message' => $astuce->getMessage(),
                        'description' => $astuce->getDescription(),
                        'lienAstuce' => $astuce->getLienAstuce(),
                        'auteur' => $astuce->getAuteur(),
                        'image' => $astuce->getImage(),
                        'categorieAstuce' =>$categorieAstuce[0]->getIntitule(),
                        'valide_par' => "NULL",
                        'estValide' => $astuce->getEstValide(),
                    ];
            }
    return new JsonResponse($formatted,Response::HTTP_OK);
}
/**
 * @Route("/unvalidateAstuces/{id_astuce}/", name="unvalidateAstuce_once",methods={"GET"})
 */
public function getOneUnvalidAstuce(Request $request)
{
    $formatted =[];
    $astuce = $this->get('doctrine.orm.entity_manager')
                    ->getRepository('AppBundle:Astuce')
                    ->findBy(array(
                        'estValide' => 0,
                        'id' => $request->get('id_astuce')

                    ));

    if (empty($astuce)) {
        return new JsonResponse(['message' => 'Astuce not found'], Response::HTTP_NOT_FOUND);
    }
    if(count($astuce)>1)
    {
        for($i=0;$i< count($activity);$i++)
        {
        $categorieAstuce = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:CategorieAstuce')
                        ->findById($astuce[$i]->getIdAstuce());

                        

        $formatted[$i]=[
                    'id' => $astuce[$i]->getId(),
                    'titre' => $astuce[$i]->getTitre(),
                    'message' => $astuce[$i]->getMessage(),
                    'description' => $astuce[$i]->getDescription(),
                    'lienAstuce' => $astuce[$i]->getLienAstuce(),
                    'auteur' => $astuce[$i]->getAuteur(),
                    'image' => $astuce[$i]->getImage(),
                    'categorieAstuce' =>$categorieAstuce[0]->getIntitule(),
                    'valide_par' => "NULL",
                    'estValide' => $astuce[$i]->getEstValide(),
                        ];
        }
        return new JsonResponse($formatted);
    }

    $categorieAstuce = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:CategorieAstuce')
                        ->findById($astuce[0]->getIdAstuce());

    $formatted = [
                'id' => $astuce[0]->getId(),
                'titre' => $astuce[0]->getTitre(),
                'message' => $astuce[0]->getMessage(),
                'description' => $astuce[0]->getDescription(),
                'lienAstuce' => $astuce[0]->getLienAstuce(),
                'auteur' => $astuce[0]->getAuteur(),
                'image' => $astuce[0]->getImage(),
                'categorieAstuce' =>$categorieAstuce[0]->getIntitule(),
                'valide_par' => "NULL",
                'estValide' => $astuce[0]->getEstValide(),
                    ];
    return new JsonResponse($formatted);
}
}
