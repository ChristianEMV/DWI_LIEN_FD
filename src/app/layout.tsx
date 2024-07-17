import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
          <Navbar/>
          <div style={{ marginTop: '64px' }}></div>
          {children}
          <br/>
          <Footer/> 
        </body>
      </html>
    );
  }