<?php
namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Promotion;

class PromotionFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // Assurez-vous que Faker est initialisé en premier
        $faker = \Faker\Factory::create();

        // Ajoutez le code promo spécifique "psylo10" avec les valeurs requises
        $promoPsylo10 = new Promotion();
        $promoPsylo10->setTitle('Psylo 10% Off');
        $promoPsylo10->setCode('PSYLO10');
        $promoPsylo10->setValue(10);
        $promoPsylo10->setPercentage(true);

        $manager->persist($promoPsylo10);

        // Générez les autres promotions aléatoirement
        for ($i = 0; $i < 9; $i++) {
            $promotion = new Promotion();
            $promotion->setTitle($faker->word);
            $promotion->setCode($faker->word);

            // Générez un nombre aléatoire entre 1 et 30
            $nombreAleatoire = $faker->numberBetween(1, 30);
            $promotion->setValue($nombreAleatoire);

            $promotion->setPercentage($faker->boolean);

            $manager->persist($promotion);
        }

        $manager->flush();
    }
}
