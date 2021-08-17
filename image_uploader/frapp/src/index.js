import React from "react";
import ReactDOM from "react-dom";
import uploadImage from "./apiClient.js";
import "./index.css";

const apiClientPromise = new Promise((resolve, reject) => { resolve(true) });
console.log(apiClientPromise);

function LargeRectangle(props) {
    return <div className="rectangle large-rectangle">{props.children}</div>;
}

function Hero(props) {
    return (
        <div className="upload">
            <h1 className={props.textClass}>{props.text}</h1>
        </div>
    );
}

function Info(props) {
    return (
        <div className="info-section">
            <h3>{props.text}</h3>
        </div>
    );
}

function DropzoneText(props) {
    return (
        <div className="dropzone-text">
            <h2>{props.text}</h2>
        </div>
    );
}

function OrText(props) {
    return (
        <div className="or-text">
            <h2>{props.text}</h2>
        </div>
    );
}

function Vector(props) {
    return (
        <div className="vector">
            <img src={props.src} alt={props.alt} />
        </div>
    );
}

function CSRFInput(props) {
    // only checks for csrfToken, ensure api is loaded before invokation
    if (window.csrfCookie) {
        return <input type="hidden" name={props.tokenName} value={window.csrfCookie} />;
    } else {
        return null;
    }
}

class Dropzone extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.form = React.createRef();
        this.state = {
            apiLoaded: false,
        };
        this.submitFiles = this.submitFiles.bind(this);
    }
    componentDidMount() {
        apiClientPromise.then(() => {
            this.setState({ apiLoaded: true });
        });
    }

    submitFiles(file_list) {
        this.props.onSubmit();
        this.fileInput.current.files = file_list;
        uploadImage(this.form.current).then(resp => {
            console.log(resp);
            this.props.onUploadConfirmed(resp.data.file);
        })

        // this.form.current.submit();
    }

    render() {
        if (this.state.apiLoaded) {
            // api loaded
            // const createScheme = window.schema.content.images.create;
            return (
                <form
                    action="/api/images/"
                    method="POST"
                    encType="multipart/form-data"
                    noValidate=""
                    ref={this.form}
                >
                    <CSRFInput tokenName="csrfmiddlewaretoken" />
                    <input
                        hidden
                        name="file"
                        type="file"
                        ref={this.fileInput}
                    />
                    <DropzoneBody submitFiles={(fl) => { this.submitFiles(fl) }} />
                </form>
            );
        }
        return null;
    }
}

class DropzoneBody extends React.Component {
    constructor(props) {
        super(props);
    }
    preventDefaults = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    handleDrop = (e) => {
        this.preventDefaults(e);
        const file_list = e.dataTransfer.files;
        this.props.submitFiles(file_list);
    };
    render() {
        return (
            <div
                className="rectangle dropzone-rectangle"
                onDrop={(e) => this.handleDrop(e)}
                onDragEnter={(e) => this.preventDefaults(e)}
                onDragOver={(e) => this.preventDefaults(e)}
            >
                <Vector src="mountains.svg" />
                <DropzoneText text="Drag & Drop your image here" />
            </div>
        );
    }
}

function ChooseButton(props) {
    return (
        <input
            type="button"
            className="button choose-button"
            id="get_file"
            value="Choose a file"
            onClick={(e) => {
                props.onClick(e);
            }}
        />
    );
}

function Footer(props) {
    return (
        <footer>
            <p>
                created by <strong>mert-sengul</strong> - devChallenges.io
            </p>
        </footer>
    );
}

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.initialStyle = {
            transition: "unset",
            right: "100%",
            left: "0%",
        };
        this.progressStyle = {
            transition: "right 1s ease-in-out 0s, left 1s ease-in-out 0.3s",
            right: "0%",
            left: "100%",
        };
        this.state = {
            fillerStyles: { ...this.initialStyle },
        };
        this.progress = this.progress.bind(this);
    }

    progress() {
        this.setState({ fillerStyles: { ...this.initialStyle } });
        setTimeout(() => {
            this.setState({ fillerStyles: { ...this.progressStyle } });
        }, 50);
    }
    componentDidMount() {
        this.progress();
        this.timerID = setInterval(this.progress, 1100);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className="progress-bar">
                <div className="progress-line" style={this.state.fillerStyles}></div>
            </div>
        );
    }
}

function CheckMark(props) {
    return (
        <svg
            id="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
        >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z" />
        </svg>
    );
}

function Image(props) {
    return (
        <img className="rectangle image-rectangle" src={props.imageURL} alt="Uploaded content" />
    );
}

function CopyButton(props) {
    return (
        <input
            type="button"
            className="button copy-button"
            value="Copy Link"
            onClick={(e) => {
                props.onClick(e);
            }}
        />
    );
}

const DummyInput = React.forwardRef((props, ref) => (
    <input
        type="text"
        readOnly={true}
        value={props.value}
        ref={ref}
        onDoubleClick={props.onDoubleClick}
    />
));

class LinkArea extends React.Component {
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

class InitialSection extends React.Component {
    render() {
        return (
            <>
                <LargeRectangle>
                    <Hero text="Upload your image" />
                    <Info text="File should be Jpeg, Png,..." />
                    <Dropzone onSubmit={this.props.onSubmit} onUploadConfirmed={this.props.onUploadConfirmed} />
                    <OrText text="Or" />
                    <ChooseButton
                        onClick={(e) => {
                            this.props.onClick(e);
                        }}
                    />
                </LargeRectangle>
            </>
        );
    }
}

class ProgressSection extends React.Component {
    render() {
        return (
            <LargeRectangle>
                <Hero textClass={"align-left"} text={"Uploading..."} />
                <ProgressBar />
            </LargeRectangle>
        );
    }
}

class FinalSection extends React.Component {
    render() {
        return (
            <LargeRectangle>
                <CheckMark />
                <Hero text={"Uploaded Successfully!"} />
                <Image imageURL={this.props.imageLink} />
                <LinkArea
                    link={this.props.imageLink}
                />
            </LargeRectangle>
        );
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            uploaded: false,
            imageLink: null,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onUploadConfirmed = this.onUploadConfirmed.bind(this);
    }

    onSubmit() {
        this.setState({ submitted: true });
    }

    onUploadConfirmed(imageLink) {
        this.setState({ uploaded: true, imageLink: imageLink });
    }

    render() {
        const currentSection = !this.state.submitted ? (
            <InitialSection onSubmit={this.onSubmit} onUploadConfirmed={this.onUploadConfirmed} />
        ) : !this.state.uploaded ? (
            <ProgressSection />
        ) : (
            <FinalSection imageLink={this.state.imageLink} />
        );

        return (
            <>
                {currentSection}
                <Footer />
            </>
        );
    }
}

ReactDOM.render(<Page />, document.getElementById("root"));
