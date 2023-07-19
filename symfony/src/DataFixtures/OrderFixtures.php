<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\Promotion;

class OrderFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create();

        // Charger les entités parentes (promotions et produits)
        $promotions = $manager->getRepository(Promotion::class)->findAll();
        $products = $manager->getRepository(Product::class)->findAll();

        for ($i = 0; $i < 20; $i++) {
            $order = new Order();
            $order->setCreatedAt(\DateTimeImmutable::createFromMutable($faker->dateTimeThisDecade()));
            $order->setPricePromotion($faker->numberBetween(50, 500));
            $order->setPrice($faker->randomFloat(2, 100, 1000));
            $order->setTVA($faker->randomFloat(2, 5, 25));
            $order->setHT($faker->randomFloat(2, 100, 1000));
            $order->setName($faker->firstName);
            $order->setSurname($faker->lastName);
            $order->setEmail($faker->email);
            $order->setPhone($faker->numberBetween(1, 1200));

            // Associer une promotion aléatoire à la commande
            $randomPromotion = $faker->randomElement($promotions);
            $order->setPromotion($randomPromotion);

            // Associer un produit aléatoire à la commande
            $randomProduct = $faker->randomElement($products);
            $order->addProduct($randomProduct);

            $manager->persist($order);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [PromotionFixtures::class, ProductFixtures::class];
    }
}
