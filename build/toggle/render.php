<?php

/**
 * Render toggle content block.
 *
 * @package FlashblocksToggle
 */

if (! defined('ABSPATH')) {
	exit;
}

$left   = sanitize_title($attributes['leftClass'] ?? '');
$right  = sanitize_title($attributes['rightClass'] ?? '');

if (! $left || ! $right) {
	if (is_admin()) echo '<div class="wp-block-flashblocks-toggle-error">Configure Left/Right classes in settings.</div>';
	return;
}

$id      = substr(md5($left . $right), 0, 8);
$active  = $attributes['initialSide'] ?? 'left';
$inside  = $attributes['labelsInside'] ?? false;
$l_label = esc_html($attributes['labelLeft'] ?? __('Left', 'flashblocks-toggle'));
$r_label = esc_html($attributes['labelRight'] ?? __('Right', 'flashblocks-toggle'));

$w = !empty($attributes['switchWidth']) ? $attributes['switchWidth'] : null;
$h = !empty($attributes['switchHeight']) ? $attributes['switchHeight'] : null;
$p = !empty($attributes['switchPadding']) ? $attributes['switchPadding'] : null;

$inline_styles = sprintf(
	'--switch-bg-off: %1$s; --switch-active-bg: %2$s; --switch-thumb-bg: %3$s;%4$s%5$s%6$s',
	esc_attr($attributes['colorOff'] ?? '#ccc'),
	esc_attr($attributes['colorOn'] ?? '#4caf50'),
	esc_attr($attributes['colorThumb'] ?? '#fff'),
	$w ? " --switch-w: $w;" : "",
	$h ? " --switch-h: $h;" : "",
	$p ? " --switch-p: $p;" : ""
);

$wrapper_attributes = get_block_wrapper_attributes([
	'class' => ('right' === $active ? 'right ' : '') . ($inside ? 'is-labels-inside' : ''),
	'style' => $inline_styles,
]);

if (! is_admin()) {
	static $configs = [];
	if (! isset($configs["$left-$right"])) {
		$configs["$left-$right"] = true;
		wp_add_inline_style('flashblocks-toggle-style', "body:not([data-toggle-$left=\"right\"]) .$right { display: none !important; } body[data-toggle-$left=\"right\"] .$left { display: none !important; }");
		if ('right' === $active) echo "<script>document.body.setAttribute('data-toggle-" . esc_js($left) . "', 'right');</script>";
	}
}

$context = wp_interactivity_data_wp_context(['leftClass' => $left, 'rightClass' => $right, 'activeSide' => $active]);
$l_id    = "toggle-label-$id-l";
$r_id    = "toggle-label-$id-r";

$l_html  = ! $inside ? "<span id=\"$l_id\" class=\"toggle-label left\">$l_label</span>" : '';
$r_html  = ! $inside ? "<span id=\"$r_id\" class=\"toggle-label right\">$r_label</span>" : '';
$i_html  = $inside ? "<span id=\"$l_id\" class=\"toggle-label-inner left\">$l_label</span><span id=\"$r_id\" class=\"toggle-label-inner right\">$r_label</span>" : '';

echo <<<htm
<div
	{$wrapper_attributes}
	data-wp-interactive="flashblocks/toggle"
	data-wp-init="callbacks.init"
	data-wp-class--right="state.isRight"
	{$context}>
	{$l_html}
	<button
		class="toggle-switch"
		type="button"
		role="switch"
		aria-labelledby="{$l_id} {$r_id}"
		data-wp-bind--aria-checked="state.isRight"
		data-wp-on--click="actions.toggleContent">
		{$i_html}
	</button>
	{$r_html}
</div>
htm;
