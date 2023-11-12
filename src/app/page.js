import styles from './page.module.scss'
import Game from '@/game';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <h1 className={styles.main__title}> <a href='https://ru.wikipedia.org/wiki/%D0%9F%D0%B0%D1%80%D0%B0%D0%B4%D0%BE%D0%BA%D1%81_%D0%9C%D0%BE%D0%BD%D1%82%D0%B8_%D0%A5%D0%BE%D0%BB%D0%BB%D0%B0' target='_blank'> Найди машину!</a></h1>
        <Game />
      </div>
    </main>
  )
}
