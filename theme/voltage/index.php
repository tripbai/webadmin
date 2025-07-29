<!DOCTYPE html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><?php page_title(); ?></title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.46/moment-timezone.min.js" integrity="sha512-Ne/lsUAQFATS+KrR4oPYWUtbM3C0I7eIORtGaC+xOdO/V1g3rfSzUwjsLd9/MkFw6iEqafr78LwrK75iZc3Emw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/kenjiefx/plunc/dist/plunc.0.8.4.min.js"></script>
        <script type="text/javascript"> const blockAutoSubmit=e=>e.preventDefault(); </script>
        <?php template_assets(); ?>
    </head>
    <body class="width:24 height:24">
        <app plunc-app="app" class="width:24 height:24"></app>
        <template plunc-name="app">
            <main plunc-component="App" class="width:24"></main>
        </template>
        <template plunc-name="App">
            <?php template_content(); ?>
        </template>
        <!-- Color Palette -->
        <?php 
        $path = __DIR__ . '/venta/color.json';
        $colors = json_decode(file_get_contents($path), TRUE);
        $spans = '<div id="slate_color_palette" style="display:none;">'.PHP_EOL;
        foreach ($colors as $selector => $data) {
            foreach ($data['values'] as $variant => $code) {
                $fullname  = "{$selector}-{$variant}";
                $classname = "{$selector}:{$variant}";
                $spans = $spans.'<span data-color-id="'.$fullname.'" class="'.$classname.'"></span>'.PHP_EOL;
            }
        }
        $spans = $spans.'</div>';
        echo $spans;
        ?>
    </body>
</html>