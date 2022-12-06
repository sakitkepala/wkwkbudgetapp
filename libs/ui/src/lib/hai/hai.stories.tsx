import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Hai } from './hai';

const Story: ComponentMeta<typeof Hai> = {
  component: Hai,
  title: 'Hai',
};
export default Story;

/**
 * Componen story ini, yang di-export di bawah, yang disebut "story"
 * oleh dokumentasi. Story mewakili bagaimana suatu komponen "dipakai"
 * atau dirender ketika disematkan nilai pada props tertentu.
 *
 * Parameter `args` ini adalah props untuk dirender komponen di story,
 * yang mana nilainya diambil dari properti `args` di masing-masing
 * story (?).
 */
const StoryTemplate: ComponentStory<typeof Hai> = (args) => <Hai {...args} />;

export const Utamanya = StoryTemplate.bind({});
Utamanya.args = {
  description:
    'Ini bisa juga mock untuk props diset di sini. Mantap Storybook yak wkwk.',
};

// Cara bind({}) ini dipakai kalau mau storynya dijadikan "template"
// dan export-nya dikasih nama variabel sendiri sehingga bisa dikasih
// objek args sendiri masing-masing.
export const UtamaTapiEnggak = StoryTemplate.bind({});
UtamaTapiEnggak.args = {};

// Gini juga bisa, tapi gak dapet fitur Storybook untuk tampilkan
// "control" di UI yang bisa diutak-atik dari UI. Mantap.
export const GiniJugaBisa: ComponentStory<typeof Hai> = () => (
  <Hai description="uhuy" />
);
