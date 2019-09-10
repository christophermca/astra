import Sortable from 'sortablejs'

export default class QueryBuilder {
  constructor(element) {
    this.container = element;

    // Initial values of first SELECT in the row
    this.fields = [
    'label',
    'key',
    'value'
    ];
    
    // AND/OR buttons in header (immutable)
    this.conjunctions = Object.freeze({
      AND: 'AND',
      OR: 'OR',
      properties: {
        selected: 'AND'
      }
    })
    
    // Available operators (immutable)
    this.operators = Object.freeze({
      EQ: '==',
      NOT: '!==',
      GT: '>',
      LT: '<'
    });
    
    // Template pieces for use in DOMParser functionality
    this.templates = {
      outerWrap: '<div class="query-builder"></div>',
      header: '<div class="header"></div>',
      buttonGroup: '<div class="btn-group"></div>',
      button: '<button type="button" class="btn"></button>',
      rulesContainer: '<div class="rules"></div>',
      rulesGroup: '<div class="rules-group"></div>',
      rule: '<div class="rule"></div>',
      handle: '<div class="drag-handle" draggable></div>',
      select: '<select class="input"></select>',
      textfield: '<input class="input" type="text" placeholder="Enter text" />',
      output: '<code></code>',

      // SVG icons
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
    // Ensure single initialization
    if (this.initialized === true) return;
    this.initialized = true;
    
    // Main .query-builder wrapper
    let outerWrapper = this.makeElement(this.templates.outerWrap);
    this.container.appendChild(outerWrapper);
    
    // Header for button groups
    let headerContainer = this.makeElement(this.templates.header);
    outerWrapper.appendChild(headerContainer);
    
    // AND / OR buttons group
    let conjunctionsGroup = this.makeElement(this.templates.buttonGroup);
    headerContainer.appendChild(conjunctionsGroup);
    
    // Build each button for conjunctions group
    let selectedConjunction = this.conjunctions.properties.selected;
    Object.entries(this.conjunctions).forEach(([key, value]) => {
      if (key !== 'properties') {
        let _conj = this.makeElement(this.templates.button);
        _conj.classList.add('btn-' + key + '-conjunction');
        _conj.addEventListener('click', () => {
          conjunctionsGroup.querySelector('.btn-primary').classList.remove('btn-primary');
          _conj.classList.add('btn-primary');
          this.conjunctions.properties.selected = value;
          this.generateQuery();
        })
        _conj.appendChild(this.makeElement(`<span>${value}</span>`));
        
        // Set default selection button state
        if (selectedConjunction === value) _conj.classList.add('btn-primary');
        conjunctionsGroup.appendChild(_conj);
      }
    });
    
    // Add Rule / Add Group buttons group
    let addButtonsGroup = this.makeElement(this.templates.buttonGroup);
    addButtonsGroup.classList.add('group-end');
    headerContainer.appendChild(addButtonsGroup);
    
    // Add Rule button creation
    let addRuleButton = this.makeElement(this.templates.button);
    addRuleButton.classList.add('btn-addRule');
    addRuleButton.appendChild(this.makeElement(this.templates.icons.plus));
    addRuleButton.appendChild(this.makeElement('<span>Add Rule</span>'));
    addButtonsGroup.appendChild(addRuleButton);
    
    // Add Group button creation
    let addGroupButton = this.makeElement(this.templates.button);
    addGroupButton.classList.add('btn-addGroup');
    addGroupButton.appendChild(this.makeElement(this.templates.icons.plusCircle));
    addGroupButton.appendChild(this.makeElement('<span>Add Group</span>'));
    addButtonsGroup.appendChild(addGroupButton);
    
    // Outer wrapper for rules
    this.rulesContainer = this.makeElement(this.templates.rulesContainer);
    
    // Invoke sortablejs library for drag/drop
    let _this = this;
    this.sortable = new Sortable(this.rulesContainer, {
      handle: ".drag-handle",
      draggable: ".rule",
      direction: "vertical",
      onUpdate: () => _this.generateQuery()
    });
    outerWrapper.appendChild(this.rulesContainer);
    
    // Add output container
    this.outputContainer = this.makeElement(this.templates.output);
    this.outputContainer.innerText = "Output";
    this.outputContainer.classList.add('output');
    outerWrapper.appendChild(this.outputContainer);
    
    // Construct first rule group
    let _defaultGroup = this.makeElement(this.templates.rulesGroup);
    this.rulesContainer.appendChild(_defaultGroup);

    // Now that we have our first group, we can assign our Add Rule button handler
    addRuleButton.addEventListener('click', () => { this.addRule(_defaultGroup); });

    // Construct first rule
    this.addRule(_defaultGroup);
  }
  
  // For constructing new elements from HTML strings
  makeElement(domstring) {
    const html = new DOMParser().parseFromString(domstring, 'text/html');
    
    // Extract newly created element
    return html.body.firstChild;
  }
  
  // Rule creation
  addRule(group) {
    // Rule wrapper
    let e = this.makeElement(this.templates.rule);
    
    // Drag handle
    let _handle = this.makeElement(this.templates.handle);
    _handle.classList.add('drag-handle');
    _handle.appendChild(this.makeElement(this.templates.icons.sort));
    e.appendChild(_handle);
    
    // 'Fields' SELECT (first dropdown)
    let _fields = this.makeElement(this.templates.select);
    _fields.classList.add('assertion-field');
    // Populate OPTION list from fields array
    Object.entries(this.fields).forEach(([key, value]) => {
      let _o = this.makeElement(`<option value="${value}">${value}</option>`);
      _fields.appendChild(_o);
    });
    _fields.addEventListener('change', () => this.generateQuery());
    e.appendChild(_fields);
    
    // 'Operators' SELECT (second dropdown)
    let _ops = this.makeElement(this.templates.select);
    _ops.classList.add('assertion-operator');
    // Populate OPTION list from operators object
    Object.entries(this.operators).forEach(([key, value]) => {
      let _o = this.makeElement(`<option value="${key}">${value}</option>`);
      _ops.appendChild(_o);
    });
    _ops.addEventListener('change', () => this.generateQuery());
    e.appendChild(_ops);
    
    // 'Value' textfield
    let _val = this.makeElement(this.templates.textfield);
    _val.classList.add('assertion-value', 'flex-grow');
    _val.addEventListener('input', () => this.generateQuery());
    e.appendChild(_val);
    
    // Delete button
    let deleteRuleButton = this.makeElement(this.templates.button);
    deleteRuleButton.classList.add('icon-btn', 'btn-deleteRule');
    deleteRuleButton.appendChild(this.makeElement(this.templates.icons.trash));
    deleteRuleButton.addEventListener('click', () => { e.remove(); this.generateQuery(); });
    e.appendChild(deleteRuleButton);
    
    group.appendChild(e);
    
    // Generate query output
    this.generateQuery();
  }
  
  // Query output
  generateQuery() {
    // Clear existing output
    let _output = '';
    this.outputContainer.innerText = _output;

    // Iterate through rules
    this.rules = this.rulesContainer.querySelectorAll('.rule');
    this.rules.forEach((rule, index) => {
      // Add conjunction between rules
      if (index > 0) _output += ` ${this.conjunctions.properties.selected} `;
      
      let _field = rule.querySelector('.assertion-field');
      let _fieldValue = _field[_field.selectedIndex].value;
      let _op = rule.querySelector('.assertion-operator');
      let _opValue = _op[_op.selectedIndex].value;
      let _val = rule.querySelector('.assertion-value').value;
      _output += `(${_fieldValue} ${_opValue} '${_val}')`;    // Final output
    });
    this.outputContainer.innerText = _output;
  }
}