<?php 
$namespace = "Themepack_Forms_Inputs_FullName"; 
$firstNameId = "input_".uniqid();
$lastNameId = "input_".uniqid();
?>

<section class="width:24">
    <div class="display:flex align-items:center width:24">
        <div class="padding-right:3 width:12">
            <?php snippet("Themepack/Forms/Label", [
                "for" => $firstNameId,
                "value" => "First Name",
            ]); ?>
            <?php snippet("Themepack/Forms/Input", [
                "id" => $firstNameId,
                "blockname" => "{$namespace}/FirstNameInput",
                "type" => "text",
                'placeholder' => 'John',
                'plunc:model' => $namespace . '.firstName',
                'plunc:change' => $namespace . '.validate'
            ]); ?>
        </div>
        <div class="padding-left:3 width:12">
            <?php snippet("Themepack/Forms/Label", [
                "for" => $lastNameId,
                "value" => "Last Name",
            ]); ?>
            <?php snippet("Themepack/Forms/Input", [
                "id" => $lastNameId,
                "blockname" => "{$namespace}/LastNameInput",
                "type" => "text",
                'placeholder' => 'Doe',
                'plunc:model' => $namespace . '.lastName',
                'plunc:change' => $namespace . '.validate'
            ]); ?>
        </div>
    </div>
    <?php block("Themepack/Alerts/SimpleMessage", [
        "namespace" => $namespace,
    ]); ?>
</section>