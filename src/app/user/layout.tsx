export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen mt-24 px-4 md:px-6 lg:px-60">{children}</div>
  );
}
