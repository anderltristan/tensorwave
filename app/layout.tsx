import type { ReactNode } from 'react';
import ClientShell from './ClientShell';

export const metadata = {
  title: 'TensorWave Stock Viewer',
  description: 'Stock viewer code challenge',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
