import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Events from "./componentes/Events";

const client = new ApolloClient({
  uri: "https://unique-project-namess.herokuapp.com/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Events />
        </div>
      </ApolloProvider>
    );
  }
}
export default App;
