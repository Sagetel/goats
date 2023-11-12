"use client"
import { useEffect, useState } from 'react';
import styles from './style.module.scss'
import CardGame from '@/card';
import GameStats from '@/gameStats';

function Game() {
  const quantityCards = 3; // больше 2
  const [cards, setCards] = useState([{ id: 1, car: false }, { id: 2, car: false }, { id: 3, car: false }])
  const [winList, setWinList] = useState([])
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
  function Win(id, win, isChanged) {
    this.id = id;
    this.win = win;
    this.selectionChanged = isChanged;
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
    setOpenedCard([])
    setSelectedCard(0)
  }

  const makeRound = () => {

    if (!selectedCard || openedCard.length) return
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
    });
    setOpenedCard(openedList)
  }

  const makeWin = (isChanged) => {
    const win = new Win(winList.length, (selectedCard == winCardId), isChanged)
    setWinList([win, ...winList])
  }

  const makeSecondRound = (cardIsChanged) => {
    if (!openedCard.length) { return }
    let value = 1;
    const openedList = []
    while (value < (quantityCards + 1)) {
      openedList.push(value)
      value++
    }
    setOpenedCard(openedList)
    if (cardIsChanged) makeWin(false)

    setTimeout(() => {
      setWinningCard()
    }, "500");
  }

  useEffect(() => {
    setWinningCard()
  }, [])

  useEffect(() => {
    makeRound(true)
  }, [selectedCard])

  useEffect(() => {
    if (!openedCard.length) return
    makeWin(true)
  }, [selectedCard])

  return (
    <div className={styles.game}>
      {/* <button onClick={() => { console.log(winList); }}>dfgdf</button> */}
      <div className={styles.game__cards}>
        {cards.map((card) =>
          <CardGame key={card.id} inf={card} selectedCard={selectedCard} setSelectedCard={setSelectedCard} makeSecondRound={makeSecondRound} openedCard={openedCard} />
        )}
      </div>
      <GameStats winList={winList} />
    </div>
  )
}
export default Game