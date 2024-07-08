import Fox, { fox as FoxLayers } from "./fox";

const _fox = Object.assign(Fox, {
	layers: FoxLayers,
});

export { _fox as Fox };
