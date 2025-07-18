<div class="padding:7">
    <?php block("Themepack/Forms/Inputs/Fullname"); ?>
    <?php block("Themepack/Forms/Inputs/EmailAddress"); ?>
    <?php block("Themepack/Forms/Inputs/Password"); ?>
    <?php block("Themepack/Forms/Inputs/TextFieldWithCounter"); ?>
    <?php block("Themepack/Forms/Inputs/TextAreaWithCounter"); ?>
    <?php snippet("Forms/Button", [
        "text" => "Submit",
        "type" => "submit",
    ]); ?>
    <?php snippet("Forms/Button", [
        "text" => "Send",
        "type" => "button",
        "icon:left" => [
            "path" => "/Paths/rocket.svg"
        ]
    ]); ?>
</div>