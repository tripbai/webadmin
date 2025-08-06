<form onsubmit="event.preventDefault();" class="width:24">
    <?php $namespace = "asdasdasdasd"; ?>
    <?php snippet("Themepack/Forms/Input", [
        "id" => 'asdasdasdasd',
        "blockname" => "{$namespace}/Input",
        "type" => "text",
        'placeholder' => 'Search...',
        'plunc:model' => $namespace . '.value',
        'plunc:change' => $namespace . '.validate',
        "icon:left" => [
            "path" => "/Paths/search.svg"
        ]
    ]); ?>
</form>