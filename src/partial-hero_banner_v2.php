<?php
// Repeater field: slides
if (have_rows('slides')) : 
    $first_slide = true; // Initialize first slide flag
?>
    <section class="hero-banner-v2">
        <div class="banner-slider">
            <?php while (have_rows('slides')) : the_row(); 
                $title = get_sub_field('title');
                $sub_title = get_sub_field('sub_title');
                $button_link = get_sub_field('button_link');
                $background_image = get_sub_field('background_image');
                $mobile_background_image = get_sub_field('mobile_background_image');
            ?>

                <div class="banner-item">
                    <?php if (!empty($background_image['url'])) : ?>
                        <img src="<?php echo esc_url($background_image['url']); ?>" alt="<?php echo esc_attr($title); ?>" class="lg-md-img">
                    <?php endif; ?>
                    
                    <?php if (!empty($mobile_background_image['url'])) : ?>
                        <img src="<?php echo esc_url($mobile_background_image['url']); ?>" alt="<?php echo esc_attr($title); ?>" class="sm-img">
                    <?php endif; ?>

                    <div class="banner-wrapper">
                        <div class="container">
                            <div class="banner-text">
                                <div class="banner-text-content">
                                    <?php if (!empty($title)) : ?>
                                        <?php if ($first_slide) : ?>
                                            <h1 class="hero-title"><?php echo esc_html($title); ?></h1>
                                        <?php else : ?>
                                            <h2 class="hero-title"><?php echo esc_html($title); ?></h2>
                                        <?php endif; ?>
                                    <?php endif; ?>

                                    <?php if (!empty($sub_title)) : ?>
										<?php if ($first_slide) : ?>
                                            <h2 class="hero-subtitle"><?php echo esc_html($sub_title); ?></h2>
                                        <?php else : ?>
                                            <h3 class="hero-subtitle"><?php echo esc_html($sub_title); ?></h3>
                                        <?php endif; ?>
                                    <?php endif; ?>

									<?php $first_slide = false; // Set to false after first slide ?>
                                    <?php if (!empty($button_link['url']) && !empty($button_link['title'])) : ?>
                                        <a href="<?php echo esc_url($button_link['url']); ?>" class="btn btn-solid orange">
                                            <?php echo esc_html($button_link['title']); ?>
                                        </a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <?php endwhile; ?>
        </div>
        
        <div class="slider-controls">
            <div class="container">
                <div class="slider-controls-wrapper">
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
            </div>
        </div>
    </section>
<?php endif; ?>
