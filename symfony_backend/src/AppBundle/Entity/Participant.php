<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="PARTICIPANT")
 */
class Participant
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
    protected $nom;

    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $prenom;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $mail;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $telephone;

    /**
     * @ManyToOne(targetEntity="Ufr")
     * @JoinColumn(name="ufr_id", referencedColumnName="id")
     */
    protected $idUfr;


    public function getId()
    {
        return $this->id;
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function getPrenom()
    {
        return $this->prenom;
    }
    public function getMail()
    {
        return $this->mail;
    }
    public function getTelephone()
    {
        return $this->telephone;
    }
    public function getIdUfr()
    {
        return $this->idUfr;
    }


    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    public function setNom($nom)
    {
        $this->nom = $nom;
        return $this;
    }
    public function setPrenom($prenom)
    {
        $this->prenom = $prenom;
        return $this;
    }

    public function setMail($mail)
    {
        $this->mail = $mail;
        return $this;
    }
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
        return $this;
    }
    public function setIdUfr($idUfr)
    {
        $this->idUfr = $idUfr;
        return $this;
    }
}
