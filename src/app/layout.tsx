import "./globals.css";

export const metadata = {
  title: "El Gurú Elite",
  description: "Plataforma de Inversión Deportiva",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
