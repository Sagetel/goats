import styles from './style.module.scss'
import clsx from 'clsx';

function Card({ inf, selectedCard, setSelectedCard, openedCard }) {
  return (
    <div className={clsx(styles.card, (selectedCard == inf.id && styles.card__selected), (openedCard.includes(inf.id) && styles.card__opened))} onClick={() => { setSelectedCard(inf.id) }}>{inf.car && "win"} </div>
  )
}

export default Card