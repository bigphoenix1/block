import React from "react";
import { Control } from "rete";

export class ComponentControl extends Control {
  static component = ({ label, value, onChange }) => (
    <div className="control">
      <div className="control-label">{label}</div>
      <input
        value={value}
        ref={(ref) => {
          ref &&
            ref.addEventListener("pointerdown", (e) => e.stopPropagation());
        }}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  constructor(emitter, key, node, isArray = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.isArray = isArray;
    this.component = ComponentControl.component;
    this.component.key = key;

    const initial = node.data[key] || 0;
    node.data[key] = initial;

    this.props = {
      label: this.key,
      value: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      },
    };
  }

  setValue(val) {
    var value = this.isArray ? (value = val.split(",")) : val;
    this.props.value = value;
    this.putData(this.key, value);
    this.update();
  }
}

export class ModuleControl extends Control {
  static component = ({ label, value, onChange }) => (
    <div className="control">
      <div className="control-label">{label}</div>
      <input
        value={value}
        ref={(ref) => {
          ref &&
            ref.addEventListener("pointerdown", (e) => e.stopPropagation());
        }}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  constructor(emitter, key, node, isArray = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.isArray = isArray;
    this.component = ModuleControl.component;
    this.component.key = key;

    const initial = node.module[key] || 0;
    node.module[key] = initial;

    this.props = {
      label: this.key,
      value: initial,
      onChange: (v) => {
        this.setValue(v);
        this.emitter.trigger("process");
      },
    };
  }

  setValue(val) {
    var value = this.isArray ? (value = val.split(",")) : val;
    this.props.value = value;
    this.getNode().module[this.key] = value;
    this.update();
  }
}
