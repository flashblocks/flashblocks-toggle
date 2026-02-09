import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
	InspectorControls,
	useBlockProps,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		labelLeft,
		labelRight,
		leftClass,
		rightClass,
		initialSide,
		colorOff,
		colorOn,
		colorThumb,
	} = attributes;
	const [ activeSide, setActiveSide ] = useState( initialSide || 'left' );
	const blockProps = useBlockProps();
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	useEffect( () => {
		setActiveSide( initialSide );
	}, [ initialSide ] );

	useEffect( () => {
		const body = document.body;
		if ( ! leftClass ) return;

		if ( activeSide === 'right' ) {
			body.setAttribute( `data-toggle-${ leftClass }`, 'right' );
		} else {
			body.removeAttribute( `data-toggle-${ leftClass }` );
		}

		return () => {
			body.removeAttribute( `data-toggle-${ leftClass }` );
		};
	}, [ activeSide, leftClass ] );

	const toggle = () => {
		setActiveSide( activeSide === 'left' ? 'right' : 'left' );
	};

	const sanitizeClassName = ( val ) => {
		return val.toLowerCase().replace( /[^a-z0-9-]/g, '' );
	};

	const isConfigured = leftClass && rightClass;

	const dynamicStyles =
		isConfigured &&
		`
		body:not([data-toggle-${ leftClass }="right"]) .editor-styles-wrapper .${ rightClass } {
			display: none !important;
		}

		body[data-toggle-${ leftClass }="right"] .editor-styles-wrapper .${ leftClass } {
			display: none !important;
		}
	`;

	return (
		<div { ...blockProps }>
			{ dynamicStyles && <style>{ dynamicStyles }</style> }
			<InspectorControls>
				<PanelBody
					title={ __( 'Toggle Settings', 'flashblocks-toggle' ) }
				>
					<TextControl
						label={ __( 'Left Class', 'flashblocks-toggle' ) }
						help={ __(
							'CSS class for content visible in the left/default position.',
							'flashblocks-toggle'
						) }
						value={ leftClass }
						onChange={ ( val ) =>
							setAttributes( {
								leftClass: sanitizeClassName( val ),
							} )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Right Class', 'flashblocks-toggle' ) }
						help={ __(
							'CSS class for content visible in the right position.',
							'flashblocks-toggle'
						) }
						value={ rightClass }
						onChange={ ( val ) =>
							setAttributes( {
								rightClass: sanitizeClassName( val ),
							} )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={ __( 'Initial Side', 'flashblocks-toggle' ) }
						value={ initialSide }
						options={ [
							{
								label: __( 'Left', 'flashblocks-toggle' ),
								value: 'left',
							},
							{
								label: __( 'Right', 'flashblocks-toggle' ),
								value: 'right',
							},
						] }
						onChange={ ( val ) =>
							setAttributes( { initialSide: val } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Left Label', 'flashblocks-toggle' ) }
						value={ labelLeft }
						onChange={ ( val ) =>
							setAttributes( { labelLeft: val } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Right Label', 'flashblocks-toggle' ) }
						value={ labelRight }
						onChange={ ( val ) =>
							setAttributes( { labelRight: val } )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					panelId={ clientId }
					settings={ [
						{
							label: __( 'Off State (Track)', 'flashblocks-toggle' ),
							colorValue: colorOff,
							onColorChange: ( val ) =>
								setAttributes( {
									colorOff: val || '#ccc',
								} ),
						},
						{
							label: __( 'On State (Track)', 'flashblocks-toggle' ),
							colorValue: colorOn,
							onColorChange: ( val ) =>
								setAttributes( {
									colorOn: val || '#4caf50',
								} ),
						},
						{
							label: __( 'Thumb (Circle)', 'flashblocks-toggle' ),
							colorValue: colorThumb,
							onColorChange: ( val ) =>
								setAttributes( {
									colorThumb: val || '#fff',
								} ),
						},
					] }
					{ ...colorGradientSettings }
				/>
			</InspectorControls>
			{ ! isConfigured && (
				<div className="toggle-content-warning">
					{ __(
						'Set Left Class and Right Class in the block settings sidebar. Then add those classes to any block via Advanced > Additional CSS classes.',
						'flashblocks-toggle'
					) }
				</div>
			) }
			<div
				className={ `toggle-inner ${ activeSide === 'right' ? 'right' : '' }` }
				style={ {
					'--switch-bg': colorOff,
					'--switch-active-bg': colorOn,
					'--switch-thumb-bg': colorThumb,
				} }
			>
				<div className="toggle-buttons">
					{ labelLeft || 'Left' }
					<Button
						className="toggle-switch"
						onClick={ toggle }
						aria-label="Toggle"
					></Button>
					{ labelRight || 'Right' }
				</div>
			</div>
		</div>
	);
}
