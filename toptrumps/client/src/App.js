import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import ViewCardsPage from './Containers/ViewCardsPage'
import TopTrumpsService from './services/TopTrumpsService'
import Title from './components/Title'
import GamePage from './containers/GamePage'

function App() {
  const [cards, setCards] = useState([])
  const [player1Deck, setPlayer1Deck] = useState()
  const [player2Deck, setPlayer2Deck] = useState()

  useEffect(() => {
    TopTrumpsService.getTopTrumps().then((cards) => setCards(cards))
  }, [])

  // add a single card to a players deck. Have to pass in actual player Number

  const addCardToDeck = (cards, playerNumber) => {
    let playerDeck = undefined
    let setDeck = undefined
    if (playerNumber === 1) {
      playerDeck = player1Deck
      setDeck = setPlayer1Deck
    } else {
      playerDeck = player2Deck
      setDeck = setPlayer2Deck
    }
    if (!playerDeck) {
      setDeck(cards)
    } else {
      const copyOfPlayerDeck = playerDeck.map((cardInDeck) => cardInDeck)
      cards.forEach((card) => {
        copyOfPlayerDeck.push(card)
      })
      setDeck(copyOfPlayerDeck)
    }
  }

  // Delete a single card from a deck

  const deleteCardFromDeck = (card, playerNumber) => {
    let playerDeck = undefined
    let setDeck = undefined
    if (playerNumber === 1) {
      playerDeck = player1Deck
      setDeck = setPlayer1Deck
    } else {
      playerDeck = player2Deck
      setDeck = setPlayer2Deck
    }
    const copyOfPlayerDeck = playerDeck.map((cardInDeck) => cardInDeck)
    const cardIndex = copyOfPlayerDeck.indexOf(card)
    copyOfPlayerDeck.splice(cardIndex, 1)
    setDeck(copyOfPlayerDeck)
  }

  // Shuffle main deck

  const shuffleDeck = () => {
    let copyOfCards = cards.map((cardInDeck) => cardInDeck)
    const shuffledDeck = copyOfCards.sort(() => Math.random() - 0.5)
    setCards(shuffledDeck)
  }

  // Deal deck of cards

  const dealDeck = () => {
    let playerAssignment = 0
    let dealerCards = [[], []]
    cards.forEach((card) => {
      let playerNumber = playerAssignment % 2
      dealerCards[playerNumber].push(card)
      playerAssignment += 1
    })
    addCardToDeck(dealerCards[0], 1)
    addCardToDeck(dealerCards[1], 2)
  }

  // GAME MECHANICS

  let [controllingPlayer, setControllingPlayer] = useState(1)
  let [player1Card, setPlayer1Card] = useState()
  let [player2Card, setPlayer2Card] = useState()
  let [winner, setWinner] = useState(null)

  // assign selected cards

  const selectCards = () => {
    setPlayer1Card(player1Deck[0])
    deleteCardFromDeck(player1Card, 1)
    setPlayer2Card(player2Deck[0])
    deleteCardFromDeck(player2Card, 2)
  }

  // Comparison function

  const decideWinner = (attribute) => {
    if (controllingPlayer == 1) {
      if (player1Card[attribute] > player2Card[attribute]) {
        addCardToDeck([player1Card, player2Card], 1)
      } else {
        addCardToDeck([player1Card, player2Card], 2), setControllingPlayer(2)
      }
    }
    if (controllingPlayer == 2) {
      if (player2Card[attribute] > player1Card[attribute]) {
        addCardToDeck([player2Card, player1Card], 2)
      } else {
        addCardToDeck([player2Card, player1Card], 1), setControllingPlayer(1)
      }
    }
  }

  // this is what happens when you click start game

  const gameplaySetup = () => {
    shuffleDeck()
    dealDeck()
    selectCards()
  }

  const gameplayLoop = (attribute) => {
    decideWinner(attribute)
    if (player1Deck.length === cards.length) {
      setWinner(1)
    } else if (player2Deck.length === cards.length) {
      setWinner(2)
    } else {
      selectCards()
    }
  }

  // play game function

  // set up

  // play game
  // shuffle cards
  // deal cards

  // gameplay

  // draw card
  // select attribute
  // decide winner (distributes cards)
  // check deck matches masterdeck

  // end state

  // displays winner

  // End of game

  // Testing of functions

  const handleClickAdd = () => {
    addCardToDeck(cards[1], 1)
    addCardToDeck(cards[3], 2)
  }

  const handleClickDelete = () => {
    deleteCardFromDeck(player1Deck[0], 1)
  }

  const handleClickShuffle = () => {
    shuffleDeck()
  }

  const handleClickDeal = () => {
    dealDeck()
  }

  const handleClickSelect = () => {
    selectCards()
  }

  const handleClickDuel = () => {
    decideWinner('Fattest')
  }

  const handleClickPlay = () => {
    gameplaySetup()
  }

  const handleClickGameLoop = () => {
    gameplayLoop('Fattest')
  }

  // addCardToDeck(cards[0], 1)

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Title cards={cards} />} />
          <Route path="/play" element={<GamePage />} />
          <Route path="/cards" element={<ViewCardsPage cards={cards} />} />
        </Routes>
      </Router>

      {/* <h1>Welcome to TopTrumps</h1>
      <button onClick={handleClickAdd}>TESTING ADD</button>
      <button onClick={handleClickDelete}>TESTING DELETE</button>
      <button onClick={handleClickShuffle}>TESTING SHUFFLE</button>
      <button onClick={handleClickDeal}>TESTING DEAL</button>
      <button onClick={handleClickSelect}>TESTING SELECT</button>
      <button onClick={handleClickDuel}>TESTING DUEL</button>
      <button onClick={handleClickPlay}>TESTING Play</button>
      <button onClick={handleClickGameLoop}>TESTING Loop</button>

      <ViewCardsPage cards={cards} /> */}
    </>
  )
}

export default App
