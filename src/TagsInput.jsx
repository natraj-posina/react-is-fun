import React from "react";
import data from "./colors.json";
import "./index.css";

const HIDE = "hide";
const SHOW = "show";
export default class TagsInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            value: "",
            tags: ["red", "blue", "green"],
            loading: false,
            data: data.map(d => {
                return d.name + "";
            }),
            masterData: data,
            display: HIDE,
            suggestions: []
        };
    }

    componentDidMount() {
        let val = this.state.value;
        this.setFocus();
        if (val !== "") {
            this.search(val);
            this.setState({
                display: val === "" ? HIDE : SHOW
            });
        }
    }

    createSuggestions() {
        let dd = this.state.suggestions;
        return (
            <div className={"suggestionbox"}>
                {dd.map((color, id) => (
                    <li
                        className={"suggestion"}
                        onClick={e => this.addTag(e, color)}
                        key={id}
                    >
                        {color}
                    </li>
                ))}
            </div>
        );
    }

    search(val) {
        const { data } = this.state;
        if (val === "") return;
        let find = data.filter(color => color.toLowerCase().indexOf(val) === 0);
        // find.slice(0, SEARCH_LIMIT);
        this.setState({
            suggestions: find,
            display: find.length === 0 ? HIDE : SHOW
        });
    }

    handleChange(e) {
        let val = e.target.value;
        this.search(val);
        this.setState({
            value: val,
            display: val === "" ? HIDE : SHOW
        });
    }

    setFocus() {
        this.textInput.current.focus();
    }

    addTag(e, val) {
        e.preventDefault();
        const { tags } = this.state;

        const fil = tags.filter(x => x.toLowerCase() === val.toLowerCase());
        if (fil.length === 1) {
            return;
        }
        // Set the focus in the textfield.
        this.setFocus();
        this.setState({
            tags: tags.concat(val),
            value: "",
            display: HIDE
        });
    }

    submitHandler(e) {
        e.preventDefault();
        const { value, tags } = this.state;
        if (value === "") {
            return;
        }
        const fil = tags.filter(x => x.toLowerCase() === value.toLowerCase());
        if (fil.length === 1) {
            return;
        }
        this.setState({
            tags: tags.concat(value),
            value: "",
            display: HIDE
        });
    }

    removeLabel(e, obj) {
        e.preventDefault();
        const { tags } = this.state;
        let newTags = tags.filter(x => x !== obj);
        // Set the focus in the textfield.
        this.setFocus();
        // render the UI
        this.setState({
            tags: newTags
        });
    }

    render() {
        return (
            <div className={"main"}>
                <h2>ADD colors</h2>
                <div className={"container"}>
                    {this.state.tags.map((ele, i) => (
                        <div
                            key={i}
                            className={"box"}
                            onClick={e => this.removeLabel(e, ele)}
                        >
                            <span className={"close"}> X </span> {ele}
                        </div>
                    ))}

                    <form onSubmit={e => this.submitHandler(e)}>
            <span className={"input"}>
              <input
                  ref={this.textInput}
                  maxLength={60}
                  className={"inputClass"}
                  value={this.state.value}
                  placeholder={"Enter"}
                  onChange={e => this.handleChange(e)}
              />
            </span>
                    </form>
                </div>
                <div className={this.state.display}>
                    {this.state.suggestions.length !== 0 && this.createSuggestions()}
                </div>
            </div>
        );
    }
}
