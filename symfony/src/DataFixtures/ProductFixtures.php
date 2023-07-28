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
            '/Mushroom6.jpg',
            '/Mushroom7.jpg',
            '/Mushroom8.jpg',
            '/Mushroom9.jpg',
            '/Mushroom10.jpg',
            '/Mushroom11.jpg',
            '/Mushroom12.jpg',
            '/Mushroom13.jpg',

        ];

        $categories = $manager->getRepository('App\Entity\Category')->findAll();
        $productsByCategory = [];

        foreach ($categories as $category) {
            $availableProductsCount = 0;
            foreach ($category->getProducts() as $product) {
                if ($product->getAvailable()) {
                    $availableProductsCount++;
                }
            }

            for ($i = $availableProductsCount; $i < 3; $i++) {
                $product = new Product();
                $product->setName($faker->word);
                $product->setPrice($faker->numberBetween(50, 500));
                $product->setStock($faker->numberBetween(0, 100));
                $product->setAvailable(true);
                $randomImage = $faker->randomElement($images);
                $product->setImage($randomImage);
                $product->addCategory($category);
                $manager->persist($product);

                $availableProductsCount++;

                $categoryId = $category->getId();
                if (!isset($productsByCategory[$categoryId])) {
                    $productsByCategory[$categoryId] = [];
                }
                $productsByCategory[$categoryId][] = $product;
            }
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
