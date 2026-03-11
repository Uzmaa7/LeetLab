import { Outlet , useLocation} from "react-router-dom";
// import Navbar from "../components/Navbar"; // Navbar hum abhi banayenge
import { Header, Footer } from "../components/index"

const Layout = () => {
  const location = useLocation();

  // Jin paths par footer nahi chahiye, unhe is array mein add kar dein
  const pathsWithoutFooter = ["/user/dashboard", "/user/questions", "/user/collections", "/user/contests", "/user/contests/lobby"];

  const pathsWithoutHeader = ["/user/signup", "/user/login"];

  // Check karein ki current path array mein hai ya nahi
  const shouldHideHeader = pathsWithoutHeader.includes(location.pathname);
  const shouldHideFooter = pathsWithoutFooter.includes(location.pathname)


  return (
    <>
        {/* Agar shouldHideHeader false hai, tabhi Header dikhao */}
      {!shouldHideHeader && <Header />}
      
      
      <main className={!shouldHideHeader ? "pt-20" : ""}> 
        <Outlet />
      </main>

        
        {/*if  shouldHideFooter is false then render Footer  */}
      {!shouldHideFooter && (
        <div className="hidden lg:block">
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;