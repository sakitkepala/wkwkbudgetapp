import { MaribuLogoType } from '../components/maribu-logotype';
import * as styles from './user-home.css';

const menus = _makeMenus([
  {
    label: 'Catat Pengeluaran',
    description: 'deskripsi catat pengeluaran',
    emoji: '🤳',
  },
  {
    label: 'Buat Belanjaan',
    description: 'deskripsi buat belanjaan',
    emoji: '📜',
  },
  {
    label: 'Tambah Belanja-able',
    description: 'deskripsi buat itu belanja-able',
    // emoji: '🔖',
    // emoji: '🌟',
    emoji: '🛍️',
    // emoji: '🍱',
    // emoji: '📚',
    // emoji: '🧰',
    // emoji: '💽',
    // emoji: '🌌',
  },
]);

function ScreenUserHome() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <MaribuLogoType />
      </header>
      <div className={styles.illustratedGreetings} />

      <div>
        <div className={styles.spendingPlanPrompt}>
          Hai 👋 Kamu belum punya <strong>Rencana Pengeluaran</strong>.{' '}
          <a className={styles.linkCreatePlan} href="/u/spending-plan">
            Mau buat
          </a>
          ?
        </div>
        <div className={styles.menuList}>
          {menus.map((menu) => (
            <MenuButton key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
}

function _makeMenus(menus: MenuWithoutId[] = []): Menu[] {
  return menus.map((menu, i) => ({ ...menu, id: i + 1 }));
}

type Menu = { id: number } & MenuWithoutId;

type MenuWithoutId = {
  label: string;
  description: string;
  emoji?: string;
};

function MenuButton({ menu }: { menu: Menu }) {
  return (
    <button className={styles.menuItem}>
      <div className={styles.menuLabel}>
        <div className={styles.menuLabelText}>{menu.label}</div>
      </div>
      <div className={styles.menuRightIcon}>
        <span className={styles.fakeIcon}>{menu.emoji || 'IC'}</span>
      </div>
    </button>
  );
}

export default ScreenUserHome;
