<?php

/**
 * Plugin Name:       Flashblocks Toggle
 * Description:       A toggle switch that shows or hides content by class name across the page.
 * Version:           1.0.1
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Sunny Morgan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flashblocks-toggle
 *
 * @package FlashblocksToggle
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function flashblocks_toggle_init() {
	$manifest_path = __DIR__ . '/build/blocks-manifest.php';
	if (! file_exists($manifest_path)) {
		return;
	}

	$manifest_data = require $manifest_path;
	foreach (array_keys($manifest_data) as $block_type) {
		register_block_type(__DIR__ . "/build/{$block_type}");
	}
}
add_action('init', 'flashblocks_toggle_init');
