import React from "react";

export function LargeRectangle(props) {
    return <div className="rectangle large-rectangle">{props.children}</div>;
}

export function Hero(props) {
    return (
        <div className="upload">
            <h1 className={props.textClass}>{props.text}</h1>
        </div>
    );
}

export function Info(props) {
    return (
        <div className="info-section">
            <h3>{props.text}</h3>
        </div>
    );
}

export function CheckMark(props) {
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

export function Image(props) {
    return (
        <img className="rectangle image-rectangle" src={props.imageURL} alt="Uploaded content" />
    );
}

export function OrText(props) {
    return (
        <div className="or-text">
            <h2>{props.text}</h2>
        </div>
    );
}

export function ChooseButton(props) {
    return (
        <label type="button" className="button choose-button" id="get_file" htmlFor={props.htmlFor}>
            {"Choose a file"}
        </label>
    );
}

export function CopyButton(props) {
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

export const DummyInput = React.forwardRef((props, ref) => (
    <input
        type="text"
        readOnly={true}
        value={props.value}
        ref={ref}
        onDoubleClick={props.onDoubleClick}
    />
));

export function Footer(props) {
    return (
        <footer>
            <p>
                created by <strong>mert-sengul</strong> - devChallenges.io
            </p>
        </footer>
    );
}
