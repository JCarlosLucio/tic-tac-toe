const gameBoard = (() => {
	const board = [];
})();

const playerFactoy = (name, mark) => {
	const ready = () => {
		console.log(`${name} has chosen ${mark}`);
	};
	return ready;
};
