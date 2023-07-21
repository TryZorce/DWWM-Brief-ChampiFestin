<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['products_read']]
        ),
        new Get(
            normalizationContext: ['groups' => ['product_read']]
        )
    ]
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['products_read', 'product_read', 'orders_read', 'order_read', 'order_write'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['products_read', 'product_read', 'orders_read', 'order_read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::FLOAT)]
    #[Groups(['products_read', 'product_read', 'orders_read', 'order_read'])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['products_read', 'product_read', 'order_write'])]
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    #[Groups(['products_read', 'product_read'])]
    private ?string $image = null;

    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'products')]
    #[Groups(['products_read', 'product_read', 'orders_read', 'order_read'])]
    private Collection $category;

    #[ORM\ManyToMany(targetEntity: Order::class, mappedBy: 'product', cascade: ['persist'])]
    private Collection $orders;

    #[ORM\Column]
    #[Groups(['products_read', 'product_read', 'order_write'])]
    private ?bool $available = null;

    public function __construct()
    {
        $this->category = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function __toString(){
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategory(): Collection
    {
        return $this->category;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->category->contains($category)) {
            $this->category->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->category->removeElement($category);

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
            $order->addProduct($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            $order->removeProduct($this);
        }

        return $this;
    }

    public function isAvailable(): ?bool
    {
        return $this->available;
    }

    public function setAvailable(bool $available): static
    {
        $this->available = $available;

        return $this;
    }
}
