<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;
/**
 * @ORM\Entity()
 * @ORM\Table(name="MEMBRE_RESPONSABLE")
 */
class MembreResponsable
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
    protected $image;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $telephone;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $description;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $login;
    /**
     * @ORM\Column(type="string",length=255)
     */
    protected $mdp;
    /**
     * @ORM\Column(type="boolean",length=255)
     */
    protected $visible;
    /**
     * @ORM\Column(type="boolean",length=255)
     */
    protected $estValide;
    /**
     * @ManyToOne(targetEntity="Ufr")
     * @JoinColumn(name="ufr_id", referencedColumnName="id")
     */
    protected $idUfr;

    /**
     * @ManyToOne(targetEntity="AuthentificationToken",cascade={"persist"})
     * @JoinColumn(name="token_id", referencedColumnName="id")
     */
    protected $token;


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
    public function getImage()
    {
      return $this->image;
    }
    public function getMail()
    {
        return $this->mail;
    }
    public function getTelephone()
    {
      return $this->telephone;
    }
    public function getDescription()
    {
        return $this->description;
    }
    public function getlogin()
    {
        return $this->login;
    }
    public function getMdp()
    {
        return $this->mdp;
    }
    public function getVisible()
    {
        return $this->visible;
    }
    public function getEstValide()
    {
        return $this->estValide;
    }
    public function getIdUfr()
    {
      return $this->idUfr;
    }

    public function getToken() : ?AuthentificationToken
    {
      return $this->token;
    }

    public function setToken(?AuthentificationToken $token):self
    {
      $this->token = $token;
      return $this;
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

    public function setImage($image)
    {
      $this->image = $image;
      return $this;
    }
    public function setMail($mail)
    {
        $this->mail = $mail;
        return $this;
    }
    public function setTelephone($tel)
    {
      $this->telephone = $tel;
      return $this;
    }
    public function setDescription($des)
    {
        $this->description = $des;
        return $this;
    }
    public function setlogin($login)
    {
        $this->login = $login;
        return $this;
    }
    public function setMdp($mdp)
    {
        $this->mdp = $mdp;
        return $this;
    }
    public function setVisible($visible)
    {
        $this->visible = $visible;
        return $this;
    }
    public function setEstValide($estValide)
    {
        $this->estValide = $estValide;
        return $this;
    }
    public function setIdUfr($idUfr)
    {
      $this->idUfr = $idUfr;
      return $this;
    }
}
