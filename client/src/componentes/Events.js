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
  render() {
    console.log(this.props);
    return <div>hi</div>;
  }
}
export default graphql(getEventsQuery)(Events);
