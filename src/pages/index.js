import styles from '@/styles/Home.module.css';
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return(
      <div className={styles.container}>
        <p className={styles.title}>Bienvenido...!!</p>
          <BackToTop/>

              {[...new Array(6)]
                  .map(() =>
                      `Cras mattis consectetur purus sit amet fermentum.
                       Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                       Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                       Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                  )
                  .join('\n')}



      </div>

  )
}