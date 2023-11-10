"use client"
import { useEffect, useState } from 'react';
import styles from './style.module.scss'
import CardGame from '@/card';

function Game() {
  const quantityCards = 3;
  const [cards, setCards] = useState([{ id: 1, car: false }, { id: 2, car: false }, { id: 3, car: false }])
  const [openedCard, setOpenedCard] = useState([])
  const [winCardId, setWinCardId] = useState(0)
  const [selectedCard, setSelectedCard] = useState(0)
  const randomize = () => {
    return Math.floor(Math.random() * quantityCards) + 1
  }

  function Card(id, win) {
    this.id = id;
    this.car = win;
  }

  const setWinningCard = () => {
    const number = randomize()
    setWinCardId(number)
    const preCards = []
    for (let i = 1; i <= quantityCards; i++) {
      const preCard = new Card(i, (i == number))
      preCards.push(preCard)
    }
    setCards(preCards)
    setSelectedCard(0)
  }

  const makeRound = () => {
    if (!selectedCard) return
    let chosenOneCard = null
    while ((chosenOneCard == winCardId) || !chosenOneCard) {
      if (selectedCard != winCardId) break
      chosenOneCard = randomize()
      if (chosenOneCard == selectedCard) chosenOneCard = 0
    }

    let missedCard = false
    const openedList = []
    cards.forEach(card => {
      if (card.id == selectedCard) return
      if (card.car) { missedCard = true; return }
      if (card.id == chosenOneCard) { missedCard = true; return }
      openedList.push(card.id)
      console.log("отрываем " + card.id + ", избранный " + chosenOneCard);
    });
    setOpenedCard(openedList)
  }

  useEffect(() => {
    setWinningCard()
  }, [])

  useEffect(() => {
    makeRound()
  }, [selectedCard])

  return (
    <div className={styles.game}>
      {cards.map((card) =>
        <CardGame key={card.id} inf={card} selectedCard={selectedCard} setSelectedCard={setSelectedCard} openedCard={openedCard} />
      )}
      <button onClick={() => { setWinningCard() }}>reroll</button>
    </div>
  )
}

export default Game