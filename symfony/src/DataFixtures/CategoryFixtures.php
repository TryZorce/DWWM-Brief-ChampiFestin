<?php

namespace App\DataFixtures;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Category;

class CategoryFixtures extends AbstractFixture
{
    public function load(ObjectManager $manager)
    {
        $categoryNames = [
            'Enchanterelles',
            'Célestiflores',
            'Sylvalunaires',
            'Ombraethérique',
            'Chronospires',
        ];

        foreach ($categoryNames as $name) {
            $category = new Category();
            $category->setName($name);
            $category->setDescription('Description de la catégorie ' . $name); // Remplacez par la description souhaitée
            $category->setIntensity(rand(1, 10)); // Utilisation de rand() pour générer un nombre aléatoire entre 1 et 10

            $manager->persist($category);
        }

        $manager->flush();
    }
}
