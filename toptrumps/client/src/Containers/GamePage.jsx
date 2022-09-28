import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardComparisonDetail from '../components/CardComparisonDetail'
import GameForm from '../components/GameForm'
import TopTrumpsService from '../services/TopTrumpsService'
import toptrumpback from '../images/toptrumpback.jpeg'
import NavBar from '../components/Navbar'

import '../css/gamepage.css'
import PlayerDeck from '../components/PlayerDeck'

const GamePage = ({
  playGameRound,
  player1Card,
  player2Card,
  winner,
  controllingPlayer,
  setupGame,
  player1Score,
  player2Score,
  player1DeckState,
  player2DeckState,
  cardComparison,
  setCardComparison,
  selectedCategory,
  setSelectedCategory
}) => {

  const handleRerunSetup = () => {
    setupGame()
  }

  const handleWinningCardModalClick = (e) => {
    e.preventDefault()
    playGameRound(selectedCategory)
    setCardComparison(null)
  }

  const winningCardRender = !cardComparison ? null : (
        <div id='winningCardModal' className='modal'>
          <div id='winningCardFlexContainer'>
            <CardComparisonDetail card={player1Card} />
            <CardComparisonDetail card={player2Card} />
          </div>

          <button onClick={handleWinningCardModalClick}>
            Next Card
          </button>
        </div>
      )

  const winnerRender = !winner ? null : (
        <div className='modal'>
          <div className='modalText' id='myModal'>
            <h2>WE HAVE A WINNER AND IT IS PLAYER {winner}</h2>
            <h3>
              Player 1 Score: {player1Score} - Player 2 Score: {player2Score}{' '}
            </h3>
            <div className='modalbuttons'>
              <Link to='/'>
                <button className='modalbutton' onClick={handleRerunSetup}>
                  Return Home
                </button>
              </Link>
              <Link to='/play'>
                <button className='modalbutton' onClick={handleRerunSetup}>
                  Play Again
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    
  return (
    <>
      <NavBar />
      <div id='gameplayWrapper'>
        <div>
          <PlayerDeck deck={player1DeckState} />
        </div>

        <div className='gridComponent'>
          <GameForm
            card={player1Card}
            controllingPlayer={controllingPlayer}
            playerNumber={1}
            setSelectedCategory={setSelectedCategory}
            setCardComparison={setCardComparison}
          />
          <GameForm
            card={player2Card}
            controllingPlayer={controllingPlayer}
            playerNumber={2}
            setSelectedCategory={setSelectedCategory}
            setCardComparison={setCardComparison}
          />
        </div>

        <div>
          <PlayerDeck deck={player2DeckState} />
        </div>
      </div>
      <div>{winnerRender}</div>
      <div>{winningCardRender}</div>
    </>
  )
}

export default GamePage
