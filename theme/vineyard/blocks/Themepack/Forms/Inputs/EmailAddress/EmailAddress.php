<?php
$namespace = Kenjiefx\Pluncext\API\PluncX::namespace(__DIR__);
?>
<section class="width:24">
    <?php snippet("Forms/Input", [
        "blockname" => $namespace,
        "type" => "email",
        "label" => "Email Address",
        'placeholder' => 'johndoe@example.com',
        'plunc:model' => $namespace . '.value',
        'plunc:change' => $namespace . '.validate',
        "icon:left" => [
            "path" => "/Paths/email.svg"
        ]
    ]); ?>
</section>