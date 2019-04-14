import React, { Component } from "react";
import { Container, Header, Table } from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    let timezoneOffset = -(new Date().getTimezoneOffset() / 60);
    if (timezoneOffset >= 0) timezoneOffset = "+" + timezoneOffset;
    this.state = { records: null, timezoneOffset };
  }

  async componentWillMount() {
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
      <Container text style={{ margin: "40px auto" }}>
        <Header as="h1" textAlign="center">
          🚀 Rockets fly to space! 🚀
        </Header>
        <Table celled columns={3}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Event</Table.HeaderCell>
              <Table.HeaderCell>
                Your time ({this.state.timezoneOffset}h from UTC)
              </Table.HeaderCell>
              <Table.HeaderCell>Countdown</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.records ? (
              this.state.records
                .sort((a, b) => a.fields.UTC > b.fields.UTC)
                .map(record => {
                  console.log(record.fields.UTC.toString());
                  const launchGMT = new Date(record.fields.UTC.toString());
                  const launchGMTDate = launchGMT.toDateString();
                  const launchGMTTime = launchGMT
                    .toTimeString()
                    .substring(0, 5);
                  return (
                    <Table.Row>
                      <Table.Cell>{record.fields.Name}</Table.Cell>
                      <Table.Cell>
                        {launchGMTDate} {launchGMTTime}
                      </Table.Cell>
                      <Table.Cell />
                    </Table.Row>
                  );
                })
            ) : (
              <Table.Row>
                <Table.Cell>Comoonicating with AirTable...</Table.Cell>
                <Table.Cell />
                <Table.Cell />
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default App;
