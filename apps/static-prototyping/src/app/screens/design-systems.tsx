import * as styles from './design-systems.css';
import { clsx } from 'clsx';

import { MaribuLogoType } from '../components/maribu-logotype';

function ScreenDesignSystems() {
  return (
    <div>
      <h1>
        <MaribuLogoType /> &#8226; Sistem Desain
      </h1>

      <div className={styles.boxColorContainer}>
        <div className={clsx(styles.boxColor, styles.colorGreenDark1)}>
          warna
        </div>
        <div className={clsx(styles.boxColor, styles.colorGreenDark2)}>
          warna
        </div>
      </div>

      <div className={styles.boxColorContainer}>
        <div className={clsx(styles.boxColor, styles.colorGreenLight1)}>
          #ffffe3
        </div>
        <div className={clsx(styles.boxColor, styles.colorGreenLight2)}>
          #ffffe3
        </div>
        <div className={clsx(styles.boxColor, styles.colorGreenLight3)}>
          warna
        </div>
      </div>

      <div className={styles.boxColorContainer}>
        <div className={clsx(styles.boxColor, styles.colorOrange1)}>warna</div>
        <div className={clsx(styles.boxColor, styles.colorOrange2)}>warna</div>
        <div className={clsx(styles.boxColor, styles.colorOrange3)}>warna</div>
      </div>

      <div className={styles.boxColorContainer}>
        <div className={clsx(styles.boxColor, styles.colorGreen1)}>warna</div>
        <div className={clsx(styles.boxColor, styles.colorGreen2)}>warna</div>
        <div className={clsx(styles.boxColor, styles.colorGreen3)}>warna</div>
      </div>

      <div className={styles.boxColorContainer}>
        <div className={clsx(styles.boxColor, styles.colorBrown1)}>warna</div>
        <div className={clsx(styles.boxColor, styles.colorBrown2)}>warna</div>
        <div className={clsx(styles.boxColor, styles.colorBrown3)}>warna</div>
      </div>

      <h2>Tipografi</h2>
      <div>
        Angka currency: <CurrencyLabel value={5000} />
      </div>

      <h1>Heading 1</h1>
      <p>
        Everyone has the right to freedom of thought, conscience and religion;
        this right includes freedom to change his religion or belief, and
        freedom, either alone or in community with others and in public or
        private, to manifest his religion or belief in teaching, practice,
        worship and observance. Everyone has the right to freedom of opinion and
        expression; this right includes freedom to hold opinions without
        interference and to seek, receive and impart information and ideas
        through any media and regardless of frontiers. Everyone has the right to
        rest and leisure, including reasonable limitation of working hours and
        periodic holidays with pay.
      </p>

      <h2>Heading 2</h2>
      <p>
        Everyone has the right to freedom of thought, conscience and religion;
        this right includes freedom to change his religion or belief, and
        freedom, either alone or in community with others and in public or
        private, to manifest his religion or belief in teaching, practice,
        worship and observance. Everyone has the right to freedom of opinion and
        expression; this right includes freedom to hold opinions without
        interference and to seek, receive and impart information and ideas
        through any media and regardless of frontiers. Everyone has the right to
        rest and leisure, including reasonable limitation of working hours and
        periodic holidays with pay.
      </p>

      <h3>Heading 3</h3>
      <p>
        Everyone has the right to freedom of thought, conscience and religion;
        this right includes freedom to change his religion or belief, and
        freedom, either alone or in community with others and in public or
        private, to manifest his religion or belief in teaching, practice,
        worship and observance. Everyone has the right to freedom of opinion and
        expression; this right includes freedom to hold opinions without
        interference and to seek, receive and impart information and ideas
        through any media and regardless of frontiers. Everyone has the right to
        rest and leisure, including reasonable limitation of working hours and
        periodic holidays with pay.
      </p>

      <h4>Heading 4</h4>
      <p>
        Everyone has the right to freedom of thought, conscience and religion;
        this right includes freedom to change his religion or belief, and
        freedom, either alone or in community with others and in public or
        private, to manifest his religion or belief in teaching, practice,
        worship and observance. Everyone has the right to freedom of opinion and
        expression; this right includes freedom to hold opinions without
        interference and to seek, receive and impart information and ideas
        through any media and regardless of frontiers. Everyone has the right to
        rest and leisure, including reasonable limitation of working hours and
        periodic holidays with pay.
      </p>

      <h5>Heading 5</h5>
      <p>
        Everyone has the right to freedom of thought, conscience and religion;
        this right includes freedom to change his religion or belief, and
        freedom, either alone or in community with others and in public or
        private, to manifest his religion or belief in teaching, practice,
        worship and observance. Everyone has the right to freedom of opinion and
        expression; this right includes freedom to hold opinions without
        interference and to seek, receive and impart information and ideas
        through any media and regardless of frontiers. Everyone has the right to
        rest and leisure, including reasonable limitation of working hours and
        periodic holidays with pay.
      </p>

      <h6>Heading 6</h6>
      <p>
        Everyone has the right to freedom of thought, conscience and religion;
        this right includes freedom to change his religion or belief, and
        freedom, either alone or in community with others and in public or
        private, to manifest his religion or belief in teaching, practice,
        worship and observance. Everyone has the right to freedom of opinion and
        expression; this right includes freedom to hold opinions without
        interference and to seek, receive and impart information and ideas
        through any media and regardless of frontiers. Everyone has the right to
        rest and leisure, including reasonable limitation of working hours and
        periodic holidays with pay.
      </p>
    </div>
  );
}

function CurrencyLabel({ value }: { value: number | string }) {
  return <span className={styles.currencyLabel}>Rp{value}</span>;
}

export default ScreenDesignSystems;
