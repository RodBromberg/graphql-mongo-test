import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getEventsQuery = gql`
  query {
    events {
      title
      description
      price
    }
  }
`;
class Events extends Component {
  //   displayEvents() {
  //     var data = this.props.data;
  //     if (data.loading) {
  //       return <div>Loading Eventss...</div>;
  //     } else {
  //       return data.events.map(a => {
  //         return <li key={Math.random()}>{a.title}</li>;
  //       });
  //     }
  //   }

  render() {
    // return <ul>{this.displayEvents()}</ul>;
    <div>{console.log(this.props)}</div>;
  }
}
export default graphql(getEventsQuery)(Events);

//dsadas
