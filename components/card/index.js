"use client"
import { useState, useEffect } from 'react';
import styles from './style.module.scss'
import clsx from 'clsx';

function Card({ inf, selectedCard, makeSecondRound, setSelectedCard, openedCard }) {
  const [isOpen, setIsOpen] = useState(false)

  const clickOnCard = (id) => {
    if (openedCard.includes(inf.id)) return
    makeSecondRound(selectedCard == inf.id);
    setSelectedCard(id)
  }

  useEffect(() => {
    setIsOpen(openedCard.includes(inf.id))
  }, [openedCard])
  return (
    <div className={clsx(styles.card, (selectedCard == inf.id && styles.card__selected), (isOpen && styles.card__opened))} onClick={() => { clickOnCard(inf.id) }}>
      <div className={styles.card__face}>Жми!</div>
      <div className={styles.card__back}>{isOpen && (inf.car ? "Машина" : "Козел")}</div>
    </div>
  )
}

export default Card