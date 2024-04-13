import React, { useState, useEffect } from 'react';
import './board.css';
import Square from './Square';

const GameBoard = () => {
    const [arr, setArr] = useState(Array(9).fill(null));
    const [xTurn, setXturn] = useState(true);
    const [blueScore, setBlueScore] = useState(() => parseInt(localStorage.getItem('blueScore')) || 0);
    const [redScore, setRedScore] = useState(() => parseInt(localStorage.getItem('redScore')) || 0);

    useEffect(() => {
        localStorage.setItem('blueScore', blueScore.toString());
        localStorage.setItem('redScore', redScore.toString());
    }, [blueScore, redScore]);

    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
            if (winner === 'X') {
                setRedScore(prevRedScore => prevRedScore + 1);
            } else if (winner === 'O') {
                setBlueScore(prevBlueScore => prevBlueScore + 1);
            }
        }
    }, [arr]);

    const checkWinner = () => {
        const winnerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let line of winnerLines) {
            const [a, b, c] = line;
            if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
                return arr[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (arr[index] || checkWinner()) return;
        const copyState = [...arr];
        copyState[index] = xTurn ? 'X' : 'O';
        setArr(copyState);
        setXturn(!xTurn);
    };

    const resetGame = () => {
        setArr(Array(9).fill(null));
        setXturn(true);
    };

    return (
        <div className='container'>
            <div className='score'>
                <span style={{ color: 'red' }}>Red Score: {redScore}</span>
                <span style={{ color: 'blue' }} className='left'>Blue Score: {blueScore}</span>
            </div>
            <div className='board'>
                <div className="row">
                    <Square onClick={() => handleClick(0)} value={arr[0]} />
                    <Square onClick={() => handleClick(1)} value={arr[1]} />
                    <Square onClick={() => handleClick(2)} value={arr[2]} />
                </div>
                <div className="row">
                    <Square onClick={() => handleClick(3)} value={arr[3]} />
                    <Square onClick={() => handleClick(4)} value={arr[4]} />
                    <Square onClick={() => handleClick(5)} value={arr[5]} />
                </div>
                <div className="row">
                    <Square onClick={() => handleClick(6)} value={arr[6]} />
                    <Square onClick={() => handleClick(7)} value={arr[7]} />
                    <Square onClick={() => handleClick(8)} value={arr[8]} />
                </div>
            </div>
            <div className='button'>
                <button onClick={resetGame}>Start A New Game</button>
            </div>
        </div>
    );
};

export default GameBoard;