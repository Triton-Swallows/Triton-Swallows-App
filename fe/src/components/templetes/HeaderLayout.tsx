import { Footer } from "../organisms/layout/Footer";
// import { NavBar } from "../organisms/layout/NavBar";
import { Header } from "../organisms/layout/Header";

type Props = {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  transparent?: boolean;
  backgroundImage?: string;
  path?: string;
};

export const HeaderLayout: React.FC<Props> = ({ children, ...headerProps }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* <NavBar /> */}
      <Header {...headerProps} />
      <main className="flex-1 overflow-auto pb-[24px] pt-[56px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
