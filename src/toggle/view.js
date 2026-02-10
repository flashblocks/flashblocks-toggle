import { getContext, store } from "@wordpress/interactivity";

const { state } = store("flashblocks/toggle", {
	state: {
		toggles: {},
		get isRight() {
			const { leftClass, activeSide } = getContext();
			return (state.toggles[leftClass] || activeSide) === "right";
		},
	},
	actions: {
		toggleContent: () => {
			const { leftClass } = getContext();
			const current = state.toggles[leftClass] || getContext().activeSide;
			const next = current === "left" ? "right" : "left";

			state.toggles[leftClass] = next;

			// Sync to body attribute for CSS targeting.
			if (next === "right") {
				document.body.setAttribute(`data-toggle-${leftClass}`, "right");
			} else {
				document.body.removeAttribute(`data-toggle-${leftClass}`);
			}
		},
	},
	callbacks: {
		init: () => {
			const { leftClass, activeSide } = getContext();
			if (!state.toggles[leftClass]) {
				state.toggles[leftClass] = activeSide;
			}
		},
	},
});
