import { NavBar } from "../organisms/layout/NavBar";

type Props = {
  children: React.ReactNode;
};

export const HeaderLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
