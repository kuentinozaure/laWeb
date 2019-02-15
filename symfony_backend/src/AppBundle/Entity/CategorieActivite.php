<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="CATEGORIE_ACTIVITE")
 */
class CategorieActivite
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $intitule;


    public function getId()
    {
        return $this->id;
    }

    public function getIntitule()
    {
        return $this->intitule;
    }

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    public function setIntitule($intitule)
    {
        $this->intitule = $intitule;
        return $this;
    }
}
