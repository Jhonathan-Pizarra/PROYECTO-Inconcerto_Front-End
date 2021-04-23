import styles from '@/styles/Home.module.css';
import {Button} from "@material-ui/core";
import BackToTop from "@/components/Scroll";

export default function Home() {
  return(
      <div className={styles.container}>
        <p className={styles.title}>Bienvenido...!!</p>
          <BackToTop/>
      </div>

  )
}