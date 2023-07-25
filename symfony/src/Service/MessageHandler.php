<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class MessageHandler
{
    private MailerInterface $mailer;

    public function __construct(
        MailerInterface $mailer,
    )
    {
        $this->mailer = $mailer;
    }

    public function sendTemplateEmail(string $email, string $subject, string $template, array $context): void
    {
        $email = (new TemplatedEmail())
            ->from('quarter-backend@simplon.com') # paramètrable dans config/packages/mailer.yaml
            ->to($email)
            ->subject($subject)
            ->htmlTemplate($template)
            ->context($context);

        $this->mailer->send($email);
    }
}