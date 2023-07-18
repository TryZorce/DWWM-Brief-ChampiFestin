<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PromotionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PromotionRepository::class)]
#[ApiResource]
class Promotion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 15)]
    private ?string $code = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $value = null;

    #[ORM\Column]
    private ?bool $percentage = null;

    #[ORM\OneToMany(mappedBy: 'promotion', targetEntity: Order::class)]
    private Collection $commands;

    public function __construct()
    {
        $this->commands = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): static
    {
        $this->value = $value;

        return $this;
    }

    public function isPercentage(): ?bool
    {
        return $this->percentage;
    }

    public function setPercentage(bool $percentage): static
    {
        $this->percentage = $percentage;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getCommands(): Collection
    {
        return $this->commands;
    }

    public function addCommand(Order $command): static
    {
        if (!$this->commands->contains($command)) {
            $this->commands->add($command);
            $command->setPromotion($this);
        }

        return $this;
    }

    public function removeCommand(Order $command): static
    {
        if ($this->commands->removeElement($command)) {
            // set the owning side to null (unless already changed)
            if ($command->getPromotion() === $this) {
                $command->setPromotion(null);
            }
        }

        return $this;
    }
}
