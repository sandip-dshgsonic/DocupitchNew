import Header from '../components/Header';
import Footer from '../components/Footer';
import MouseTrail from '../components/animations/MouseTrail';
import { ThemeProvider } from '../providers/ThemeProvider';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <MouseTrail />
      <Header />
      <ThemeProvider>
      <main className="flex-grow">
        {children}
      </main>
      </ThemeProvider>
      <Footer />
    </div>
  );
}