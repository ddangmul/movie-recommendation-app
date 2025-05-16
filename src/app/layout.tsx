import type { Metadata } from "next";
import MainHeader from "../components/main-header";
import "../styles/globals.css";
import Footer from "../components/footer";
import { RatingProvider } from "../contexts/rating-context";
import { StorageProvider } from "../contexts/storage-context";

export const metadata: Metadata = {
  title: "REEL PICK | 영화 추천 서비스",
  description: "영화, 시리즈 평가&추천 서비스",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <StorageProvider>
            <RatingProvider>
              <MainHeader />
              {children}
              <Footer />
            </RatingProvider>
          </StorageProvider>
        </div>
      </body>
    </html>
  );
}
