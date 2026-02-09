import { getContext, store } from "@wordpress/interactivity";

store("flashblocks/toggle", {
	state: {
		toggles: {},
		get isRight() {
			const { toggles } = store("flashblocks/toggle").state;
			const { leftClass, activeSide } = getContext();
			return (toggles[leftClass] || activeSide) === "right";
		},
	},
	actions: {
		toggleContent: () => {
			const { state } = store("flashblocks/toggle");
			const { leftClass } = getContext();

			const current = state.toggles[leftClass] || getContext().activeSide;
			const next = current === "left" ? "right" : "left";

			state.toggles[leftClass] = next;

			if (next === "right") {
				document.body.setAttribute(`data-toggle-${leftClass}`, "right");
			} else {
				document.body.removeAttribute(`data-toggle-${leftClass}`);
			}
		},
	},
	callbacks: {
		init: () => {
			const { state } = store("flashblocks/toggle");
			const { leftClass, activeSide } = getContext();
			if (!state.toggles[leftClass]) {
				state.toggles[leftClass] = activeSide;
			}
		},
	},
});
