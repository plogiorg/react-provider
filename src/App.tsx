import { Router } from "./router";
import { useEffect } from "react";
import { Pi } from '@pinetwork-js/sdk';

function App() {

  useEffect(() => {
    const initPi = async () => {
      try {
        await Pi.init({ version: "2.0", sandbox: true });
        console.log("Pi Init State Is: ", Pi.initialized);
      } catch (error) {
        console.error('Error initializing Pi:', error);
      }
    };

    initPi();
  }, []);

  return (
    <div className="py-2">
      <Router />
    </div>
  );
}

export default App;
