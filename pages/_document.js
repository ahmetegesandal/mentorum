import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="tr"
      className="light-style layout-navbar-fixed layout-menu-fixed"
      dir="ltr"
    >
      <Head>
        {/* Jitsi Meet API */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://meet.jit.si/external_api.js"></script>

        {/* Favicon */}
        <link rel="icon" href="img/favicon/favicon.ico" />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
