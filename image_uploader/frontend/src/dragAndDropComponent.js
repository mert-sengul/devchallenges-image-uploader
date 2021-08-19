import React from "react";
import { FileForm } from "./fileForm.js";
import uploadImage from "./apiClient.js";

export function DragAndDropBody(props) {
    const preventDefaults = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const handleDrop = (e) => {
        preventDefaults(e);
        const file_list = e.dataTransfer.files;
        props.submitFiles(file_list);
    };
    return (
        <div
            className="rectangle dropzone-rectangle"
            onDrop={(e) => handleDrop(e)}
            onDragEnter={(e) => preventDefaults(e)}
            onDragOver={(e) => preventDefaults(e)}
        >
            <Vector src="mountains.svg" />
            <DragAndDropText text="Drag & Drop your image here" />
        </div>
    );
}

function Submitter(props) {
    // wrapper for components with `isSubmitter` or `isLabel` props
    const child = props.child;
    const childProps = { ...child.props, submitFiles: props?.submitFiles, htmlFor: props?.htmlFor };
    return new child.type((props = childProps));
}

export class UploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.fileInputId = "file_input_id";
        this.fileInput = React.createRef();
        this.submitFiles = this.submitFiles.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    submitFiles(file_list) {
        this.fileInput.current.files = file_list;
        const event = new Event("change", { bubbles: true });
        this.fileInput.current.dispatchEvent(event);
    }

    onInputChange(e) {
        const current_form = this.fileInput.current.parentElement;
        this.props.onSubmit();
        uploadImage(current_form).then((resp) => {
            this.props.onUploadConfirmed(resp.data.file);
        });
    }

    render() {
        return (
            <>
                <FileForm
                    onChange={this.onInputChange}
                    fileInputId={this.fileInputId}
                    ref={this.fileInput}
                />
                {this.props.children.map((child, index) => {
                    if (child.props?.isSubmitter) {
                        return (
                            <Submitter key={index} child={child} submitFiles={this.submitFiles} />
                        );
                    }
                    if (child.props?.isLabel) {
                        return <Submitter key={index} child={child} htmlFor={this.fileInputId} />;
                    }
                    return <Submitter key={index} child={child} />;
                })}
            </>
        );
    }
}

function Vector(props) {
    return (
        <div className="vector">
            <img src={props.src} alt={props.alt} />
        </div>
    );
}

function DragAndDropText(props) {
    return (
        <div className="dropzone-text">
            <h2>{props.text}</h2>
        </div>
    );
}
