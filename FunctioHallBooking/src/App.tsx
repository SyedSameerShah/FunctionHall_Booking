import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hall from "./components/Hall";
import FunctionHall from "./components/FunctionHall";

function App() {
//https://function-hall-booking-zpk8-8mgjsudog-syedsameershah.vercel.app
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
  });


  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Hall />  } />
          <Route path="/halls/:id" element={  <FunctionHall/> } />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App;

