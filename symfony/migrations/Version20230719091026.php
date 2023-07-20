<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230719091026 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64933E1689A');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C64584665A');
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6A76ED395');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE review');
        $this->addSql('ALTER TABLE `order` ADD name VARCHAR(255) NOT NULL, ADD surname VARCHAR(255) NOT NULL, ADD email VARCHAR(255) NOT NULL, ADD phone INT NOT NULL');
        $this->addSql('ALTER TABLE product CHANGE price price DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE promotion CHANGE code code VARCHAR(30) NOT NULL, CHANGE value value DOUBLE PRECISION NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, command_id INT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, surname VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, phone INT NOT NULL, INDEX IDX_8D93D64933E1689A (command_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE review (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, product_id INT NOT NULL, valoration SMALLINT NOT NULL, message VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, INDEX IDX_794381C64584665A (product_id), INDEX IDX_794381C6A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64933E1689A FOREIGN KEY (command_id) REFERENCES `order` (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C64584665A FOREIGN KEY (product_id) REFERENCES product (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE promotion CHANGE code code VARCHAR(15) NOT NULL, CHANGE value value SMALLINT NOT NULL');
        $this->addSql('ALTER TABLE product CHANGE price price INT NOT NULL');
        $this->addSql('ALTER TABLE `order` DROP name, DROP surname, DROP email, DROP phone');
    }
}
