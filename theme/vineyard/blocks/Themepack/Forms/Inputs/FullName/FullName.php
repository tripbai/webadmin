<?php
$namespace = Kenjiefx\Pluncext\API\PluncX::namespace(__DIR__);
?>
<section class="width:24" data-namespace="<?php echo $namespace; ?>">
    <fieldset class="width:24 display:flex align-items:center border-style:none">
        <?php snippet("Forms/Input", [
            "type" => "text",
            "label" => "First Name",
            'placeholder' => 'John',
            'plunc:model' => $namespace . '.fname.value',
            'plunc:change' => $namespace . '.validate'
        ]); ?>
        <div class="margin-x:3"></div>
        <?php snippet("Forms/Input", [
            "type" => "text",
            "label" => "Last Name",
            'placeholder' => 'Doe',
            'plunc:model' => $namespace . '.lname.value',
            'plunc:change' => $namespace . '.validate'
        ]); ?>
    </fieldset>
    <div plunc-block="Forms/Input/<?php echo $namespace; ?>/Message" class="text-small:23"></div>
</section>