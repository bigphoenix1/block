import Rete from "rete";
import componentsJson from "../../Json/componets.json";
export let nodeType = new Set();
Object.keys(componentsJson).forEach((nodeName) => {
  componentsJson[nodeName].hasOwnProperty("input") &&
    nodeType.add(componentsJson[nodeName].input.Type);
  if (componentsJson[nodeName].hasOwnProperty("output")) {
    for (let idx in componentsJson[nodeName].output) {
      nodeType.add(componentsJson[nodeName].output[idx].Type);
    }
  }
});
export let socketType = {};
for (let item of nodeType) {
  socketType[item] = new Rete.Socket(item);
}
