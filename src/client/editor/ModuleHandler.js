import React from "react";
import { connect } from "react-redux";

class ModuleHandler extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={() => this.doAction(this.props.text)}>save file</button>
    );
  }

  handleSaveToPC(jsonString) {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.json";
    link.href = url;
    link.click();
  }

  doAction(text) {
    console.log("doAction", text);
    this.handleSaveToPC(JSON.parse(text));
  }
}

const mapStateToProps = (state) => {
  console.log("ModuleHandler triggered");
  // console.log(state.text.text);

  return { text: state.text.text };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleHandler);
