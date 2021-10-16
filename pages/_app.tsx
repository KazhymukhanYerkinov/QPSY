import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }): JSX.Element {
  return (
  <React.Fragment>
    <Head>
      <title> QPSY </title>
      <link key = {1} rel = "icon" href = "/favicon.ico"></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </React.Fragment>
  );
}

export default MyApp;
