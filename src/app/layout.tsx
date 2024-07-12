import Navbar from "../components/Navbar";
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
          <Navbar/>
          <div style={{ marginTop: '64px' }}></div>
          {children} 
        </body>
      </html>
    );
  }