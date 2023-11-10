import { useState, useEffect } from 'react';
import styles from './style.module.scss'

function GameStats({ winList }) {
  const [choiceChanged, setChoiceChanged] = useState(0);
  const [choiceNoChanged, setChoiceNoChanged] = useState(0);

  useEffect(() => {
    if (!winList.length) return
    const choiceNoChangedQuantity = winList.filter(item => !item.selectionChanged).length
    const winsNoChangedChoice = winList.filter(item => !item.selectionChanged).filter(item => item.win).length

    const choiceChangedQuantity = winList.filter(item => item.selectionChanged).length
    const winsChangedChoice = winList.filter(item => item.selectionChanged).filter(item => item.win).length
    if (choiceNoChangedQuantity && winsNoChangedChoice) setChoiceNoChanged(((winsNoChangedChoice / choiceNoChangedQuantity) * 100).toFixed(2))
    if (choiceChangedQuantity && winsChangedChoice) setChoiceChanged(((winsChangedChoice / choiceChangedQuantity) * 100).toFixed(2))


  }, [winList])
  return (
    <div className={styles.stats}>
      <div className={styles.stats__list} >
        {winList.reverse().map(item => (
          <div className={styles.stats__game} key={item.id}>
            <div className={styles.stats__result}>{item.win ? 'Победа' : 'Поражение'}</div>
            <div className={styles.stats__changing}>Выбор: {item.selectionChanged ? 'Изменен' : 'Не изменен'}</div>
          </div>
        ))}
      </div>
      <div className={styles.stats__ratio}>
        <div className={styles.stats__point}>Побед при семе выбора: {choiceChanged}%</div>
        <div className={styles.stats__point}>Побед без смены выбора: {choiceNoChanged}%</div>
      </div>
    </div>
  );
}

export default GameStats;