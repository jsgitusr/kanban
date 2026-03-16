import type { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'Kanban Board',
  description: 'Single-board Kanban MVP'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

