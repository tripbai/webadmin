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
    <body class="width:24">
        <app plunc-app="app" class="width:24 height:24 display:block"></app>
        <template plunc-name="app">
            <main plunc-component="App"></main>
        </template>
        <template plunc-name="App">
            <?php template_content(); ?>
        </template>
    </body>
</html>