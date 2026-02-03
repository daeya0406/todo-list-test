import localFont from "next/font/local";

export const nanumSquare = localFont({
  src: [
    { path: "../public/fonts/NanumSquare/NanumSquareL.ttf", weight: "300" },
    { path: "../public/fonts/NanumSquare/NanumSquareR.ttf", weight: "400" },
    { path: "../public/fonts/NanumSquare/NanumSquareB.ttf", weight: "700" },
    { path: "../public/fonts/NanumSquare/NanumSquareEB.ttf", weight: "800" },
  ],
  variable: "--font-sans",
  display: "swap",
});
