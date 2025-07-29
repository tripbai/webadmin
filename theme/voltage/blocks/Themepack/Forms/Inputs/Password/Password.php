<?php 
$namespace = "Themepack_Forms_Inputs_Password"; 
$id = "input_".uniqid();
$label = $block["label"] ?? "Password";
?>

<section class="width:24">
    <?php snippet("Themepack/Forms/Label", [
        "for" => $id,
        "value" => $label,
    ]); ?>
    <?php snippet("Themepack/Forms/Input", [
        "id" => $id,
        "blockname" => "{$namespace}/Input",
        "type" => "password",
        'placeholder' => '**********',
        'plunc:model' => $namespace . '.value',
        'plunc:change' => $namespace . '.validate',
        "icon:left" => [
            "path" => "/Paths/key.svg"
        ]
    ]); ?>
    <?php block("Themepack/Alerts/SimpleMessage", [
        "namespace" => $namespace,
    ]); ?>
</section>