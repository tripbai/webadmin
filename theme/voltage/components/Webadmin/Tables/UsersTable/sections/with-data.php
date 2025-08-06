<div class="width:24" plunc-repeat="apexTableData as user">
    <div class="width:24 padding-x:7 padding-y:4 display:flex align-items:center border-bottom-style:solid border-width:1 border-color:grayscale-2">
        <div class="text:2 --fullname-cell">{{user.first_name}} {{user.last_name}}</div>
        <div class="text:2 --email-cell">{{user.email_address}}</div>
        <div class="text:2 --username-cell">{{user.username}}</div>
        <div class="text:2 --userid-cell">{{user.id}}</div>
        <div class="text:2 --status-cell">{{user.status}}</div>
    </div>
</div>