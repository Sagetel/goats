import styles from './page.module.scss'
import Game from '@/game';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <h1 className={styles.main__title}>Найди машину!</h1>
        <Game/>
      </div>
    </main>
  )
}
