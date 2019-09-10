import Sortable from 'sortablejs'

export default class QueryBuilder {
    constructor(element) {
      this.container = element;
      
      this.fields = [
        'label',
        'key',
        'value'
      ];
      
      this.operators = Object.freeze({
        EQ: '==',
        NOT: '!==',
        GT: '>',
        LT: '<'
      });
      
      this.templates = {
        container: '<div class="rules"></div>',
        buttonGroup: '<div class="btn-group"></div>',
        button: '<button type="button" class="btn"></button>',
        rule: '<div class="rule"></div>',
        handle: '<div class="drag-handle" draggable></div>',
        select: '<select class="input"></select>',
        textfield: '<input class="input" type="text" placeholder="Enter text" />',
        output: '<code></code>',
        icons: {
          plus: `
            <i aria-label="icon: plus">
              <svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            </i>`,
          plusCircle: `
            <i aria-label="icon: plus-circle-o">
              <svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
              </svg>
            </i>`,
          trash: `
            <i aria-label="icon: delete">
              <svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
              </svg>
            </i>`,
          sort: `
            <i aria-label="icon: bars">
              <svg viewBox="0 0 1024 1024" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path>
              </svg>
            </i>`
        }
      };
      
      this.init();
    }
    
    init() {
      if (this.initialized === true) return;
      this.initialized = true;
      
      let btnGroup = this.makeElement(this.templates.buttonGroup);
      this.container.appendChild(btnGroup);
      
      let addRuleButton = this.makeElement(this.templates.button);
      addRuleButton.classList.add('btn-addRule');
      addRuleButton.appendChild(this.makeElement(this.templates.icons.plus));
      addRuleButton.appendChild(this.makeElement('<span>Add Rule</span>'));
      addRuleButton.addEventListener('click', () => {
        this.addRule();
      });
      btnGroup.appendChild(addRuleButton);
      
      let addGroupButton = this.makeElement(this.templates.button);
      addGroupButton.classList.add('btn-addGroup');
      addGroupButton.appendChild(this.makeElement(this.templates.icons.plusCircle));
      addGroupButton.appendChild(this.makeElement('<span>Add Group</span>'));
      btnGroup.appendChild(addGroupButton);
      
      this.rulesContainer = this.makeElement(this.templates.container);
      
      let _this = this;
      this.sortable = new Sortable(this.rulesContainer, {
        handle: ".drag-handle",
        draggable: ".rule",
        direction: "vertical",
        onUpdate: () => _this.generateQuery()
      });
      this.container.appendChild(this.rulesContainer);
      
      this.outputContainer = this.makeElement(this.templates.output);
      this.outputContainer.innerText = "Output";
      this.outputContainer.classList.add('output');
      this.container.appendChild(this.outputContainer);
      
      this.addRule();
    }
    
    makeElement(domstring) {
      const html = new DOMParser().parseFromString(domstring, 'text/html');
      return html.body.firstChild;
    }
    
    addRule() {
      let e = this.makeElement(this.templates.rule);
      
      let _handle = this.makeElement(this.templates.handle);
      _handle.classList.add('drag-handle');
      _handle.appendChild(this.makeElement(this.templates.icons.sort));
      e.appendChild(_handle);
      
      let _fields = this.makeElement(this.templates.select);
      _fields.classList.add('assertion-field');
      Object.entries(this.fields).forEach(([key, value]) => {
        let _o = this.makeElement(`<option value="${value}">${value}</option>`);
        _fields.appendChild(_o);
      });
      _fields.addEventListener('change', () => this.generateQuery());
      e.appendChild(_fields);
      
      let _ops = this.makeElement(this.templates.select);
      _ops.classList.add('assertion-operator');
      Object.entries(this.operators).forEach(([key, value]) => {
        let _o = this.makeElement(`<option value="${key}">${value}</option>`);
        _ops.appendChild(_o);
      });
      _ops.addEventListener('change', () => this.generateQuery());
      e.appendChild(_ops);
      
      let _val = this.makeElement(this.templates.textfield);
      _val.classList.add('assertion-value');
      _val.addEventListener('input', () => this.generateQuery());
      e.appendChild(_val);
      
      let deleteRuleButton = this.makeElement(this.templates.button);
      deleteRuleButton.classList.add('icon-btn', 'btn-deleteRule');
      deleteRuleButton.appendChild(this.makeElement(this.templates.icons.trash));
      deleteRuleButton.addEventListener('click', () => { e.remove(); this.generateQuery(); });
      e.appendChild(deleteRuleButton);
      
      this.rulesContainer.appendChild(e);
          
      this.generateQuery();
    }
    
    generateQuery() {
      let _output = '';
      this.rules = this.rulesContainer.querySelectorAll('.rule');
      this.outputContainer.innerText = _output;
      this.rules.forEach((rule, index) => {
        if (index > 0) _output += ' AND ';
        
        let _field = rule.querySelector('.assertion-field');
        let _fieldValue = _field[_field.selectedIndex].value;
        let _op = rule.querySelector('.assertion-operator');
        let _opValue = _op[_op.selectedIndex].value;
        let _val = rule.querySelector('.assertion-value').value;
        _output += `(${_fieldValue} ${_opValue} '${_val}')`;
      });
      this.outputContainer.innerText = _output;
    }
  }

//   module.exports = QueryBuilder;