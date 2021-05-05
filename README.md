Hai, ini pet projek yang "kupelihara" untuk bereksplorasi dengan React dan animasi UI.

Demonya ada di sini (WIP): [https://sakitkepala.github.io/wkwkbudgetapp/#/u/budget](https://sakitkepala.github.io/wkwkbudgetapp/#/u/budget)

> Demo dan source code masih tahap _work in progress_, harapkan demonya belum stabil, bisa berubah sewaktu-waktu, dan bahkan ada yang tidak jalan. Sedang saya kerjakan :)

Saya ingin fokus pada implementasi animasi user interface-nya di sini. Hanya saja, saya pikir tetap butuh fitur yang bisa jalan, minimal satu siklus interaksi supaya bisa lebih mensimulasikan bagaimana user berinteraksi dengan fitur UI. Jadi masih ada fitur-fitur yang belum diimplentasi di sini, dan belum ada siklus CRUD lengkap untuk tiap model datanya.

Awalnya saya pakai Next.js dengan alasan supaya bisa di*build* jadi halaman statis dan dideploy di Github Pages untuk demo. Lalu saya pikir lebih baik dengan Create React App saja supaya bisa lebih fleksibel dalam bereksplorasi. Ada fitur yang sudah saya buat ketika masih pakai Next.js tapi belum dimigrasikan ke sini.

Repo lamanya bisa dilihat di sini: [https://github.com/sakitkepala/budgetapp-spike-with-nextjs](https://github.com/sakitkepala/budgetapp-spike-with-nextjs).

## Stack

Untuk awal development ini, saya ingin buat prototip dengan cepat. Jadi saya pakai beberapa library untuk membantuku:

- [Create React App](https://create-react-app.dev/docs/getting-started)
- [Chakra UI](https://chakra-ui.com/docs/getting-started)
- ~~Reach Router~~ React Router, untuk pakai _[hash routing](https://reactrouter.com/web/api/HashRouter)_-nya
- [Framer Motion](https://www.framer.com/api/motion/)
- MSW, untuk [mocking server/back-end REST](https://mswjs.io/docs/getting-started/mocks/rest-api)
- [React Query](https://react-query.tanstack.com/overview)

Chakra UI lumayan _awesome_ juga untuk buat UI: lumayan membantu terutama untuk urusan accessibility dan dalam hal menangani [_focus management_](https://chakra-ui.com/docs/overlay/modal#keyboard-and-focus-management), sehingga di tahap ini saya tidak perlu memikirkan masalah ini dulu. Saya ingin merefaktornya nanti, mungkin pindah ke Styled Component atau Emotion, untuk mengimplementasinya sendiri di tahap berikutnya. Framer Motion juga _awesome_, dan untuk animasi, saya tidak kepikiran library animasi lain, kecuali mungkin [GSAP](https://greensock.com/docs/v3/GSAP)&mdash;tapi perlu effort bikin wrapper Reactnya karena implementasi GSAP lebih imperatif.

Stack di atas sepenuhnya dipilih dari apa yang terpikirkan saat itu: tidak ada pertimbangan khusus kecuali selera. Terkhusus React Query, saya pilih karena kesulitan memilih solusi dalam hal manajemen state karena banyaknya pilihan di ekosistem React. Akhirnya saya mengikuti [ide dan anjuran Kent C. Dodds](https://kentcdodds.com/blog/application-state-management-with-react) soal manajemen state berdasarkan [pengalamannya di Paypal](https://epicreact.dev/my-state-management-mistake/).

# Milestones

Beberapa fitur yang mau kuimplementasikan (tapi belum):

- [ ] Otentikasi user
- [ ] Animasi transisi routing dan _micro-interaction_
- [ ] Dashboard dan visualisasi data
- [ ] Shortcut kibor dan _command pallet_ (seperti fitur VS Code)
- [ ] Unit test dan integration test
- [ ] Theming
- [ ] Layout responsif
- [ ] Halaman pengunjung tanpa otentikasi

_Stay tuned!_

# Terima kasih!

Terima kasih sudah mampir. Silakan posting di diskusi di atas kalau pingin sapa-sapa atau kasih masukan. Ayo kita ngoprek bareng :)
