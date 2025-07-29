<?php 

$classlist = [
    "@wrapper:input" => [],
    "@input" => [],
    "@icon:left:wrapper" => [],
    "@icon:right:wrapper:success" => [],
    "@icon:right:wrapper:error" => []
];
$html = [
    "@icon:left" => "",
    "@icon:right:success" => "",
    "@icon:right:error" => ""
];
$plunc = [
    "@model" => "",
    "@click" => "",
    "@change" => ""
];

// Set default size of the input
$snippet["size"] ??= "medium";
$snippet["placeholder"] ??= "";

$blockname = $snippet["blockname"];
$styleId = "x".uniqid();

$classlist["@wrapper:input"][] = "width:24";
$classlist["@wrapper:input"][] = "display:flex";
$classlist["@wrapper:input"][] = "align-items:center";
$classlist["@input"][] = "border-style:none";
$classlist["@input"][] = "width:24";
$classlist["@input"][] = $snippet["background:color"] ?? "background-color:transparent";


// Adds border to input wrapper, if enabled
if ($snippet["border:enabled"] ?? true) {
    $classlist["@wrapper:input"][] = $snippet["border:width"] ?? "border-width:1";
    $classlist["@wrapper:input"][] = $snippet["border:style"] ?? "border-style:solid";
    $classlist["@wrapper:input"][] = $snippet["border:color"] ?? "border-color:grayscale-21";
    $classlist["@wrapper:input"][] = $snippet["border:radius"] ?? "border-radius-extra-small:4";
}

// Plunc attributes
if (isset($snippet["plunc:model"])) {
    $plunc["@model"] = "plunc-model=\"{$snippet['plunc:model']}\"";
}
if (isset($snippet["plunc:change"])) {
    $plunc["@change"] = "plunc-change=\"{$snippet['plunc:change']}()\"";
}

// If left icon is set
if (isset($snippet["icon:left"])) {
    $snippet["icon:left"]["width"] ??= "concrete-width-extra-small:15";
    $snippet["icon:left"]["height"] ??= "concrete-height-extra-small:15";
    $snippet["icon:left"]["stroke:color"] ??= "svg-stroke:primary-strong";
    $snippet["icon:left"]["fill:color"] ??= "svg-fill:none";
    $snippet["icon:left"]["classlist"] ??= [];
    $__icon_left_classlist = array_merge(
        $snippet["icon:left"]["classlist"],
        [
            $snippet["icon:left"]["width"],
            $snippet["icon:left"]["stroke:color"],
            $snippet["icon:left"]["fill:color"],
            "margin-right:5"
        ]
    );
    $classlist["@icon:left:wrapper"] = [
        $snippet["icon:left"]["height"]
    ];
    ob_start();
    snippet("Themepack/Icons/SVG", [
        "path" => $snippet["icon:left"]["path"],
        "class" => implode(" ", $__icon_left_classlist),
        "stroke:width" => $snippet["icon:left"]["stroke:width"] ?? "1.0",
        "use:gradient" => $snippet["icon:left"]["use:gradient"] ?? false,
    ]);
    $html["@icon:left"] = ob_get_contents();
    ob_end_clean();
}

// If icon right for success state is set
if (isset($snippet["icon:right:success"])) {
    $snippet["icon:right:success"]["width"] ??= "concrete-width-extra-small:15";
    $snippet["icon:right:success"]["height"] ??= "concrete-height-extra-small:15";
    $snippet["icon:right:success"]["stroke:color"] ??= "svg-stroke:success-strong";
    $snippet["icon:right:success"]["fill:color"] ??= "svg-fill:none";
    $snippet["icon:right:success"]["classlist"] ??= [];
    $__icon_classlist = array_merge(
        $snippet["icon:right:success"]["classlist"],
        [
            $snippet["icon:right:success"]["width"],
            $snippet["icon:right:success"]["stroke:color"],
            $snippet["icon:right:success"]["fill:color"],
            "margin-right:5"
        ]
    );
    $classlist["@icon:right:wrapper:success"] = [
        $snippet["icon:right:success"]["height"]
    ];
    ob_start();
    snippet("Themepack/Icons/SVG", [
        "path" => $snippet["icon:right:success"]["path"],
        "class" => implode(" ", $__icon_classlist),
        "stroke:width" => $snippet["icon:right:success"]["stroke:width"] ?? "1.0",
        "use:gradient" => $snippet["icon:right:success"]["use:gradient"] ?? false,
    ]);
    $html["@icon:right:success"] = ob_get_contents();
    ob_end_clean();
}

// If icon right for error state is set
if (isset($snippet["icon:right:error"])) {
    $snippet["icon:right:error"]["width"] ??= "concrete-width-extra-small:15";
    $snippet["icon:right:error"]["height"] ??= "concrete-height-extra-small:15";
    $snippet["icon:right:error"]["stroke:color"] ??= "svg-stroke:error-strong";
    $snippet["icon:right:error"]["fill:color"] ??= "svg-fill:none";
    $snippet["icon:right:error"]["classlist"] ??= [];
    $__icon_classlist = array_merge(
        $snippet["icon:right:error"]["classlist"],
        [
            $snippet["icon:right:error"]["width"],
            $snippet["icon:right:error"]["stroke:color"],
            $snippet["icon:right:error"]["fill:color"],
            "margin-right:5"
        ]
    );
    $classlist["@icon:right:wrapper:error"] = [
        $snippet["icon:right:error"]["height"]
    ];
    ob_start();
    snippet("Themepack/Icons/SVG", [
        "path" => $snippet["icon:right:error"]["path"],
        "class" => implode(" ", $__icon_classlist),
        "stroke:width" => $snippet["icon:right:error"]["stroke:width"] ?? "1.0",
        "use:gradient" => $snippet["icon:right:error"]["use:gradient"] ?? false,
    ]);
    $html["@icon:right:error"] = ob_get_contents();
    ob_end_clean();
}

switch ($snippet["size"]) {
    case "medium": 
        $classlist["@wrapper:input"][] = $snippet["padding:top"] ?? "padding-top:5";
        $classlist["@wrapper:input"][] = $snippet["padding:bottom"] ?? "padding-bottom:5";
        $classlist["@wrapper:input"][] = $snippet["padding:left"] ?? "padding-left:6";
        $classlist["@wrapper:input"][] = $snippet["padding:right"] ?? "padding-right:6";
        break;
    default: 
        // Custom sizing, must be defined in the snippet, if not default to medium
        $classlist["@wrapper:input"][] = $snippet["padding:top"] ?? "padding-top:5";
        $classlist["@wrapper:input"][] = $snippet["padding:bottom"] ?? "padding-bottom:5";
        $classlist["@wrapper:input"][] = $snippet["padding:left"] ?? "padding-left:6";
        $classlist["@wrapper:input"][] = $snippet["padding:right"] ?? "padding-right:6";
        break;
}

$__wrapper_input_classlist = implode(" ", $classlist["@wrapper:input"]);
$__input_classlist = implode(" ", $classlist["@input"]);
$__icon_right_wrapper_success_classlist = implode(" ", $classlist["@icon:right:wrapper:success"]);
$__icon_right_wrapper_error_classlist = implode(" ", $classlist["@icon:right:wrapper:error"]);
$__icon_left_wrapper_classlist = implode(" ", $classlist["@icon:left:wrapper"]);

echo <<<HTML
    <div plunc-block="{$blockname}" class="{$__wrapper_input_classlist}" data-style="@wrapper:input" data-style-id="{$styleId}">
        <div class="--icon-left {$__icon_left_wrapper_classlist}">
            {$html['@icon:left']}
        </div>
        <input id="{$snippet['id']}" {$plunc['@model']} {$plunc['@change']} type="{$snippet['type']}" class="{$__input_classlist}" placeholder="{$snippet['placeholder']}"/>
        <div class="--icon-right-error {$__icon_right_wrapper_error_classlist}" style="display:none;">
            {$html['@icon:right:error']}
        </div>
        <div class="--icon-right-success {$__icon_right_wrapper_success_classlist}" style="display:none;">
            {$html['@icon:right:success']}
        </div>
        <div class="--themepack-spinner-simple" style="display:none;"></div>
        <style>
            .__ipdeferror {color: var(--default-color-error-strong);}
            .__ipdefsuccess {color: var(--default-color-success-strong);}
            .__ipdefbackground1 {color: var(--default-color-grayscale-1);}
            .__ipdefbackground2 {color: var(--default-color-grayscale-9);}
        </style>
    </div>
HTML;