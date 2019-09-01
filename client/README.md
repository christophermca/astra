[React's generated ReadMe](./reacts_README.md)


# The ASTRA Component Library

### Running The App
`npm start`

### Folder Structure
 ```
 src/
  App.js
  components/
    index.js
    <component1>.js
    <component2>.js
  ...
```

### Creating a new component

1. Create a component file inside of src/components/

```
// FILE src/components/MyComponent.js

import React from 'react';

export default class MyComponent extends React.Component {
 ...
}

```
2. add component as part of the exported bundle

```
// FILE src/components/index.js

import MyComponent From './MyComponent.js'

export {MyComponent}
```
3. Display Component on in the Browser

```
// FILE src/App.js

import {MyComponent} from './Components'


render () {
  <section class="component">
    <MyComponent />
  </section>
}

```
