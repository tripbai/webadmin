<?php block("Themepack/Forms/Inputs/EmailAddress"); ?>
<div class="margin-y:7"></div>
<?php block("Themepack/Forms/Inputs/Password"); ?>
<div class="margin-y:13"></div>
<?php snippet("Themepack/Forms/Button", [
    "text" => "Login",
    "plunc:click" => "submit()",
    "type" => "submit",
    "icon:right" => ["path" => "/Paths/rocket.svg"]
]); ?>
<div class="margin-y:7"></div>
<?php block("Themepack/Alerts/SimpleMessage", [
    "namespace" => "LoginForms_BasicLoginForm_MessageAlert"
]); ?>