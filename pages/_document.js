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
        <link rel="icon" href="img/odek.png" />
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
      
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
     
     {/**settings sayfası için ekledim */}
        <link
          rel="stylesheet"
           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
           integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMrLWlyC0GfZGGgX3xtsH2dFMZtR9d5qfAK7w7Q"
          crossorigin="anonymous"
        />
        {/**Settings account vs. iconları için ekledim */}
     <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
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
