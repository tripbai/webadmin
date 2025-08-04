<div class="width:24 height:24" style="padding:40px;">
    <?php block('Themepack/Sidebars/CancunSidebar', [
        "width" => "300px",
        "content" => [
            [
                "blocks" => [
                    [
                        "name" => "example.com",
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
                        "name" => "Trips",
                        "icon" => [
                            "path" => "/Paths/plane.svg"
                        ],
                        "label" => "Trips",
                        "content" => [
                            [
                                "name" => "example.com/trips/create",
                                "url" => "https://example.com/trips/create",
                                "label" => "Create Trip"
                            ],
                            [
                                "name" => "example.com/trips/find",
                                "url" => "https://example.com/trips/create",
                                "label" => "Find Booking"
                            ],
                            [
                                "name" => "example.com/trips/settings",
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
            ],
            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "icon" => [
                            "path" => "/Paths/store.svg"
                        ],
                        "label" => "Bookings",
                        "content" => [
                            [
                                "url" => "https://example.com/trips/create",
                                "label" => "Manage Booking"
                            ],
                            [
                                "url" => "https://example.com/trips/create",
                                "label" => "Find Reseller"
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]); ?>
</div>
