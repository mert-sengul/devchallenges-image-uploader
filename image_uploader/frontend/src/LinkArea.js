import React from "react";
import { CopyButton, DummyInput } from "./sharedComponents.js";

export class LinkArea extends React.Component {
    constructor(props) {
        super(props);
        this.textValue = React.createRef();
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    componentDidMount() {
        // Scroll back to the start of the text
        this.textValue.current.selectionEnd = 0;
    }

    copyToClipboard() {
        this.textValue.current.select(); // focus to text to inform user that the content copied
        navigator.clipboard.writeText(this.textValue.current.value);
    }

    render() {
        return (
            <div className="rectangle link-area">
                <DummyInput
                    value={this.props.link}
                    ref={this.textValue}
                    onDoubleClick={(e) => this.copyToClipboard()}
                />
                <CopyButton
                    onClick={(e) => {
                        this.copyToClipboard();
                        // navigator.clipboard.writeText(this.props.link);
                    }}
                />
            </div>
        );
    }
}
