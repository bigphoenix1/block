import Rete from "rete";
import { socketType } from "./Sockets";
import { MyNode } from "./Node";
import { ModuleControl, ComponentControl } from "./Control";
import SocketJson from "../../Json/Sockets.json";
// import test from "./componets.json";
export class createComponent extends Rete.Component {
  constructor(test) {
    super(test.name);
    this.test = test;
    this.data.component = MyNode;
  }
  builder(node) {
    console.log(socketType);
    // let inp = "",
    // out = "";
    if (
      this.test.name === "InputComponent" ||
      this.test.name === "OutputComponent"
    ) {
      for (let i = 0; i < SocketJson.length; i++) {
        let obj = SocketJson[i];

        // let socket;
        // if (obj.type === "MILBufferData") socket = milBufferData;
        // else if (obj.type === "ROIBlobData") socket = roiBlobData;
        // else if (obj.type === "ImagePatchData") socket = imagePatchData;
        // socket = new Rete.Socket(obj.type);
        // console.log(
        //   typeof socket,
        //   socket === milBufferData,
        //   milBufferData === new Rete.Socket(obj.type),
        //   socket === new Rete.Socket(obj.type),
        //   new Rete.Socket("MILBufferData"),
        //   typeof new Rete.Socket(obj.type),
        //   typeof obj.type,
        //   obj.type
        // );
        if (this.test.name === "InputComponent") {
          node.addOutput(
            new Rete.Output(obj.name, obj.type, socketType[obj.type])
          );
        } else if (this.test.name === "OutputComponent") {
          node.addInput(
            new Rete.Input(obj.name, obj.type, socketType[obj.type])
          );
        }
      }
      console.log(node);
      return node;
    } else {
      // inp = new Rete.Input(
      //   this.test.input.Name,
      //   this.test.input.Type,
      //   this.test.input.Type === "ROIBlobData"
      //     ? roiBlobData
      //     : this.test.input.Type === "MILBufferData"
      //     ? milBufferData
      //     : this.test.input.Type === "ImagePatchData"
      //     ? imagePatchData
      //     : ""
      // );
      node.addInput(
        new Rete.Input(
          this.test.input.Name,
          this.test.input.Type,
          socketType[this.test.input.Type]
          // this.test.input.Type === "ROIBlobData"
          //   ? roiBlobData
          //   : this.test.input.Type === "MILBufferData"
          //   ? milBufferData
          //   : this.test.input.Type === "ImagePatchData"
          //   ? imagePatchData
          //   : ""
        )
      );
      console.log(this.test.output);
      for (let idx in this.test.output) {
        // out = new Rete.Output(
        //   this.test.output[idx].Name,
        //   this.test.output[idx].Type,
        //   this.test.output[idx].Type === "ROIBlobData"
        //     ? roiBlobData
        //     : this.test.output[idx].Type === "MILBufferData"
        //     ? milBufferData
        //     : this.test.output[idx].Type === "ImagePatchData"
        //     ? imagePatchData
        //     : ""
        // );
        node.addOutput(
          new Rete.Output(
            this.test.output[idx].Name,
            this.test.output[idx].Type,
            socketType[this.test.output[idx].Type]
            // this.test.output[idx].Type === "ROIBlobData"
            //   ? roiBlobData
            //   : this.test.output[idx].Type === "MILBufferData"
            //   ? milBufferData
            //   : this.test.output[idx].Type === "ImagePatchData"
            //   ? imagePatchData
            //   : ""
          )
        );
      }
    }
    if (this.test.hasOwnProperty("control")) {
      const loopCount = new ModuleControl(
        this.editor,
        this.test.control.Type,
        node
      );
      node.addControl(loopCount);
      return node;
      // return node.addInput(inp).addOutput(out).addControl(loopCount);
    } else if (this.test.hasOwnProperty("commonProps")) {
      return this.CommonProps(node);
    }

    // console.log(node.module.loop_count);
    // this.module = node.module;
  }
  CommonProps(node) {
    const alg = new ComponentControl(
      this.editor,
      this.test.commonProps.alg.Type,
      node,
      true
    );
    const executer = new ComponentControl(
      this.editor,
      this.test.commonProps.executer.Type,
      node
    );
    const execType = new ComponentControl(
      this.editor,
      this.test.commonProps.execType.Type,
      node
    );
    const debugInfo = new ComponentControl(
      this.editor,
      this.test.commonProps.debugInfo.Type,
      node
    );
    const debugInfoKey = new ComponentControl(
      this.editor,
      this.test.commonProps.debugInfoKey.Type,
      node
    );

    return node
      .addControl(alg)
      .addControl(executer)
      .addControl(execType)
      .addControl(debugInfo)
      .addControl(debugInfoKey);
  }

  worker(node, inputs, outputs) {
    console.log(node.data.greeting);
    console.log(node.module.loop_count);
  }
}
