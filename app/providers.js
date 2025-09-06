// "use client";
// import { Provider } from "react-redux"; 
// import { store } from "./store/store"; 

// export function Providers({ children }) {
//   return <Provider store={store}>{children}</Provider>; 
// }
"use client";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "./store/store";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
}
