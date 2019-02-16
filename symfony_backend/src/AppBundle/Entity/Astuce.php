<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="ASTUCE")
 */
class Astuce
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
    protected $titre;

    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $message;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $description;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $lienAstuce;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $auteur;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $image;

    /**
     * @ManyToOne(targetEntity="MembreResponsable")
     * @JoinColumn(name="membre_id", referencedColumnName="id")
     */
    protected $idMembre;

    /**
     * @ManyToOne(targetEntity="CategorieAstuce")
     * @JoinColumn(name="categorieAstuce_id", referencedColumnName="id")
     */
    protected $idAstuce;



    public function getId()
    {
        return $this->id;
    }

    public function getTitre()
    {
        return $this->titre;
    }

    public function getMessage()
    {
        return $this->message;
    }
    public function getDescription()
    {
        return $this->description;
    }
    public function getLienAstuce()
    {
        return $this->lienAstuce;
    }
    public function getAuteur()
    {
        return $this->auteur;
    }
    public function getImage()
    {
        return $this->image;
    }
    public function getIdMembre()
    {
      return $this->idMembre;
    }
    public function getIdAstuce()
    {
      return $this->idAstuce;
    }
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    public function setTitre($titre)
    {
        $this->titre = $titre;
        return $this;
    }
    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }

    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }
    public function setLienAstuce($lienAstuce)
    {
        $this->lienAstuce = $lienAstuce;
        return $this;
    }
    public function setAuteur($auteur)
    {
        $this->auteur = $auteur;
        return $this;
    }
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }
    public function setIdMembre($idMembre)
    {
      $this->idMembre = $idMembre;
      return $this;
    }
    public function setIdAstuce($idAstuce)
    {
      $this->idAstuce = $idAstuce;
      return $this;
    }
}
