const gameBoard = (() => {
	const turn = '';
	let playerOne;
	let playerTwo;
	let playerOneScoreCount = 0;
	let playerTwoScoreCount = 0;
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
			fillScoreSection();
			hideToggle(scoreSection);
			render();
			return playerTwo;
		});
	})();
	const hideToggle = (element) => {
		element.classList.toggle('hide');
		element.classList.toggle('show');
	};
	const fillScoreSection = () => {
		const playerOneScoreName = document.getElementById('player-one-score-name');
		const playerTwoScoreName = document.getElementById('player-two-score-name');
		const playerOneScore = document.getElementById('player-one-score');
		const playerTwoScore = document.getElementById('player-two-score');
		playerOneScoreName.textContent = `${playerOne.name}(${playerOne.mark})`;
		playerOneScore.textContent = `${playerOneScoreCount}`;
		playerTwoScoreName.textContent = `${playerTwo.name}(${playerTwo.mark})`;
		playerTwoScore.textContent = `${playerTwoScoreCount}`;
	};
	const fillPlayerTurn = (playerName) => {
		const playerTurn = document.getElementById('player-turn');
		playerTurn.textContent = `"${playerName.name} TURN"`;
	};
	const render = () => {
		for (let i = 0; i < board.length; i++) {
			document.getElementById(`${i}`).textContent = board[i];
			document.getElementById(`${i}`).addEventListener('click', (e) => {
				playerOne.placeMark(e.target);
				playerTwo.placeMark(e.target);
			});
		}
		// Check if win / tie
		gameOver(board);
	};
	const displayOutcome = (playerName = '', outcome = 'TIE') => {
		const gameOverSection = document.getElementById('game-over-section');
		const outcomeDisplay = document.getElementById('outcome-display');
		outcomeDisplay.textContent = `${playerName} ${outcome}`;
		hideToggle(gameOverSection);
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
				if (gameBoard.turn === playerOne.mark) {
					console.log(`${playerOne.name} WON`);
					playerOneScoreCount++;
					displayOutcome(playerOne.name, 'WON');
					fillScoreSection();
				} else {
					console.log(`${playerTwo.name} WON`);
					displayOutcome(playerTwo.name, 'WON');
					playerTwoScoreCount++;
					fillScoreSection();
				}
				break;
			case !board.includes(''):
				displayOutcome();
				console.log('TIE');
				break;
			default:
				console.log(`${gameBoard.turn != playerOne.mark ? playerOne.name : playerTwo.name} TURN`);
				gameBoard.turn != playerOne.mark ? fillPlayerTurn(playerOne) : fillPlayerTurn(playerTwo);
				break;
		}
	};
	return { board, render, turn };
})();

const Player = (name = 'player1', mark = 'X') => {
	const placeMark = (boardPlace) => {
		if (!gameBoard.board[Number(boardPlace.id)] && gameBoard.turn != mark) {
			gameBoard.board[Number(boardPlace.id)] = mark;
			gameBoard.turn = mark;
			gameBoard.render();
		}
	};
	return { name, mark, placeMark };
};
