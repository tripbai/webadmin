<div plunc-if="state=='loading'" class="">
    <!-- Apply loading screen here -->
    <div class="--slate-page-spinner"></div>
</div>
<div class="">
    <?php template_content(); ?>
</div>
<div plunc-if="state == 'error'" class="">
    error
</div>