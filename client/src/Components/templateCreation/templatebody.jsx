import React from "react";
import "./style.css";

const TemplateBody = () => {
  return (
    <section className="template-builderBody">
      <div className="template-header">
        <label>header</label>
        <textarea />
      </div>

      <div className="template-body">
        <label>body RAW</label>
        <textarea />
      </div>
    </section>
  );
};

export default TemplateBody;
