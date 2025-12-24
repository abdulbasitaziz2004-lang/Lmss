import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children, hideNavFooter }) => {
  return (
    <div>
      {!hideNavFooter && <Navbar />}
      {children}
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default Layout;
