import React, { Component } from 'react';
import {
  Grid, Header, Button, Icon
} from 'semantic-ui-react';

import download from 'downloadjs';

import EmailEditor from 'react-email-editor';

class App extends Component {
  constructor() {
    super();

    this.loadDesign = this.loadDesign.bind(this);
    this.handleOnFileChange = this.handleOnFileChange.bind(this);
  }

  exportHtml = () => {
    this.editor.exportHtml((data) => {
      const { html } = data;
      const fileName = Math.random().toString(36).substring(7);
      download(html, `${fileName}.html`, 'text/html');
    });
  }

saveDesign = () => {
  this.editor.saveDesign((data) => {
    const fileName = Math.random().toString(36).substring(7);
    download(JSON.stringify(data), `${fileName}.json`, 'application/json');
  });
}

testHTML = () => {
  this.editor.exportHtml((data) => {
    const { html } = data;
    const tab = window.open('about:blank', '_blank');
    tab.document.write(html);
    tab.document.close();
  });
}

handleOnFileChange = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.readAsText(file);

  reader.addEventListener('loadend', () => {
    const designData = reader.result;
    this.editor.loadDesign(JSON.parse(designData));
  }, false);
}

loadDesign = () => {
  this.fileLoader.click();
}

render() {
  return (
    <Grid style={{ backgroundColor: '#eee' }}>
      <Grid.Row
        centered
        style={{ marginTop: 20 }}
      >
        <Grid.Column
          textAlign="center"
          verticalAlign="middle"
        >
          <Header as="h1">Super(man) Email Editor</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row
        columns={2}
      >
        <Grid.Column
          textAlign="center"
        >
          <Button.Group>
            <Button
              icon
              labelPosition="left"
              color="blue"
              onClick={this.exportHtml}
            >
              <Icon name="share square" />
              Export HTML
            </Button>
            <Button.Or text="or" />
            <Button
              icon
              labelPosition="left"
              color="teal"
              onClick={this.testHTML}
            >
              <Icon name="world" />
              See Output In Your Browser
            </Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column
          textAlign="center"
        >
          <input
            type="file"
            ref={ref => (this.fileLoader = ref)}
            id="fileLoader"
            name="files"
            title="Load File"
            style={{ display: 'none' }}
            onChange={this.handleOnFileChange}
          />
          <Button.Group>
            <Button
              icon
              labelPosition="left"
              color="blue"
              onClick={this.saveDesign}
            >
              <Icon name="cloud download" />
              Download Project
            </Button>
            <Button.Or text="or" />
            <Button
              icon
              labelPosition="left"
              color="teal"
              onClick={this.loadDesign}
            >
              <Icon name="folder open" />
              Open Project
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <EmailEditor
            ref={editor => (this.editor = editor)}
            minHeight="78vh"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
}

export default App;
