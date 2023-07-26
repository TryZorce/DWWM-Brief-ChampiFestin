<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Product;
use Symfony\Component\HttpKernel\KernelInterface;

class ProductFixtures extends Fixture
{
    private $kernel;

    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }

    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create();


        $images = [
            '/Mushroom1.jpg',
            '/Mushroom2.jpg',
            '/Mushroom3.jpg',
            '/Mushroom4.jpg',
            '/Mushroom5.jpg',
        ];

        $categoryNames = [
            'Pouvoirs',
            'Psycotrope 2',
            'Category 3',
        ];


        $categories = $manager->getRepository('App\Entity\Category')->findAll();

        for ($i = 0; $i < 10; $i++) {
            $product = new Product();
            $product->setName($faker->word);
            $product->setPrice($faker->numberBetween(50, 500));
            $product->setStock($faker->numberBetween(0, 100));
            $product->setAvailable($faker->boolean());
            $randomImage = $faker->randomElement($images);
            $product->setImage($randomImage);
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
