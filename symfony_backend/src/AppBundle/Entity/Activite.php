<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="ACTIVITE")
 */
class Activite
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
    protected $description;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $dateDebut;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $dateFin;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $salle;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $animateur;
    /**
     * @ORM\Column(type="integer")
     */
    protected $placeDisponible;

    /**
     * @ManyToOne(targetEntity="CategorieActivite")
     * @JoinColumn(name="categorieAct_id", referencedColumnName="id")
     */
    protected $idCategorieActivite;

    /**
     * @ORM\Column(type="boolean",length=255)
     */
    protected $estValide;

    /**
     * @ManyToOne(targetEntity="MembreResponsable")
     * @JoinColumn(name="valide_par", referencedColumnName="id")
     */
    protected $idMembre;


    public function getId()
    {
        return $this->id;
    }

    public function getTitre()
    {
        return $this->titre;
    }

    public function getDescription()
    {
        return $this->description;
    }
    public function getDateDebut()
    {
        return $this->dateDebut;
    }
    public function getDateFin()
    {
        return $this->dateFin;
    }
    public function getSalle()
    {
        return $this->salle;
    }
    public function getAnimateur()
    {
        return $this->animateur;
    }
    public function getPlaceDisponible()
    {
        return $this->placeDisponible;
    }
    public function getEstValide()
    {
      return $this->estValide;
    }
    public function getIdCategorieActivite()
    {
      return $this->idCategorieActivite;
    }
    public function getIdMembre()
    {
      return $this->idMembre;
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
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    public function setDateDebut($dateDebut)
    {
        $this->dateDebut = $dateDebut;
        return $this;
    }
    public function setDateFin($dateFin)
    {
        $this->dateFin = $dateFin;
        return $this;
    }
    public function setSalle($salle)
    {
        $this->salle = $salle;
        return $this;
    }
    public function setAnimateur($animateur)
    {
        $this->animateur = $animateur;
        return $this;
    }
    public function setPlaceDisponible($placeDisponible)
    {
        $this->placeDisponible = $placeDisponible;
        return $this;
    }
    public function setEstValide($estValide)
    {
      $this->estValide = $estValide;
      return $this;
    }
    public function setIdCategorieActivite($idCategorieActivite)
    {
      $this->idCategorieActivite = $idCategorieActivite;
      return $this;
    }
    public function setIdMembre($idMembre)
    {
      $this->idMembre = $idMembre;
      return $this;
    }

}
