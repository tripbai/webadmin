<header class="width:24 --webadmin-header display:flex">
    <div class="width:12 height:24">

    </div>
    <div class="width:12 height:24 display:flex flex-direction:row-reverse align-items:center padding-x:5">
        <div>
            <?php snippet("Themepack/Forms/Button", [
                "text" => "Logout",
                "plunc:click" => "logout()",
                "type" => "button",
                "icon:right" => ["path" => "/Paths/logout.svg"]
            ]); ?>
        </div>
    </div>
</header>