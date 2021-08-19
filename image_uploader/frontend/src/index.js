import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// Component imports
import { UploadComponent, DragAndDropBody } from "./dragAndDropComponent.js";
import ProgressBar from "./progressBar";
import {
    LargeRectangle,
    Hero,
    Info,
    CheckMark,
    Image,
    OrText,
    ChooseButton,
    Footer,
} from "./sharedComponents.js";
import { LinkArea } from "./LinkArea";

class InitialSection extends React.Component {
    render() {
        return (
            <>
                <LargeRectangle>
                    <Hero text="Upload your image" />
                    <Info text="File should be Jpeg, Png,..." />
                    <UploadComponent
                        onSubmit={this.props.onSubmit}
                        onUploadConfirmed={this.props.onUploadConfirmed}
                    >
                        <DragAndDropBody isSubmitter={true} />
                        <OrText text="Or" />
                        <ChooseButton isLabel={true} />
                    </UploadComponent>
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
                <LinkArea link={this.props.imageLink} />
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
