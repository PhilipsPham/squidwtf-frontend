import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="Audio Stream, Mp3 Stream, Mp3 Download, Free, Find Mp3, Listen music online, download flac"/> 
        <meta name="keywords" content="mp3, stream, download, 2025, 2024, free, audio, high quality, mp3 play, flac, hi-res, Pop music, R&B, Classical, Country, Metal, Rock, Blues, Jazz, Soundtracks, Chillout, Holidays, Ambient, Soul, Techno, Share Mp3"/>
        <meta name="author" content="John Wick"/>
        <meta name="robots" content="index, follow"/>
        
        <title>MP3 Search, FLAC Download - Audios Stream</title>
        <link rel="canonical" href="https://audios.stream/"></link>
        <link rel="icon" href="/logo.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TXDHRCZB00"></script>
        <script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-TXDHRCZB00');`}
        </script>
        <meta name="monetag" content="da31e02e2411cca42c17cf275b51927f"/>
        <script async src="https://ss.mrmnd.com/native.js"></script>
        <style>{`
          body {
            background-color: #F4EBD3;
            color: #555879;
            font-family: 'Inter', sans-serif;
          }
          .btn-primary {
            background-color: #555879;
            border-color: #555879;
            color: white;
          }
          .btn-primary:hover {
            background-color: #464a6b;
            border-color: #464a6b;
            color: white;
          }
          .btn-secondary {
            background-color: #98A1BC;
            border-color: #98A1BC;
            color: white;
          }
          .btn-secondary:hover {
            background-color: #8691a8;
            border-color: #8691a8;
            color: white;
          }
          .bg-dark-custom {
            background-color: #555879;
          }
          .bg-light-custom {
            background-color: #DED3C4;
          }
          .bg-blue-custom {
            background-color: #98A1BC;
          }
          .text-dark-custom {
            color: #555879;
          }
          .text-blue-custom {
            color: #98A1BC;
          }
          .progress-bar-custom {
            background-color: #98A1BC;
          }
          .song-item {
            background-color: #DED3C4;
            border: 1px solid #98A1BC;
          }
          .song-item:hover {
            background-color: #d4c7b5;
          }
          .search-container {
            position: relative;
          }
          .search-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #98A1BC;
            cursor: pointer;
          }
        `}</style>
      </head>
      <body className={`${inter.variable} min-vh-100`}>
        {children}
      </body>
    </html>
  );
}
