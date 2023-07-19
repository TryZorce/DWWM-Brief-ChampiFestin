<?php

namespace App\DataFixtures;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;

class CategoryFixtures extends AbstractFixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 3; $i++) {
            $category = new Category();
            $category->setName($faker->word);
            $category->setDescription($faker->sentence);
            $category->setIntensity($faker->numberBetween(1, 10));

            $manager->persist($category);
        }

        $manager->flush();
    }
}
