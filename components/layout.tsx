import { ReactNode } from 'react';
import Head from 'next/head';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>
          Nextjs Django Auth0 Base
        </title>
      </Head>
      <main>
        {children}
      </main>
    </>
  );
}
