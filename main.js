const gameBoard = (() => {
	let state = '';
	let notFinished = true;
	const turn = '';
	let playerOne;
	let playerTwo;
	let playerOneScoreCount = 0;
	let playerTwoScoreCount = 0;
	let board = [ '', '', '', '', '', '', '', '', '' ];
	const start = (() => {
		const pvpBtn = document.getElementById('pvp-btn');
		const pvcBtn = document.getElementById('pvc-btn');
		const stateSection = document.getElementById('state-section');
		const playerSection = document.getElementById('player-section');
		const playerOneForm = document.getElementById('player-one-form');
		const playerTwoForm = document.getElementById('player-two-form');
		const scoreSection = document.getElementById('score-section');
		const playAgainBtn = document.getElementById('play-again');
		pvpBtn.addEventListener('click', (e) => {
			state = 'pvp';
			hideToggle(stateSection);
			hideToggle(playerSection);
			playerOneFormListener(state);
			playerTwoFormListener(state);
		});
		pvcBtn.addEventListener('click', (e) => {
			state = 'pvc';
			hideToggle(stateSection);
			hideToggle(playerSection);
			playerOneFormListener(state);
		});
		const playerOneFormListener = (state) => {
			console.log(state);
			playerOneForm.addEventListener('submit', (e) => {
				const playerOneName = document.getElementById('name-one').value;
				const playerOneMark = playerOneForm.elements['mark'].value;
				playerOne = Player(playerOneName || 'Player 1', playerOneMark);
				e.preventDefault();
				hideToggle(playerOneForm);
				if (state === 'pvp') {
					hideToggle(playerTwoForm);
				} else {
					createComputer();
				}
			});
		};
		const playerTwoFormListener = (state) => {
			console.log(state);
			playerTwoForm.addEventListener('submit', (e) => {
				const playerTwoName = document.getElementById('name-two').value;
				const playerTwoMark = playerOne.mark === 'X' ? 'O' : 'X';
				playerTwo = Player(playerTwoName || 'Player 2', playerTwoMark);
				e.preventDefault();
				hideToggle(playerTwoForm);
				hideToggle(playerSection);
				fillScoreSection();
				hideToggle(scoreSection);
				render();
			});
		};
		const createComputer = () => {
			console.log(state);
			const computerMark = playerOne.mark === 'X' ? 'O' : 'X';
			playerTwo = Player('CPU', computerMark);
			hideToggle(playerSection);
			fillScoreSection();
			hideToggle(scoreSection);
			render();
		};
		playAgainBtn.addEventListener('click', (e) => {
			const gameOverSection = document.getElementById('game-over-section');
			for (let i = 0; i < board.length; i++) {
				board[i] = '';
			}
			notFinished = true;
			hideToggle(gameOverSection);
			render();
			// If game is  PvC lets the computer place their mark first if its their turn after a match
			if (gameBoard.turn === playerOne.mark && state === 'pvc') {
				setTimeout(computerPlaceMark, 500);
			}
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
		playerOneScoreName.textContent = `${playerOne.name} (${playerOne.mark})`;
		playerOneScore.textContent = `${playerOneScoreCount}`;
		playerTwoScoreName.textContent = `${playerTwo.name} (${playerTwo.mark})`;
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
				playerOne.placeMark(e.target.id);
				// Checks if its pvp or pvc to let the computer play or the other player
				if (state !== 'pvc') {
					playerTwo.placeMark(e.target.id);
				} else {
					if (notFinished) {
						setTimeout(computerPlaceMark, 500);
					}
				}
			});
		}
		// Check if win / tie
		gameOver(board);
	};
	// Makes the computer place a mark randomly
	const computerPlaceMark = () => {
		playerTwo.placeMark(Math.floor(Math.random() * 9));
	};
	const displayOutcome = (playerName = '', outcome = 'TIE') => {
		const gameOverSection = document.getElementById('game-over-section');
		const outcomeDisplay = document.getElementById('outcome-display');
		outcomeDisplay.textContent = `${playerName} ${outcome}`;
		hideToggle(gameOverSection);
	};
	const gameOver = (board) => {
		switch (true) {
			case board[0] === board[1] && board[1] === board[2] && board[0] !== '':
			case board[0] === board[3] && board[3] === board[6] && board[0] !== '':
			case board[0] === board[4] && board[4] === board[8] && board[0] !== '':
			case board[1] === board[4] && board[4] === board[7] && board[1] !== '':
			case board[2] === board[4] && board[4] === board[6] && board[2] !== '':
			case board[2] === board[5] && board[5] === board[8] && board[2] !== '':
			case board[3] === board[4] && board[4] === board[5] && board[3] !== '':
			case board[6] === board[7] && board[7] === board[8] && board[6] !== '':
				if (gameBoard.turn === playerOne.mark) {
					console.log(`${playerOne.name} WON`);
					playerOneScoreCount++;
					displayOutcome(playerOne.name, 'WON');
					notFinished = false;
					fillScoreSection();
				} else {
					console.log(`${playerTwo.name} WON`);
					displayOutcome(playerTwo.name, 'WON');
					notFinished = false;
					playerTwoScoreCount++;
					fillScoreSection();
				}
				break;
			case !board.includes(''):
				displayOutcome();
				notFinished = false;
				console.log('TIE');
				break;
			default:
				console.log(`${gameBoard.turn !== playerOne.mark ? playerOne.name : playerTwo.name} TURN`);
				gameBoard.turn !== playerOne.mark ? fillPlayerTurn(playerOne) : fillPlayerTurn(playerTwo);
				break;
		}
	};
	return { board, render, turn };
})();

const Player = (name, mark) => {
	const placeMark = (boardPlaceId) => {
		if (!gameBoard.board[Number(boardPlaceId)] && gameBoard.turn !== mark) {
			gameBoard.board[Number(boardPlaceId)] = mark;
			gameBoard.turn = mark;
			gameBoard.render();
		}
	};
	return { name, mark, placeMark };
};
