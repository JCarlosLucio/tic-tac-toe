const gameBoard = (() => {
	// let board = [ 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O' ];
	let playerOne;
	let playerTwo;
	const board = [ '', '', '', '', '', '', '', '', '' ];
	const start = (() => {
		const startBtn = document.getElementById('start-btn');
		const stateSection = document.getElementById('state-section');
		const playerSection = document.getElementById('player-section');
		const playerOneForm = document.getElementById('player-one-form');
		const playerTwoForm = document.getElementById('player-two-form');
		const scoreSection = document.getElementById('score-section');
		startBtn.addEventListener('click', (e) => {
			hideToggle(stateSection);
			hideToggle(playerSection);
		});
		playerOneForm.addEventListener('submit', (e) => {
			const playerOneName = document.getElementById('name-one').value;
			const playerOneMark = playerOneForm.elements['mark'].value;
			playerOne = Player(playerOneName, playerOneMark);
			e.preventDefault();
			hideToggle(playerOneForm);
			hideToggle(playerTwoForm);
			return playerOne;
		});
		playerTwoForm.addEventListener('submit', (e) => {
			const playerTwoName = document.getElementById('name-two').value;
			const playerTwoMark = playerOne.mark === 'X' ? 'O' : 'X';
			playerTwo = Player(playerTwoName, playerTwoMark);
			e.preventDefault();
			hideToggle(playerTwoForm);
			hideToggle(playerSection);
			hideToggle(scoreSection);
			render();
			return playerTwo;
		});
	})();
	const hideToggle = (element) => {
		element.classList.toggle('hide');
		element.classList.toggle('show');
	};
	const render = () => {
		for (let i = 0; i < board.length; i++) {
			document.getElementById(`${i}`).textContent = board[i];
			document.getElementById(`${i}`).addEventListener('click', (e) => {
				// console.log(e.target);
				playerOne.placeMark(e.target);
				playerTwo.placeMark(e.target);
			});
		}
		// Check if win / tie
		gameOver(board);
	};
	const gameOver = (board) => {
		switch (true) {
			case board[0] === board[1] && board[1] === board[2] && board[0] != '':
			case board[0] === board[3] && board[3] === board[6] && board[0] != '':
			case board[0] === board[4] && board[4] === board[8] && board[0] != '':
			case board[1] === board[4] && board[4] === board[7] && board[1] != '':
			case board[2] === board[4] && board[4] === board[6] && board[2] != '':
			case board[2] === board[5] && board[5] === board[8] && board[2] != '':
			case board[3] === board[4] && board[4] === board[5] && board[3] != '':
			case board[6] === board[7] && board[7] === board[8] && board[6] != '':
				console.log(`${gameBoard.turn === playerOne.mark ? playerOne.name : playerTwo.name} WON`);
				break;
			case !board.includes(''):
				console.log('TIE');
				break;
			default:
				console.log('WE ARE NOT DONE YET');
		}
	};
	const turn = '';
	return { board, start, render, turn };
})();

const Player = (name = 'player1', mark = 'X') => {
	const chosenMsg = () => {
		console.log(`${name} has chosen ${mark}`);
	};
	const placeMark = (boardPlace) => {
		// console.log(boardPlace);
		if (!gameBoard.board[Number(boardPlace.id)] && gameBoard.turn != mark) {
			gameBoard.board[Number(boardPlace.id)] = mark;
			gameBoard.turn = mark;
			gameBoard.render();
		}
	};
	return { name, mark, chosenMsg, placeMark };
};

// const playerOne = Player('John', 'X');
// const playerTwo = Player('Computer', 'O');

// gameBoard.start();
