<?php

/**
 * Render toggle content block.
 *
 * @package FlashblocksToggle
 */

if (! defined('ABSPATH')) {
	exit;
}

$left_class  = ! empty($attributes['leftClass']) ? sanitize_title($attributes['leftClass']) : '';
$right_class = ! empty($attributes['rightClass']) ? sanitize_title($attributes['rightClass']) : '';

if (empty($left_class) || empty($right_class)) {
	return;
}

$label_left   = ! empty($attributes['labelLeft']) ? esc_html($attributes['labelLeft']) : esc_html__('Left', 'flashblocks-toggle');
$label_right  = ! empty($attributes['labelRight']) ? esc_html($attributes['labelRight']) : esc_html__('Right', 'flashblocks-toggle');
$initial_side = ! empty($attributes['initialSide']) && 'right' === $attributes['initialSide'] ? 'right' : 'left';

$context = array(
	'leftClass'  => $left_class,
	'rightClass' => $right_class,
	'activeSide' => $initial_side,
);

$css_left  = esc_attr($left_class);
$css_right = esc_attr($right_class);

$color_off   = ! empty($attributes['colorOff']) ? esc_attr($attributes['colorOff']) : '#ccc';
$color_on    = ! empty($attributes['colorOn']) ? esc_attr($attributes['colorOn']) : '#4caf50';
$color_thumb = ! empty($attributes['colorThumb']) ? esc_attr($attributes['colorThumb']) : '#fff';

$inline_styles = sprintf(
	'--switch-bg: %s; --switch-active-bg: %s; --switch-thumb-bg: %s;',
	$color_off,
	$color_on,
	$color_thumb
);

$wrapper_attributes    = wp_kses_data(get_block_wrapper_attributes());
$interactivity_context = wp_kses_data(wp_interactivity_data_wp_context($context));
$is_right_class        = 'right' === $initial_side ? 'right' : '';
$aria_label           = esc_attr__('Toggle', 'flashblocks-toggle');

$script = '';
if ('right' === $initial_side) {
	$script = <<<htm
<script>
	document.body.setAttribute('data-toggle-{$css_left}', 'right');
</script>
htm;
}

echo <<<htm
<style>
	body:not([data-toggle-{$css_left}="right"]) .{$css_right} {
		display: none !important;
	}

	body[data-toggle-{$css_left}="right"] .{$css_left} {
		display: none !important;
	}
</style>

{$script}

<div
	{$wrapper_attributes}
	data-wp-interactive="flashblocks/toggle"
	{$interactivity_context}>
	<div
		class="toggle-inner {$is_right_class}"
		data-wp-class--right="state.isRight"
		style="{$inline_styles}">
		<div class="toggle-buttons">
			<span class="toggle-label">{$label_left}</span>
			<button
				class="toggle-switch"
				type="button"
				aria-label="{$aria_label}"
				data-wp-on--click="actions.toggleContent"></button>
			<span class="toggle-label">{$label_right}</span>
		</div>
	</div>
</div>
htm;
