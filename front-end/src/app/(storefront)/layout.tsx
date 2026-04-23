import StorefrontHeader from './components/StorefrontHeader';
import StorefrontFooter from './components/StorefrontFooter';

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StorefrontHeader />
      <main className="flex-grow">{children}</main>
      <StorefrontFooter />
    </>
  );
}
