import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

function Dropzone(props) {
    return (
        <div className="rectangle dropzone-rectangle">
            <Vector src="mountains.svg" />
            <DropzoneText text="Drag & Drop your image here" />
        </div>
    );
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
                created by <strong>memert</strong> - devChallenges.io
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

function LinkArea(props) {
    return (
        <div className="rectangle link-area">
            <input type="text" readOnly={true} value={props.link} />
            <CopyButton
                onClick={(e) => {
                    console.log(e);
                }}
            />
        </div>
    );
}

class InitialSection extends React.Component {
    render() {
        return (
            <>
                <LargeRectangle>
                    <Hero text="Upload your image" />
                    <Info text="File should be Jpeg, Png,..." />
                    <Dropzone />
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
                <Image imageURL="./uploaded.jpg" />
                <LinkArea link={"https://images.yourdomain.com/photo-1496950866446-3254546465834354534354"} />
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
        };
        this.submit = this.submit.bind(this);
        this.uploadConfirmed = this.uploadConfirmed.bind(this);
    }

    submit(e) {
        console.log("submit");
        console.log(e);
        this.setState({ submitted: true });
        setTimeout(() => {
            this.uploadConfirmed();
        }, 500);
    }

    uploadConfirmed() {
        console.log("uploaded");
        this.setState({ uploaded: true });
    }

    render() {
        const currentSection = !this.state.submitted ? (
            <InitialSection onClick={this.submit} />
        ) : !this.state.uploaded ? (
            <ProgressSection />
        ) : (
            <FinalSection />
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
