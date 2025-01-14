import Link from 'next/link';
import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
      </head>

      <body>
        <header>
          <nav>
            <Link href={'/'}>ホーム</Link>
            <Link href={'/EuclidPattern'}>ユークリッド</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
