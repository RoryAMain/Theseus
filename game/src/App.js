import { Client } from 'boardgame.io/react';
import { Theseus } from './game';
import { TheseusBoard } from './board';

const App = Client({
	game: Theseus,
	board: TheseusBoard,
});

export default App;
