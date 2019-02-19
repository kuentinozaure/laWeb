<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Entity\MembreResponsable;
use AppBundle\Entity\Ufr;

class MembreResponsableController extends Controller
{
    /**
     * @Route("/members/", name="member_list", methods={"GET"})
     */
    public function getMember(Request $request)
    {
        $members = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:MembreResponsable')
                        ->findBy(array(
                            'estValide'=>1,
                        ));


        if (empty($members))
        {
          return new JsonResponse(['message' => 'Responsable member not found'], Response::HTTP_NOT_FOUND);
        }
                $formatted = [];
                foreach ($members as $member) {
                  $ufr = $this->get('doctrine.orm.entity_manager')
                                  ->getRepository('AppBundle:Ufr')
                                  ->findAll($member->getIdUfr());

                    $formatted[] = [
                       'id' => $member->getId(),
                       'nom' => $member->getNom(),
                       'prenom' => $member->getPrenom(),
                       'mail' => $member->getMail(),
                       'image' => $member->getImage(),
                       'telephone' =>$member ->getTelephone(),
                       'description' => $member->getDescription(),
                       'login' => $member->getLogin(),
                       'mdp' => $member->getMdp(),
                       'estVisible' => $member->getVisible(),
                       'estValide' => $member->getEstValide(),
                       'ufr' => $ufr[0]->getIntitule(),
                    ];
                }
        return new JsonResponse($formatted,Response::HTTP_OK);
    }

    /**
     * @Route("/members/{member_id}/",name="members_once",methods={"GET"})
     */
    public function getOneMembers(Request $request)
    {
        $formatted =[];
        $members = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:MembreResponsable')
                        ->findBy(array(
                            'id'=>$request->get('member_id'),
                            'estValide'=>1,
                        ));

        if (empty($members)) {
            return new JsonResponse(['message' => 'Responsable member not found'], Response::HTTP_NOT_FOUND);
        }
        if(count($members)>1)
        {
          for($i=0;$i< count($members);$i++)
          {
            $ufr = $this->get('doctrine.orm.entity_manager')
                            ->getRepository('AppBundle:Ufr')
                            ->findAll($members[$i]->getIdUfr());

            $formatted[$i]=[
                          'id' => $members[$i]->getId(),
                          'nom' => $members[$i]->getNom(),
                          'prenom' => $members[$i]->getPrenom(),
                          'mail' => $members[$i]->getMail(),
                          'image' => $members[$i]->getImage(),
                          'telephone' =>$members[$i] ->getTelephone(),
                          'description' => $members[$i]->getDescription(),
                          'login' => $members[$i]->getLogin(),
                          'mdp' => $members[$i]->getMdp(),
                          'estVisible' => $members[$i]->getVisible(),
                          'estValide' => $members[$i]->getEstValide(),
                          'ufr' => $ufr[0]->getIntitule(),
                         ];
          }
          return new JsonResponse($formatted);
        }

        $ufr = $this->get('doctrine.orm.entity_manager')
                        ->getRepository('AppBundle:Ufr')
                        ->findAll($members[0]->getIdUfr());

        $formatted = [
                      'id' => $members[0]->getId(),
                      'nom' => $members[0]->getNom(),
                      'prenom' => $members[0]->getPrenom(),
                      'mail' => $members[0]->getMail(),
                      'image' => $members[0]->getImage(),
                      'telephone' =>$members[0] ->getTelephone(),
                      'description' => $members[0]->getDescription(),
                      'login' => $members[0]->getLogin(),
                      'mdp' => $members[0]->getMdp(),
                      'estVisible' => $members[0]->getVisible(),
                      'estValide' => $members[0]->getEstValide(),
                      'ufr' => $ufr[0]->getIntitule(),
                     ];
        return new JsonResponse($formatted);
    }

    
    /**
     * @Route("/members/delete/{id}/", name="members_once_del",methods={"DELETE"})
     */
    public function deleteMember(Request $request)
    {
      $em = $this->get('doctrine.orm.entity_manager');
      $member = $em->getRepository('AppBundle:MembreResponsable')
                      ->find($request->get('id'));
      if (empty($member)) {
          return new JsonResponse(['message' => 'Member not found'], Response::HTTP_NOT_FOUND);
      }
      $em->remove($member);
      $em->flush();
      return new JsonResponse(['message' => 'Member deleted'], Response::HTTP_NOT_FOUND);
    }
}