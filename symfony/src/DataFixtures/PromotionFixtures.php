<?php
namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Promotion;

class PromotionFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $promotion = new Promotion();
            $promotion->setTitle($faker->word);
            $promotion->setCode($faker->word);
            $nombreAleatoire = $faker->numberBetween(1, 30);
            $promotion->setValue($nombreAleatoire);

            $promotion->setPercentage($faker->boolean);

            $manager->persist($promotion);
        }

        $manager->flush();
    }
}
?>