import { RiHome3Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen text-[10rem]">
        <RiHome3Line />
      </div>
      <Button variant="outline">Button Example</Button>
    </>
  );
}

export default App;
