<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Traits\Timestampable;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['orders_read']]
        ),
        new Get(
            normalizationContext: ['groups' => ['order_read']]
        ),
        new Post(
            denormalizationContext: ['groups' => ['order_write']]
        )
    ]
)]
class Order
{
    
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::FLOAT, nullable: true)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?float $price_promotion = null;

    #[ORM\Column(type: Types::FLOAT)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?float $TVA = null;

    #[ORM\Column]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?float $HT = null;

    #[ORM\Column(length: 255)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?string $surname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?int $phone = null;

    #[ORM\ManyToOne(inversedBy: 'orders', cascade: ['persist'])]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private ?Promotion $promotion = null;

    #[ORM\ManyToMany(targetEntity: Product::class, inversedBy: 'orders', cascade: ['persist'])]
    #[Groups(['orders_read', 'order_read', 'order_write'])]
    private Collection $product;

    public function __construct()
    {
        $this->product = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPricePromotion(): ?float
    {
        return $this->price_promotion;
    }

    public function setPricePromotion(?float $price_promotion): static
    {
        $this->price_promotion = $price_promotion;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getTVA(): ?float
    {
        return $this->TVA;
    }

    public function setTVA(float $TVA): static
    {
        $this->TVA = $TVA;

        return $this;
    }

    public function getHT(): ?float
    {
        return $this->HT;
    }

    public function setHT(float $HT): static
    {
        $this->HT = $HT;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): static
    {
        $this->surname = $surname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(int $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getPromotion(): ?Promotion
    {
        return $this->promotion;
    }

    public function setPromotion(?Promotion $promotion): static
    {
        $this->promotion = $promotion;

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProduct(): Collection
    {
        return $this->product;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->product->contains($product)) {
            $this->product->add($product);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        $this->product->removeElement($product);

        return $this;
    }
    
}
