import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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
	ToggleControl,
} from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
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
		labelsInside,
	} = attributes;
	const [ activeSide, setActiveSide ] = useState( initialSide || 'left' );
	const blockProps = useBlockProps();
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	// Auto-reveal logic: If a block is selected (or any of its children), 
	// ensure the toggle switch is on the correct side so the user can see it.
	const hierarchyClasses = useSelect( ( select ) => {
		const { getSelectedBlockClientId, getBlockParents, getBlockAttributes } = select( blockEditorStore );
		const selectedId = getSelectedBlockClientId();
		if ( ! selectedId ) return [];

		const parentIds = getBlockParents( selectedId );
		const allIds = [ ...parentIds, selectedId ];
		
		return allIds.map( id => getBlockAttributes( id )?.className || '' );
	}, [] );

	useEffect( () => {
		if ( ! hierarchyClasses.length ) return;

		// Check if any block in the selection hierarchy has the left or right class
		for ( const classString of hierarchyClasses ) {
			const classes = classString.split( ' ' );
			if ( rightClass && classes.includes( rightClass ) ) {
				setActiveSide( 'right' );
				break; 
			} else if ( leftClass && classes.includes( leftClass ) ) {
				setActiveSide( 'left' );
				break;
			}
		}
	}, [ hierarchyClasses, leftClass, rightClass ] );

	useEffect( () => {
		setActiveSide( initialSide );
	}, [ initialSide ] );

	// Sync state across multiple instances in the editor
	useEffect( () => {
		const handleSync = ( e ) => {
			const { leftClass: eventClass, side } = e.detail;
			if ( eventClass === leftClass ) {
				setActiveSide( side );
			}
		};

		window.addEventListener( 'flashblocks-toggle-sync', handleSync );
		return () => {
			window.removeEventListener( 'flashblocks-toggle-sync', handleSync );
		};
	}, [ leftClass ] );

	const toggle = () => {
		const nextSide = activeSide === 'left' ? 'right' : 'left';
		setActiveSide( nextSide );

		// Inform other instances
		window.dispatchEvent(
			new CustomEvent( 'flashblocks-toggle-sync', {
				detail: { leftClass, side: nextSide },
			} )
		);
	};

	const sanitizeClassName = ( val ) => {
		return val.toLowerCase().replace( /[^a-z0-9-]/g, '' );
	};

	const isConfigured = leftClass && rightClass;

	// In the editor, we directly control visibility via a scoped style tag.
	// This is more reliable than body attributes in iframed editors.
	const dynamicStyles =
		isConfigured &&
		`
		.editor-styles-wrapper .${ activeSide === 'right' ? leftClass : rightClass } {
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
					<ToggleControl
						label={ __( 'Labels Inside', 'flashblocks-toggle' ) }
						checked={ labelsInside }
						onChange={ ( val ) =>
							setAttributes( { labelsInside: val } )
						}
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
				className={ `toggle-inner ${ activeSide === 'right' ? 'right' : '' } ${ labelsInside ? 'is-labels-inside' : '' }` }
				style={ {
					'--switch-bg': colorOff, // Fallback track bg
					'--switch-active-bg': colorOn, // Thumb bg
					'--switch-thumb-bg': colorThumb, // Active text color
					'--switch-bg-off': colorOff, // Inactive text color
				} }
			>
				<div className="toggle-buttons">
					{ ! labelsInside && ( labelLeft || 'Left' ) }
					<Button
						className="toggle-switch"
						onClick={ toggle }
						aria-label="Toggle"
					>
						{ labelsInside && (
							<>
								<span className="toggle-label-inner left">
									{ labelLeft || 'Left' }
								</span>
								<span className="toggle-label-inner right">
									{ labelRight || 'Right' }
								</span>
							</>
						) }
					</Button>
					{ ! labelsInside && ( labelRight || 'Right' ) }
				</div>
			</div>
		</div>
	);
}
