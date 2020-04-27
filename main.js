const gameBoard = (() => {
	// let board = [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ];
	const board = [ '', '', '', '', '', '', '', '', '' ];
	const render = () => {
		for (let i = 0; i < board.length; i++) {
			document.getElementById(`${i}`).textContent = board[i];
			document.getElementById(`${i}`).addEventListener('click', (e) => {
				console.log(e.target);
				playerOne.placeMark(e.target);
				PlayerTwo.placeMark(e.target);
			});
		}
	};
	const turn = '';
	return { board, render, turn };
})();

const Player = (name = 'player1', mark = 'X') => {
	const chosenMsg = () => {
		console.log(`${name} has chosen ${mark}`);
	};
	const placeMark = (boardPlace) => {
		console.log(boardPlace);
		if (!gameBoard.board[Number(boardPlace.id)] && gameBoard.turn != mark) {
			gameBoard.board[Number(boardPlace.id)] = mark;
			gameBoard.turn = mark;
			gameBoard.render();
		}
	};
	return { name, mark, chosenMsg, placeMark };
};

const playerOne = Player('John', 'X');
const PlayerTwo = Player('Computer', 'O');

gameBoard.render();
