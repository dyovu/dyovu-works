import Link from 'next/link';
import '@/styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head></head>

      <body>
        <header>
          <nav>
            <Link href={'/'}>ホーム</Link>
            <Link href={'/EuclidPattern'}>ユークリッド</Link>
            <Link href={'/PascalesTriangle'}>パスカルの三角形</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
