import { Footer } from "../organisms/layout/Footer";
import { NavBar } from "../organisms/layout/NavBar";

type Props = {
  children: React.ReactNode;
};

export const HeaderLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <NavBar />
      <main className="flex-1 overflow-auto pb-24">{children}</main>
      <Footer />
    </div>
  );
};
