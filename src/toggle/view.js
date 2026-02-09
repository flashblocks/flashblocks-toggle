import { store, getContext } from '@wordpress/interactivity';

store( 'flashblocks/toggle', {
	state: {
		get isRight() {
			const context = getContext();
			return context.activeSide === 'right';
		},
	},
	actions: {
		toggleContent: () => {
			const context = getContext();
			const newSide =
				context.activeSide === 'left' ? 'right' : 'left';
			context.activeSide = newSide;

			if ( newSide === 'right' ) {
				document.body.setAttribute(
					`data-toggle-${ context.leftClass }`,
					'right'
				);
			} else {
				document.body.removeAttribute(
					`data-toggle-${ context.leftClass }`
				);
			}
		},
	},
} );
