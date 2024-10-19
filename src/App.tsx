import Router from "~/router";
import { Header } from "./components";
import { QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast"
import { queryClient } from "~/api/query-client.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <Router />
	    <Toaster />
    </QueryClientProvider>
  )
}

export default App;
