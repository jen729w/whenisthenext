import React, { Component } from "react";
import { Container, Header, List } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { records: null };
  }

  async componentWillMount() {
    const key = "keyLiuEgDfEDAxUbf";
    const url =
      "https://api.airtable.com/v0/appouNZsxBNr6RBZ4/Events?api_key=keyLiuEgDfEDAxUbf";

    const resp = await fetch(url);
    const json = await resp.json();
    const { records } = json;
    this.setState({ records });
    // console.log(records);
  }

  render() {
    return (
      <Container text style={{ margin: "40px auto", "max-width": "650px" }}>
        <Header as="h1">When Is It On?</Header>
        {this.state.records ? (
          <ul>
            {this.state.records
              .sort((a, b) => a.fields.UTC > b.fields.UTC)
              .map(record => {
                console.log(record.fields.UTC.toString());
                const launchGMT = new Date(record.fields.UTC.toString());
                // test
                return (
                  <li style={{ padding: "5px" }}>
                    {record.fields.Name}
                    <ul>
                      <li style={{ padding: "5px" }}>{launchGMT.toString()}</li>
                    </ul>
                  </li>
                );
              })}
          </ul>
        ) : null}
      </Container>
    );
  }
}

export default App;
