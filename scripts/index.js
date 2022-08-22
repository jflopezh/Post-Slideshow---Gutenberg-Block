( function( blockEditor, blocks, element, i18n, components) {

    // Import needed components and controls from WordPress dev enviroment

    const { __ } = i18n;
    const { registerBlockType } = blocks;
    const { useBlockProps,
            InspectorControls,
            ColorPaletteControl } = blockEditor;
    const { Panel,
            PanelBody,
            PanelRow,
            SelectControl,
            ToggleControl,
            __experimentalNumberControl,
            __experimentalInputControl,
        FontSizePicker } = components;

    // Shortcut to create elements

    const el = element.createElement;

    /**
     * Register block and asign edit and save functions to render block in the editor
     * and the front end respectively
     */
    registerBlockType("custom-block/post-slideshow", {
        edit: (props) => {

            // Short access to handle block attributes
            const attr = props.attributes;
            const setAttr = props.setAttributes;
            
            setAttr({ blockId: props.clientId });
            
            /** 
             * Block style that updates on attributes change, stored on css variables to be
             * applied on the frontend posts rendering.
             */
            let blockStyle = {
                "--display-date": attr.displayDate ? "block" : "none",
                "--display-excerpt": attr.displayExcerpt ? "block" : "none",
                "--display-button": attr.displayButton ? "block" : "none",
                "--text-color": attr.textColor,
                "--slide-bg-color": attr.bgColor,
                "--nav-color": attr.navColor,
                fontSize: attr.fontSize,
            }

            return (
                el("div", {},

                    // Render block controls on the editor
                    el(InspectorControls, {}, 
                        el(Panel, {},
                            el(PanelBody, { title: __("Slideshow Settings", "post-slideswhow") }, 
                                el(PanelRow, {}, 
                                    el(__experimentalInputControl, {
                                        label: __("Website from wich posts will be pulled", "post-slideswhow"),
                                        onChange:  val => setAttr({ postsWebsite: val }),
                                        value: attr.postsWebsite
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(__experimentalNumberControl, {
                                        label: __("Transition duration (ms)", "post-slideswhow"),
                                        onChange:  val => setAttr({ transitionDuration: val }),
                                        value: attr.transitionDuration
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(ToggleControl, {
                                        label: __("Autoplay", "post-slideswhow"),
                                        onChange:  state => setAttr({ autoplay: state }),
                                        checked: attr.autoplay
                                    })
                                ),
                                el(PanelRow, { className: (!attr.autoplay ? "hide" : "") }, 
                                    el(__experimentalNumberControl, {
                                        label: __("Interval (ms)", "post-slideswhow"),
                                        onChange:  val => setAttr({ autoplayInterval: val }),
                                        value: attr.autoplayInterval
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(ToggleControl, {
                                        label: __("Infinite loop", "post-slideswhow"),
                                        onChange:  state => setAttr({ infiniteLoop: state }),
                                        checked: attr.infiniteLoop
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(ToggleControl, {
                                        label: __("Display arrows", "post-slideswhow"),
                                        onChange:  state => setAttr({ displayArrows: state }),
                                        checked: attr.displayArrows
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(ToggleControl, {
                                        label: __("Display pagination", "post-slideswhow"),
                                        onChange:  state => setAttr({ displayPagination: state }),
                                        checked: attr.displayPagination
                                    })
                                ),
                            )
                        ),
                        el(Panel, {},
                            el(PanelBody, { title: "Content" }, 
                                el(PanelRow, {},
                                    el(ColorPaletteControl, {
                                        label: __("Text color", "post-slideswhow"),
                                        onChange: (color) => setAttr({ textColor: color }),
                                        value: attr.textColor
                                    })                                     
                                ),
                                el(PanelRow, {},
                                    el(ColorPaletteControl, {
                                        label: __("Background color", "post-slideswhow"),
                                        onChange: (color) => setAttr({ bgColor: color }),
                                        value: attr.bgColor
                                    })                                     
                                ),
                                el(PanelRow, {},
                                    el(ColorPaletteControl, {
                                        label: __("Navigation color", "post-slideswhow"),
                                        onChange: (color) => setAttr({ navColor: color }),
                                        value: attr.navColor
                                    })                                      
                                ),
                                el(PanelRow, {},
                                    el(SelectControl, {
                                        label: __("Heading level", "post-slideswhow"),
                                        onChange: (select) => setAttr({ headingLevel: select }),
                                        value: attr.headingLevel,
                                        options: [
                                            { value: "h1", label: "H1" },
                                            { value: "h2", label: "H2" },
                                            { value: "h3", label: "H3" },
                                            { value: "h4", label: "H4" },
                                            { value: "h5", label: "H5" },
                                            { value: "h6", label: "H6" },
                                        ]
                                    })
                                ),
                                el(PanelRow, {},
                                    el(FontSizePicker, {
                                        fontSizes: [
                                            {
                                                name: __( "Small", "post-slideswhow"),
                                                slug: "small",
                                                size: 14,
                                            },
                                            {
                                                name: __( "Medium", "post-slideswhow"),
                                                slug: "medium",
                                                size: 18,
                                            },
                                            {
                                                name: __( "Big", "post-slideswhow"),
                                                slug: "big",
                                                size: 22,
                                            },
                                        ],
                                        onChange: ( size ) => setAttr({ fontSize: size }),
                                        value: attr.fontSize
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(ToggleControl, {
                                        label: __("Display date", "post-slideswhow"),
                                        onChange:  state => setAttr({ displayDate: state }),
                                        checked: attr.displayDate
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(ToggleControl, {
                                        label: __("Display excerpt", "post-slideswhow"),
                                        onChange:  state => setAttr({ displayExcerpt: state }),
                                        checked: attr.displayExcerpt
                                    })
                                ),
                                el(PanelRow, {}, 
                                    el(ToggleControl, {
                                        label: __("Display read more button", "post-slideswhow"),
                                        onChange:  state => setAttr({ displayButton: state }),
                                        checked: attr.displayButton
                                    })
                                ),
                            )    
                        )
                    ),

                    // Reden block preview
                    el("div", { 
                        ...useBlockProps(),
                        id: attr.blockId,
                        "data-posts-website": attr.postsWebsite,
                        "data-transition": attr.transitionDuration,
                        "data-autoplay": attr.autoplay,
                        "data-interval": attr.autoplayInterval,
                        "data-infinite-loop": attr.infiniteLoop,
                        "data-heading-level": attr.headingLevel,
                        style: blockStyle,
                    },
                        el("div", { className: "slides-wrapper" }, 
                            el("div", { className: "post-slide" },
                                el("div", { className: "slide-image" },
                                    el("img", { src: "/wp-content/plugins/post-slideshow/images/placeholder.png" })
                                ),
                                el("div", { className: "slide-content" },
                                    el(attr.headingLevel, { className: "title" },
                                        "Lorem ipsum dolor sit amet consectetur adipiscing"    
                                    ),
                                    el("p", { className: "date" + (!attr.displayDate ? " hide" : "") },
                                        "2022/08/18"
                                    ),
                                    el("div", { className: "excerpt" + (!attr.displayExcerpt ? " hide" : "") },
                                        "Mus tellus magnis inceptos felis dapibus auctor aenean blandit nascetur, commodo consequat dui mattis netus magna hac ante."
                                    ),
                                    el("a", { className: "button" + (!attr.displayButton ? " hide" : "") }, 
                                        el("button", {}, "Read More")
                                    )
                                )
                            )
                        ),
                        el("div", { className: "nav-arrows" + (!attr.displayArrows ? " hide" : "") }, 
                            el("div", { className: "previous-slide" }, "‹"),
                            el("div", { className: "next-slide" }, "›")
                        ),
                        el("div", { className: "nav-pagination" + (!attr.displayPagination ? " hide" : "") },
                            el("div", { className: "nav-bullet" }),
                            el("div", { className: "nav-bullet active" }),
                            el("div", { className: "nav-bullet" }),
                            el("div", { className: "nav-bullet" }),
                            el("div", { className: "nav-bullet" }),
                            el("div", { className: "nav-bullet" }),
                            el("div", { className: "nav-bullet" }),
                            el("div", { className: "nav-bullet" })
                        )
                    )
                )
            );
        },

        /**
         * Render the basic skeleton of the slider and pass slideshow
         * behavior settings as data attributes to the front end. The
         * save function won't render functionalities or dynamic content,
         * this callback is used to generate pure HTML to be rendered on the front.
         * 
         * According to the above, for slideshow functionality and posts loading,
         * I enqueued a front-end script in the block.json configuration. 
         */
        save: (props) => {
            const attr = props.attributes;

            let blockStyle = {
                "--display-date": attr.displayDate ? "block" : "none",
                "--display-excerpt": attr.displayExcerpt ? "block" : "none",
                "--display-button": attr.displayButton ? "block" : "none",
                "--text-color": attr.textColor,
                "--slide-bg-color": attr.bgColor,
                "--nav-color": attr.navColor,
                fontSize: attr.fontSize,
            }

            return (
                el("div", { 
                    ...useBlockProps.save(),
                    id: attr.blockId,
                    "data-posts-website": attr.postsWebsite,
                    "data-transition": attr.transitionDuration,
                    "data-autoplay": attr.autoplay,
                    "data-interval": attr.autoplayInterval,
                    "data-infinite-loop": attr.infiniteLoop,
                    "data-heading-level": attr.headingLevel,
                    style: blockStyle,
                },
                    el("div", { className: "slides-wrapper" }),
                    el("div", { className: "nav-arrows" + (!attr.displayArrows ? " hide" : "") }, 
                        el("div", { className: "previous-slide" }, "&#8249;"),
                        el("div", { className: "next-slide" }, "&#8250;")
                    ),
                    el("div", { className: "nav-pagination" + (!attr.displayPagination ? " hide" : "") })
                )
            );
        }
    } );

} )(
    wp.blockEditor,
	wp.blocks,
	wp.element,
    wp.i18n,
    wp.components
);
