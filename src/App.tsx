import Router from "~/router";
import { Header } from "./components";
import { QueryClientProvider } from "react-query";
import { queryClient } from "~/api/query-client.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <Router />
    </QueryClientProvider>
  )
}

export default App;
