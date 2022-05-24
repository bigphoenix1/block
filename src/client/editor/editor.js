import React, { useState, useEffect } from "react";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { connect } from "react-redux";

import { createComponent } from "./CreateComponent.js";
import ModuleHandler from "./ModuleHandler";
import componentsJson from "../../Json/componets.json";

import demoJson from "../../Json/TalosSequence.json";

async function createEditor(container) {
  const editor = new Rete.NodeEditor("demo@0.1.0", container);
  console.log(componentsJson);
  const components = [];
  Object.keys(componentsJson).forEach((nodeName) => {
    components.push(new createComponent(componentsJson[nodeName]));
  });

  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);
  editor.use(ContextMenuPlugin);

  const engine = new Rete.Engine("demo@0.1.0");

  components.map((c) => {
    editor.register(c);
    engine.register(c);
  });

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      await engine.abort();
    }
  );

  editor.on("rendernode", ({ el, node }) => {
    el.addEventListener("dblclick", (e) => {
      console.log(node);
      e.stopPropagation();
      if (node.name === "ROIProcessing" || node.name === "Segmentation") {
        const data = require("../../Json/" + node.name + ".json");
        console.log(data);
        editor.fromJSON(data).then(() => {
          AreaPlugin.zoomAt(editor);
        });
      }
    });
  });

  editor.fromJSON(demoJson);

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.node);

  return editor;
}

export function useRete() {
  const [container, setContainer] = useState(null);
  const [nodeEditor, setNodeEditor] = useState(null);

  useEffect(() => {
    console.log(container);
    if (container) {
      createEditor(container).then((value) => {
        console.log("created", value);
        setNodeEditor(value);
      });
    }
  }, [container]);

  return [nodeEditor, setContainer];
}

function EditorContainerFunc() {
  const [nodeEditor, setContainer] = useRete();
  async function openModule(data) {
    await nodeEditor.fromJSON(data);
  }

  function clearCanvas() {
    openModule(
      {
        id: "demo@0.1.0",
        nodes: {},
      },
      nodeEditor
    ).then(() => {
      AreaPlugin.zoomAt(nodeEditor);
    });
    return;
  }
  function onFileChange(event) {
    console.log("onFileChange", event);
    const reader = new FileReader();
    reader.onload = openModuleFromFile;
    reader.readAsText(event.target.files[0]);
  }
  function openModuleFromFile(evt) {
    console.log("openModuleFromFile", evt);
    openModule(JSON.parse(evt.target.result)).then(() => {
      AreaPlugin.zoomAt(nodeEditor);
    });
  }
  const handleClick = () => {
    fetch("http://localhost:3004/accessLocalFile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="editor" style={{ width: "100vw", height: "100vh" }}>
      <div className="button-panel">
        <button onClick={handleClick}>sever test</button>
        <button className="button" onClick={clearCanvas}>
          Clear Canvas
        </button>
        <input type="file" onChange={(event) => onFileChange(event)} />
        <ModuleHandler />
      </div>

      <div id="node-editor" ref={(elem) => setContainer(elem)} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  const setText = (text = "") => ({
    type: "SET_TEXT",
    text,
  });
  return {
    sendtheAlert: (text) => {
      dispatch(setText(JSON.stringify(text)));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainerFunc);
