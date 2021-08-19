import React from "react";

export default class ProgressBar extends React.Component {
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
