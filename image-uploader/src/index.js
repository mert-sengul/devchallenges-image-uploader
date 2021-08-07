import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function LargeRectangle(props) {
    return <div className="rectangle large-rectangle">{props.children}</div>;
}
// sd
function Hero(props) {
    return (
        <div className="upload">
            <h1>{props.text}</h1>
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
        <input type="button" className="button choose-button" id="get_file" value="Choose a file" />
    );
}

class MainPage extends React.Component {
    render() {
        return (
            <LargeRectangle>
                <Hero text="Upload your image" />
                <Info text="File should be Jpeg, Png,..." />
                <Dropzone />
                <OrText text="Or" />
                <ChooseButton />
            </LargeRectangle>
        );
    }
}

ReactDOM.render(<MainPage />, document.getElementById("root"));
