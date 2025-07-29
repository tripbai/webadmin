<?php 
$namespace = "Themepack_Forms_Inputs_EmailAddress"; 
$id = "input_".uniqid();
?>
<section class="width:24">
    <?php snippet("Themepack/Forms/Label", [
        "for" => $id,
        "value" => "Email Address",
    ]); ?>
    <?php snippet("Themepack/Forms/Input", [
        "id" => $id,
        "blockname" => "{$namespace}/Input",
        "type" => "email",
        "label" => "Email Address",
        'placeholder' => 'johndoe@example.com',
        'plunc:model' => $namespace . '.value',
        'plunc:change' => $namespace . '.validate',
        "icon:left" => [
            "path" => "/Paths/email.svg"
        ]
    ]); ?>
    <?php block("Themepack/Alerts/SimpleMessage", [
        "namespace" => $namespace,
    ]); ?>
</section>