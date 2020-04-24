const gameBoard = (() => {
	const board = [];
})();

const Player = (name = 'player1', mark = 'X') => {
	const chosenMsg = () => {
		console.log(`${name} has chosen ${mark}`);
	};
	return { name, mark, chosenMsg };
};
