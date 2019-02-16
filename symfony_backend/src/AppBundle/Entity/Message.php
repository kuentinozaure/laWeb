<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="MESSAGE")
 */
class Message
{
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
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
    protected $message;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $auteur;

    /**
     * @ManyToOne(targetEntity="CategorieMessage")
     * @JoinColumn(name="categorieMess_id", referencedColumnName="id")
     */
    protected $idAstuce;

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
    public function getMessage()
    {
        return $this->message;
    }
    public function getAuteur()
    {
        return $this->auteur;
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
    public function setMessage($message)
    {
        $this->message = $message;
        return $this;
    }
    public function setAuteur($auteur)
    {
        $this->auteur = $auteur;
        return $this;
    }
    public function setIdAstuce($idMembre)
    {
      $this->idMembre = $idMembre;
      return $this;
    }
}
