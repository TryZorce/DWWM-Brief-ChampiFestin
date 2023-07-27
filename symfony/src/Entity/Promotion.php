<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\PromotionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PromotionRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'code' => 'exact'])]
class Promotion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?string $title = null;

    #[ORM\Column(length: 30)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?string $code = null;

    #[ORM\Column(type: Types::FLOAT)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?float $value = null;

    #[ORM\Column]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?bool $percentage = null;

    #[ORM\OneToMany(mappedBy: 'promotion', targetEntity: Order::class)]
    private Collection $orders;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
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
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setPromotion($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getPromotion() === $this) {
                $order->setPromotion(null);
            }
        }

        return $this;
    }
}
