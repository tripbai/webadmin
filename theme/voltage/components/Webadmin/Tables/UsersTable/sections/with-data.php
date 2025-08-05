<div class="width:24" plunc-repeat="apexTableData as user">
    <div class="width:24 padding-x:7 padding-y:11 display:flex align-items:center">
        <div style="width:80px"></div>
        <div class="text:3 --fullname-cell">{{user.first_name}} {{user.last_name}}</div>
        <div class="text:3 --email-cell">{{user.email_address}}</div>
        <div class="text:3 --userid-cell">{{user.id}}</div>
        <div class="text:3 --status-cell">{{user.status}}</div>
    </div>
</div>