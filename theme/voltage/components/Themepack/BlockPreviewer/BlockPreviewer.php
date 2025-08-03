<div class="width:24 height:24" style="padding:40px;">
    <?php block('Themepack/Sidebars/CancunSidebar', [
        "width" => "300px",
        "content" => [
            [
                "blocks" => [
                    [
                        "type" => "link",
                        "url" => "https://example.com",
                        "icon" => [
                            "path" => "/Paths/email.svg"
                        ],
                        "label" => "Email"
                    ]
                ]
            ],
            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "icon" => [
                            "path" => "/Paths/plane.svg"
                        ],
                        "label" => "Trips",
                        "content" => [
                            [
                                "url" => "https://example.com/trips/create",
                                "label" => "Create Trip"
                            ],
                            [
                                "url" => "https://example.com/trips/create",
                                "label" => "Find Booking"
                            ],
                            [
                                "url" => "https://example.com/trips/create",
                                "label" => "Trip Settings"
                            ]
                        ]
                    ],
                    [
                        "type" => "link",
                        "url" => "https://example.com/settings",
                        "icon" => [
                            "path" => "/Paths/gear.svg"
                        ],
                        "label" => "Settings"
                    ]
                ]
            ]
        ]
    ]); ?>
</div>
