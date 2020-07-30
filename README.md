[Home](../README.md)

# blockly-react-sample [![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

This sample shows how to load Blockly in a React and render components in react based on input from blockly.
The main block of interest is the `testTextField` block defined in custombocks.js.
One of these blocks is initially added to the app in App.js on line 78 with a default text of blockly which gets displayed on the react component above.

Another line worth mentioning is this line: `console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.primaryWorkspace)));` found in BlocklyComponent.jsx
this logs out the current xml for the workspace allowing us to easily create a default layout of blocks.

Since blockly keeps track of it's internal state we can listen for events in the `onWorkspaceChange` function in BlocklyComponent.jsx such as non `Blockly.Events.Ui`. 
If these events have the name we're interested in eg `MY_CUSTOM_BLOCK` we add a new block to the redux store.
These get added to the UI as `<Hello>` components on line 58 of App.js


## Running the sample

### Installation

```
npm install
```

### Running

```
npm run start
```

### Browse

Open [http://localhost:3000/](http://localhost:3000/)

## Community projects

[react-blockly](https://github.com/nbudin/react-blockly):
A React component that embeds Blockly. It uses the official [Blockly npm package](https://www.npmjs.com/package/blockly).
