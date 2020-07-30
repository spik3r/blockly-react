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
 * @fileoverview Blockly React Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import './BlocklyComponent.css';

import Blockly from 'blockly/core';
import BlocklyJS from 'blockly/javascript';
import locale from 'blockly/msg/en';
import 'blockly/blocks';
import {connect} from "react-redux";
import {newBlock, updateBlockText} from "../reducer";

Blockly.setLocale(locale);
export const idAndLabelKeys = {
    ID: 'id',
    LABEL: 'label',
};

class BlocklyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.blocklyDiv = React.createRef();
        this.toolbox = React.createRef();
    }

    componentDidMount() {
        const { initialXml, children, ...rest } = this.props;
        this.primaryWorkspace = Blockly.inject(
            this.blocklyDiv.current,
            {
                toolbox: this.toolbox.current,
                ...rest
            },
        );

        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.primaryWorkspace);
        }
        this.primaryWorkspace.addChangeListener(this.onWorkspaceChange);
    }

    onWorkspaceChange = (event) => {
        if (event instanceof Blockly.Events.Create) {
            //do something
        } else if (!(event instanceof Blockly.Events.Ui)) {
            console.log("%cNon UI event!",
                "color:red;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold"
            );
            console.log(`%c${JSON.stringify(event)}`,
                "color:orange;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold"
            );

            if (event.name === 'MY_CUSTOM_BLOCK') {
                    console.log('new block' + JSON.stringify(event.blockId));
                    newBlock(event.blockId, event.blockId);
                console.log('updateBlockText', event.newValue);
                //The line below prints the xml to the screen for us to more easily have a layout at the start
                console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.primaryWorkspace)));

                this.props.updateBlockText(event.newValue, event.blockId)

            }
        }
    };

    get workspace() {
        return this.primaryWorkspace;
    }

    render() {
        const { children } = this.props;

        return <React.Fragment>
            <div ref={this.blocklyDiv} id="blocklyDiv" />
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
                {children}
            </xml>
        </React.Fragment>;
    }
}

const mapDispatchToProps = {
    updateBlockText,
};

export default connect(null, mapDispatchToProps)(BlocklyComponent);
