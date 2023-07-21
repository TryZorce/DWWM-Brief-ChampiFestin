<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create();

        // Charger les entités parentes (catégories)
        $categories = $manager->getRepository('App\Entity\Category')->findAll();

        for ($i = 0; $i < 10; $i++) {
            $product = new Product();
            $product->setName($faker->word);
            $product->setPrice($faker->numberBetween(50, 500));
            $product->setStock($faker->numberBetween(0, 100));
            $product->setImage($faker->imageUrl());
            $product->setAvailable(true);
            // Associer une catégorie aléatoire au produit
            $randomCategory = $faker->randomElement($categories);
            $product->addCategory($randomCategory);
            $manager->persist($product);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            CategoryFixtures::class,
        ];
    }
}
