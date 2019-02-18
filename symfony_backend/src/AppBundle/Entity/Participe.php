<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToOne;
use Doctrine\ORM\Mapping\JoinColumn;

/**
 * @ORM\Entity()
 * @ORM\Table(name="PARTICIPE")
 */
class Participe
{
  /**
   * @ORM\Column(type="integer")
   * @ORM\Id
   * @ORM\GeneratedValue
   */
  protected $id;
  /**
   *@ORM\Column(type="integer")
   * @ManyToOne(targetEntity="Activite")
   * @JoinColumn(name="activite_id", referencedColumnName="id")
   */
  protected $idActivite;

  /**
   *@ORM\Column(type="integer")
   * @ManyToOne(targetEntity="Participant")
   * @JoinColumn(name="participant_id", referencedColumnName="id")
   */
  protected $idParticipant;


    public function getId()
    {
        return $this->id;
    }
    public function getIdActivite()
    {
        return $this->idActivite;
    }

    public function getIdParticipant()
    {
        return $this->idParticipant;
    }
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    public function setIdActivite($idAct)
    {
        $this->idActivite = $idAct;
        return $this;
    }
    public function setIdParticipant($idparticipant)
    {
        $this->idParticipant = $idparticipant;
        return $this;
    }
}
