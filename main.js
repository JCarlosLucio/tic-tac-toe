const gameBoard = (() => {
	const board = [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ];
	const render = () => {
		for (let i = 0; i < board.length; i++) {
			document.getElementById(`${i}`).textContent = board[i];
		}
	};
	return { render };
})();

const Player = (name = 'player1', mark = 'X') => {
	const chosenMsg = () => {
		console.log(`${name} has chosen ${mark}`);
	};
	return { name, mark, chosenMsg };
};
