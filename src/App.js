/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import './App.css';

import logo from './logo.svg';

import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './generator/generator';
import {Hello} from "./Hello";
import {connect} from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    this.state = {components: [{name: 'dummy name'}]};
  }

  generateCode = () => {
    console.log("code");
  };

  render() {
      console.log('num components props' + this.props && this.props.components);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={this.generateCode}>Convert</button>
            <div>
                <h1>Generated Output</h1>
                {this.props.components && this.props.components.map( (component, index) => <Hello name={component.name} key={index}/>)}
            </div>
                <BlocklyComponent ref={this.simpleWorkspace}
                                  readOnly={false} trashcan={true} media={'media/'}
                                  move={{
                                      scrollbars: true,
                                      drag: true,
                                      wheel: true
                                  }}
                                  initialXml={`
<xml xmlns="https://developers.google.com/blockly/xml">
    <block type="controls_ifelse" id="MzZa{zZcCIU,HG#XyC?n" x="27" y="48">
        <value name="IF0">
            <block type="logic_boolean" id="H=1SP1qnt?!DlsipBN]e">
                <field name="BOOL">
                    true
                </field>
            </block>
        </value>
        <statement name="DO0">
            <block type="test_text_field" id="123">
                <field name="MY_CUSTOM_BLOCK">
                    blockly
                </field>
            </block>
        </statement>
    </block>
</xml>
      `}>
                    <Block type="test_react_field" />
                    <Block type="test_text_field" />
                    <Block type="test_react_date_field" />
                    <Block type="controls_ifelse" />
                    <Block type="logic_compare" />
                    <Block type="logic_operation" />
                    <Block type="controls_repeat_ext">
                        <Value name="TIMES">
                            <Shadow type="math_number">
                                <Field name="NUM">10</Field>
                            </Shadow>
                        </Value>
                    </Block>
                    <Block type="logic_operation" />
                    <Block type="logic_negate" />
                    <Block type="logic_boolean" />
                    <Block type="logic_null" disabled="true" />
                    <Block type="logic_ternary" />
                    <Block type="text_charAt">
                        <Value name="VALUE">
                            <Block type="variables_get">
                                <Field name="VAR">text</Field>
                            </Block>
                        </Value>
                    </Block>
                </BlocklyComponent>

        </header>
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
    return {components: state.allComponents};
};

export default connect(mapStateToProps)(App);
