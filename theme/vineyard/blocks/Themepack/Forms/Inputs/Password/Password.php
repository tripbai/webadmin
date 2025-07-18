<?php 
$namespace = Kenjiefx\Pluncext\API\PluncX::namespace(__DIR__);
?>
<section class="width:24">
    <?php snippet("Forms/Input", [
        "blockname" => $namespace,
        "type" => "password",
        "label" => "Password",
        'placeholder' => '•••••••••••••••••',
        'plunc:model' => $namespace . '.value',
        'plunc:change' => $namespace . '.validate',
        "icon:left" => [
            "path" => "/Paths/key.svg"
        ]
    ]); ?>
</section>