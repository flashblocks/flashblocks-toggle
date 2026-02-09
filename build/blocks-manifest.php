<?php
// This file is generated. Do not modify it manually.
return array(
	'toggle' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flashblocks/toggle',
		'version' => '1.0.0',
		'title' => 'Flashblocks Toggle',
		'category' => 'widgets',
		'textdomain' => 'flashblocks-toggle',
		'description' => 'A toggle switch that shows or hides content by class name across the page.',
		'attributes' => array(
			'labelLeft' => array(
				'type' => 'string',
				'default' => 'Left'
			),
			'labelRight' => array(
				'type' => 'string',
				'default' => 'Right'
			),
			'leftClass' => array(
				'type' => 'string',
				'default' => ''
			),
			'rightClass' => array(
				'type' => 'string',
				'default' => ''
			),
			'initialSide' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'colorOff' => array(
				'type' => 'string',
				'default' => '#ccc'
			),
			'colorOn' => array(
				'type' => 'string',
				'default' => '#4caf50'
			),
			'colorThumb' => array(
				'type' => 'string',
				'default' => '#fff'
			),
			'labelsInside' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true,
			'shadow' => true,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	)
);
