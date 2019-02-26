<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="AUTH_TOKEN",uniqueConstraints={@ORM\UniqueConstraint(name="auth_tokens_value_unique", columns={"token"})})
 */
class AuthentificationToken
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
    protected $token;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $dateDeCreation;

    public function getId()
    {
        return $this->id;
    }
    public function getToken()
    {
        return $this->token;
    }
    public function getDateDeCreation()
    {
        return $this->dateDeCreation;
    }
    public function setId($id)
    {
      $this->id = $id;
      return $this;
    }
    public function setToken($token)
    {
        $this->token = $token;
        return $this;
    }
    public function setDateDeCreation($date)
    {
        $this->dateDeCreation = $date;
        return $this;
    }

}
