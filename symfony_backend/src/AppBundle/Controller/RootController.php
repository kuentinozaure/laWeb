<?php
namespace AppBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RootController extends Controller
{
    /**
     * @Route("/", name="root", methods={"GET"})
     */
    public function getRoot(Request $request)
    {
                      $formatted[] = [
                         'Message' => "Welcome to the laWeb api",
                      ];
        return new JsonResponse($formatted,Response::HTTP_OK);
    }

}
