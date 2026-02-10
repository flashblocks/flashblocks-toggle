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
			),
			'switchWidth' => array(
				'type' => 'string',
				'default' => ''
			),
			'switchHeight' => array(
				'type' => 'string',
				'default' => ''
			),
			'switchPadding' => array(
				'type' => 'string',
				'default' => ''
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
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'units' => array(
					'px',
					'em',
					'rem',
					'vh',
					'vw'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'blockGap' => true
				)
			),
			'border' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowVerticalAlignment' => false,
				'allowSizingOnChildren' => true,
				'allowJustification' => true,
				'allowOrientation' => true,
				'allowWrap' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'flexWrap' => 'nowrap',
					'justifyContent' => 'center'
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	)
);
