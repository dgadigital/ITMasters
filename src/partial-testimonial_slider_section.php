<section class="testimonial_slider_section">
	<div class="container">
		<div class="title text-center">
			<h2>Student Testimonials</h2>
		</div>
		<div class="testimonial-slider-wrapper">
			<div class="testimonial-slider">
				<?php
				$args = array(
					'post_type' => 'testimonials',
					'posts_per_page' => -1
				);
				$testimonial_query = new WP_Query($args);
				if ($testimonial_query->have_posts()) :
					while ($testimonial_query->have_posts()) : $testimonial_query->the_post();
						$color = get_field('color'); // Assuming 'color' is the ACF field name for the color picker
				?>
						<div class="testimony-card">
							<div class="content text-center <?php echo esc_attr($color); ?>">
								<div class="testimony">
									<?php the_content(); ?>
								</div>
								<div class="student">
									<?php the_title(); ?>
								</div>
							</div>
						</div>
				<?php
					endwhile;
					wp_reset_postdata();
				endif;
				?>
			</div>
		</div>
		<div class="more text-center">
			<a href="#" class="btn btn-solid orange">View More</a>
		</div>
	</div>
</section>