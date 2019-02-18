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
   * @ManyToOne(targetEntity="Activite")
   * @JoinColumn(name="activite_id", referencedColumnName="id")
   */
  protected $idActivite;

  /**
   * @ManyToOne(targetEntity="Participant")
   * @JoinColumn(name="participant_id", referencedColumnName="id")
   */
  protected $idParticipant;

  /**
   * @ORM\Column(type="integer")
   */
  protected $placeDisponible;

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
    public function getPlaceDisponible()
    {
        return $this->placeDisponible;
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
    public function setPlaceDisponible($placeDisponible)
    {
        $this->placeDisponible = $placeDisponible;
        return $this;
    }
}
