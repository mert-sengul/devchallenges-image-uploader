import React from "react";
import ReactDOM from "react-dom";

import { UploadComponent, DragAndDropBody } from "./dragAndDropComponent.js";
import ProgressBar from "./progressBar.js";
import { LinkArea } from "./LinkArea.js";
import {
    LargeRectangle,
    Hero,
    Info,
    OrText,
    ChooseButton,
    CheckMark,
    Image,
    Footer,
} from "./sharedComponents";

import "./index.css";


function InitialSection(props) {
    return (
        <>
            <LargeRectangle>
                <Hero text="Upload your image" />
                <Info text="File should be Jpeg, Png,..." />
                <UploadComponent
                    onSubmit={props.onSubmit}
                    onUploadConfirmed={props.onUploadConfirmed}
                >
                    <DragAndDropBody isSubmitter />
                    <OrText text="Or" />
                    <ChooseButton isLabel />
                </UploadComponent>
            </LargeRectangle>
        </>
    );
}

function ProgressSection(props) {
    return (
        <LargeRectangle>
            <Hero textClass={"align-left"} text={"Uploading..."} />
            <ProgressBar />
        </LargeRectangle>
    );
}

function FinalSection(props) {
    return (
        <LargeRectangle>
            <CheckMark />
            <Hero text={"Uploaded Successfully!"} />
            <Image imageURL={props.link} />
            <LinkArea
                link={props.link}
            />
        </LargeRectangle>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            uploaded: false,
            link: null,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onUploadConfirmed = this.onUploadConfirmed.bind(this);
    }

    onSubmit(e) {
        this.setState({ submitted: true });
    }

    onUploadConfirmed(link) {
        console.log(link);
        this.setState({ uploaded: true, link: link });
    }

    render() {
        const currentSection = !this.state.submitted ? (
            <InitialSection onSubmit={this.onSubmit} onUploadConfirmed={this.onUploadConfirmed} />
        ) : !this.state.uploaded ? (
            <ProgressSection />
        ) : (
            <FinalSection link={this.state.link} />
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
