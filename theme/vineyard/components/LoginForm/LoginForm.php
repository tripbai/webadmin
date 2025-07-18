<section class="padding:7" onsubmit="blockAutoSubmit()">
    <div class="text:8">Please login to continue</div>
    <?php block("Themepack/Forms/Inputs/EmailAddress"); ?>
    <?php block("Themepack/Forms/Inputs/Password"); ?>
    <div class="margin-y:8"></div>
    <?php snippet("Forms/Button", [
        "text" => "Login",
        "plunc:click" => "submit()",
        "type" => "submit",
        "icon:left" => ["path" => "/Paths/rocket.svg"]
    ]); ?>
</section>
