import { useState, useEffect } from 'react';
import styles from './style.module.scss'
import clsx from 'clsx';

function GameStats({ winList }) {
  const [choiceChanged, setChoiceChanged] = useState(0);
  const [choiceNoChanged, setChoiceNoChanged] = useState(0);

  const [choiceChangedLength, setChoiceChangedLength] = useState(0);
  const [choiceNoChangedLength, setChoiceNoChangedLength] = useState(0);

  useEffect(() => {
    if (!winList.length) return
    const choiceNoChangedQuantity = winList.filter(item => !item.selectionChanged).length
    const winsNoChangedChoice = winList.filter(item => !item.selectionChanged).filter(item => item.win).length
    setChoiceNoChangedLength(winList.filter(item => !item.selectionChanged).length)

    const choiceChangedQuantity = winList.filter(item => item.selectionChanged).length
    const winsChangedChoice = winList.filter(item => item.selectionChanged).filter(item => item.win).length
    setChoiceChangedLength(winList.filter(item => item.selectionChanged).length)
    if (choiceNoChangedQuantity && winsNoChangedChoice) setChoiceNoChanged(((winsNoChangedChoice / choiceNoChangedQuantity) * 100).toFixed(2))
    if (choiceChangedQuantity && winsChangedChoice) setChoiceChanged(((winsChangedChoice / choiceChangedQuantity) * 100).toFixed(2))


  }, [winList])
  return (
    <div className={styles.stats}>
      <div className={styles.stats__list} >
        {winList.reverse().map(item => (
          <div className={clsx(styles.stats__game, (item.win ? styles.stats__win : styles.stats__lose))} key={item.id}>
            <div className={styles.stats__result}>{item.win ? 'Победа' : 'Поражение'}</div>
            <div className={styles.stats__changing}>Выбор: {item.selectionChanged ? 'Изменен' : 'Не изменен'}</div>
          </div>
        ))}
      </div>
      <div className={styles.stats__ratio}>
        <div className={styles.stats__point}>Побед при семе выбора: {choiceChanged}% <span>/ {choiceChangedLength}</span></div>
        <div className={styles.stats__point}>Побед без смены выбора: {choiceNoChanged}% <span>/ {choiceNoChangedLength}</span></div>
      </div>
    </div>
  );
}

export default GameStats;