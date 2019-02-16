<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="NEWSLETTER")
 */
class Newsletter
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
    protected $prenom ;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $mail;

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

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    public function setTitre($nom)
    {
        $this->nom = $nom;
        return $this;
    }
    public function setMessage($prenom)
    {
        $this->prenom = $prenom;
        return $this;
    }
    public function setMail($mail)
    {
        $this->mail = $mail;
        return $this;
    }
}
