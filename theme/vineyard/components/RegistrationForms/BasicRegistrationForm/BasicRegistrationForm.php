<section class="padding:7" onsubmit="blockAutoSubmit()">
    <?php block("Themepack/Forms/Inputs/Fullname"); ?>
    <?php block("Themepack/Forms/Inputs/Username"); ?>
    <?php block("Themepack/Forms/Inputs/EmailAddress"); ?>
    <?php block("Themepack/Forms/Inputs/Password"); ?>
    <div class="margin-y:8"></div>
    <?php snippet("Forms/Button", [
        "text" => "Create Account",
        "plunc:click" => "submit()",
        "type" => "submit",
    ]); ?>
</section>