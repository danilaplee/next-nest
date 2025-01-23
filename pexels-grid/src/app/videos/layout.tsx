export default function RootLayout({
  children,
  videomodal,
}: Readonly<{
  children: React.ReactNode;
  videomodal: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {videomodal}
    </>
  );
}
