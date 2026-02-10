import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	SelectControl,
	ToggleControl,
	Placeholder,
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
		labelsInside,
		switchWidth,
		switchHeight,
		switchPadding,
		style,
		layout,
	} = attributes;

	const [ activeSide, setActiveSide ] = useState( initialSide || 'left' );
	const lastSelectionId = useRef( null );

	const blockProps = useBlockProps( {
		className: `${ activeSide === 'right' ? 'right' : '' } ${
			labelsInside ? 'is-labels-inside' : ''
		}`,
		style: {
			'--switch-bg-off': colorOff,
			'--switch-active-bg': colorOn,
			'--switch-thumb-bg': colorThumb,
			'--switch-w': switchWidth || undefined,
			'--switch-h': switchHeight || undefined,
			'--switch-p': switchPadding || undefined,
			display: 'flex',
			alignItems: 'center',
			justifyContent: layout?.justifyContent || 'center',
			flexWrap: layout?.flexWrap || 'nowrap',
			flexDirection: layout?.orientation === 'vertical' ? 'column' : 'row',
			gap: style?.spacing?.blockGap?.startsWith?.( 'var:preset' ) 
				? `var(--wp--preset--spacing--${ style.spacing.blockGap.split( '|' ).pop() })`
				: ( style?.spacing?.blockGap || '12px' ),
		},
	} );

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	// Auto-reveal: Switch toggle if a block with a matching class is selected.
	const { selectedId, selectedClassNames } = useSelect( ( select ) => {
		const { getSelectedBlockClientId, getBlockParents, getBlockAttributes } = select( blockEditorStore );
		const id = getSelectedBlockClientId();
		if ( ! id ) return { selectedId: null, selectedClassNames: null };

		const parentIds = getBlockParents( id );
		return {
			selectedId: id,
			selectedClassNames: [ ...parentIds, id ].map( cid => getBlockAttributes( cid )?.className || '' )
		};
	}, [] );

	useEffect( () => {
		// Only trigger auto-reveal if the selection just changed to a NEW block.
		// This prevents fighting manual clicks on the toggle itself.
		if ( ! selectedClassNames || ( ! leftClass && ! rightClass ) || selectedId === lastSelectionId.current ) {
			return;
		}
		
		lastSelectionId.current = selectedId;

		for ( const classString of selectedClassNames ) {
			const classes = classString.split( ' ' );
			if ( rightClass && classes.includes( rightClass ) ) {
				setActiveSide( 'right' );
				break;
			} else if ( leftClass && classes.includes( leftClass ) ) {
				setActiveSide( 'left' );
				break;
			}
		}
	}, [ selectedId, selectedClassNames, leftClass, rightClass ] );

	// Sync when initialSide changes in sidebar
	useEffect( () => {
		setActiveSide( initialSide );
	}, [ initialSide ] );

	// Sync state across multiple instances in the editor.
	useEffect( () => {
		const handleSync = ( e ) => {
			if ( e.detail.leftClass === leftClass ) {
				setActiveSide( e.detail.side );
			}
		};
		window.addEventListener( 'flashblocks-toggle-sync', handleSync );
		return () => window.removeEventListener( 'flashblocks-toggle-sync', handleSync );
	}, [ leftClass ] );

	const toggle = () => {
		const nextSide = activeSide === 'left' ? 'right' : 'left';
		setActiveSide( nextSide );
		window.dispatchEvent(
			new CustomEvent( 'flashblocks-toggle-sync', {
				detail: { leftClass, side: nextSide },
			} )
		);
	};

	const isConfigured = leftClass && rightClass;

	// In the editor, show hide via scoped styles.
	const dynamicStyles = isConfigured && (
		<style>{ `
			.editor-styles-wrapper .${ activeSide === 'right' ? leftClass : rightClass } {
				display: none !important;
			}
		` }</style>
	);

	return (
		<div { ...blockProps }>
			{ dynamicStyles }
			<InspectorControls>
				<PanelBody title={ __( 'Toggle Settings', 'flashblocks-toggle' ) }>
					<TextControl
						label={ __( 'Left Class', 'flashblocks-toggle' ) }
						help={ __( 'Class for default visible content.', 'flashblocks-toggle' ) }
						value={ leftClass }
						onChange={ ( val ) => setAttributes( { leftClass: val.toLowerCase().replace( /[^a-z0-9-]/g, '' ) } ) }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Right Class', 'flashblocks-toggle' ) }
						help={ __( 'Class for toggled visible content.', 'flashblocks-toggle' ) }
						value={ rightClass }
						onChange={ ( val ) => setAttributes( { rightClass: val.toLowerCase().replace( /[^a-z0-9-]/g, '' ) } ) }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Left Label', 'flashblocks-toggle' ) }
						value={ labelLeft }
						onChange={ ( val ) => setAttributes( { labelLeft: val } ) }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Right Label', 'flashblocks-toggle' ) }
						value={ labelRight }
						onChange={ ( val ) => setAttributes( { labelRight: val } ) }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
										<ToggleControl
						label={ __( 'Initially Active', 'flashblocks-toggle' ) }
						checked={ initialSide === 'right' }
						onChange={ ( val ) => setAttributes( { initialSide: val ? 'right' : 'left' } ) }
					/>
					<ToggleControl
						label={ __( 'Labels Inside', 'flashblocks-toggle' ) }
						checked={ labelsInside }
						onChange={ ( val ) => setAttributes( { labelsInside: val } ) }
					/>
					<div style={ { display: 'flex', gap: '8px' } }>
						<TextControl
							label={ __( 'Width', 'flashblocks-toggle' ) }
							value={ switchWidth }
							onChange={ ( val ) => setAttributes( { switchWidth: val } ) }
							placeholder="60px"
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Height', 'flashblocks-toggle' ) }
							value={ switchHeight }
							onChange={ ( val ) => setAttributes( { switchHeight: val } ) }
							placeholder="32px"
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Padding', 'flashblocks-toggle' ) }
							value={ switchPadding }
							onChange={ ( val ) => setAttributes( { switchPadding: val } ) }
							placeholder="4px"
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					panelId={ clientId }
					settings={ [
						{
							label: __( 'Off State (Track)', 'flashblocks-toggle' ),
							colorValue: colorOff,
							onColorChange: ( val ) => setAttributes( { colorOff: val || '#ccc' } ),
						},
						{
							label: __( 'On State (Track)', 'flashblocks-toggle' ),
							colorValue: colorOn,
							onColorChange: ( val ) => setAttributes( { colorOn: val || '#4caf50' } ),
						},
						{
							label: __( 'Thumb (Circle)', 'flashblocks-toggle' ),
							colorValue: colorThumb,
							onColorChange: ( val ) => setAttributes( { colorThumb: val || '#fff' } ),
						},
					] }
					{ ...colorGradientSettings }
				/>
			</InspectorControls>

			{ ! isConfigured ? (
				<Placeholder
					icon="admin-settings"
					label={ __( 'Flashblocks Toggle', 'flashblocks-toggle' ) }
					instructions={ __( 'Set classes in the sidebar to enable toggling.', 'flashblocks-toggle' ) }
				/>
			) : (
				<>
					{ ! labelsInside && (
						<span className="toggle-label left">{ labelLeft || 'Left' }</span>
					) }
					<Button
						className="toggle-switch"
						onClick={ toggle }
						role="switch"
						aria-checked={ activeSide === 'right' }
					>
						{ labelsInside && (
							<>
								<span className="toggle-label-inner left">{ labelLeft || 'Left' }</span>
								<span className="toggle-label-inner right">{ labelRight || 'Right' }</span>
							</>
						) }
					</Button>
					{ ! labelsInside && (
						<span className="toggle-label right">{ labelRight || 'Right' }</span>
					) }
				</>
			) }
		</div>
	);
}
