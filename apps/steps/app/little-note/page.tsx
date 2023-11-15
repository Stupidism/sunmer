import React from 'react';

import { LittleNotesPrinter } from '../components/little-note-printer';

export const metadata = {
  title: '小纸条打印机',
  description: '小纸条',
};

export default function LittleNoteRoute() {
  return <LittleNotesPrinter />;
}
