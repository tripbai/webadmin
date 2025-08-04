<section class="background-color:grayscale-1">
    <?php block('Themepack/Sidebars/CancunSidebar', [
        "width" => "300px",
        "padding-top" => "padding-top:2",
        "padding-bottom" => "padding-bottom:2",
        "content" => [
            [
                "blocks" => [
                    [
                        "name" => "index.html",
                        "type" => "link",
                        "url" => "index.html",
                        "icon" => [
                            "path" => "/Paths/bar-chart-filled.svg"
                        ],
                        "label" => "Dashboard"
                    ]
                ]
            ],
            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "name" => "Users",
                        "icon" => [
                            "path" => "/Paths/group-filled.svg"
                        ],
                        "label" => "Users",
                        "content" => [
                            [
                                "name" => "users/view.html",
                                "url" => "users/view.html",
                                "label" => "View Users"
                            ],
                            [
                                "name" => "users/create.html",
                                "url" => "users/create.html",
                                "label" => "Create User"
                            ]
                        ]
                    ]
                ]
            ],
            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "name" => "Tenants",
                        "icon" => [
                            "path" => "/Paths/building-house.svg"
                        ],
                        "label" => "Tenants",
                        "content" => [
                            [
                                "name" => "tenants/view.html",
                                "url" => "tenants/view.html",
                                "label" => "View Tenants"
                            ],
                            [
                                "name" => "tenants/create.html",
                                "url" => "tenants/create.html",
                                "label" => "Create Tenant"
                            ]
                        ]
                    ]
                ]
            ],
            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "name" => "Packages",
                        "icon" => [
                            "path" => "/Paths/layer.svg"
                        ],
                        "label" => "Packages",
                        "content" => [
                            [
                                "name" => "packages/view.html",
                                "url" => "packages/view.html",
                                "label" => "View Packages"
                            ],
                            [
                                "name" => "packages/create.html",
                                "url" => "packages/create.html",
                                "label" => "Create Package"
                            ]
                        ]
                    ]
                ]
            ],
            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "name" => "Features",
                        "icon" => [
                            "path" => "/Paths/testube-filled.svg"
                        ],
                        "label" => "Features",
                        "content" => [
                            [
                                "name" => "features/view.html",
                                "url" => "features/view.html",
                                "label" => "View Features"
                            ]
                        ]
                    ]
                ]
            ],

            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "name" => "Tripbai",
                        "icon" => [
                            "path" => "/Paths/plane.svg"
                        ],
                        "label" => "Tripbai",
                        "content" => [
                            [
                                "name" => "tours/view.html",
                                "url" => "tours/view.html",
                                "label" => "View Tours"
                            ]
                        ]
                    ]
                ]
            ],

            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "name" => "Integrations",
                        "icon" => [
                            "path" => "/Paths/rocket-1-filled.svg"
                        ],
                        "label" => "Integrations",
                        "content" => [
                            [
                                "name" => "integrations/google.html",
                                "url" => "integrations/google.html",
                                "label" => "Google"
                            ]
                        ]
                    ]
                ]
            ],


            [
                "blocks" => [
                    [
                        "type" => "collapsible",
                        "name" => "Email Registry",
                        "icon" => [
                            "path" => "/Paths/email.svg"
                        ],
                        "label" => "Email Registry",
                        "content" => [
                            [
                                "name" => "emails/view.html",
                                "url" => "emails/view.html",
                                "label" => "All Emails"
                            ],
                            [
                                "name" => "emails/settings.html",
                                "url" => "emails/settings.html",
                                "label" => "Email Settings"
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]); ?>
</section>