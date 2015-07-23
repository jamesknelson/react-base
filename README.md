# react-base

Adds the essentials to your ES6 React component with only two lines:

```jsx
// Before `class`
@base("class-prefix")

// In `render()`
<div {...this.base()}>
```

## What is it?

**react-base** is a simple wrapper around three other Higher-Order Components:

- [react-callback-register](https://github.com/jamesknelson/react-callback-register) - merge callbacks from your component and from passed-in props
- [react-c](https://github.com/jamesknelson/react-c) - provides structure to your component's CSS by helping you write semantic class names
- [react-passthrough](https://github.com/jamesknelson/react-passthrough) - passes properties not specified in `propTypes` to a child node

Applying `@base` to your components applies the class decorators from the above modules, and calling `this.base()` returns the merged outputs of **react-callback-register**'s `callbacks`, **react-c**'s `cRoot()` and **react-passthrough**'s `passthrough()`.

## Why use it?

Most React components will at minimum need to pass through a number of properties to their child nodes, as well as apply a few CSS classes. Compared to rolling your own implementation on every component, having these available under a single decorator is a no-brainer.

But this only explains **react-passthrough** and **react-c** - why include **react-callback-register**? If not every class uses it, why should it be part of a module called *base*?

The reason is **react-callback-register** provides a common interface for other decorators to add callbacks which play nicely with each other. For an example of how this is used, see [react-base-control](https://github.com/jamesknelson/react-base-control).

***tldr:** react-base provides basic features which you are going to build anyway, as well as providing a base for other decorators to build on.*

## Usage

### 1. Install with NPM:

```
npm install react-base --save
```

### 2. Import the module:

```javascript
// If using ES6 Modules
import base from 'react-base'

// If stuck with Common JS
var base = require('react-base')
```

### 3. Add react-base to your component:

You have two options to do this. If you're building modules by extending `React.Component`, I recommend using ES7 decorators:

```jsx
@base("app")
class MyComponent extends React.Component {
  ...
}
```

Otherwise, just pass your components to the `base(classPrefix)` manually:

```jsx
var MyComponent = React.createClass({
  ...
})

c("app")(MyComponent)
```

### 4. Add `{...this.base()}` somewhere in `render()`

`this.base` gathers callbacks, classes and passed-through properties from [react-callback-register](https://github.com/jamesknelson/react-callback-register), [react-c](https://github.com/jamesknelson/react-c) and [react-passthrough](https://github.com/jamesknelson/react-passthrough). Using JSX's object spread syntax to pass these to your root element.

## Configuring

The `this.base` method and `@base` decorator accept an object as their final parameter. This object allows you to pass through options to the various underlying modules using the following scheme:

- `classes` property (react-c)
    * In `this.base` options: passed to `cRoot` method

- `passthrough` property (react-passthrough)
    * In `@base` options: passed to `@passthrough` decorator

*Note: react-callback-register does not currently accept any options*

### Example options with `@base`

```jsx
@base("app", {passthrough: {force: ['disabled']}})
class MyComponent extends React.Component {
  // ...
}
```

### Example options with `this.base`

```jsx
render() {
  const classes = {active: this.props.active}

  return (
    <div {...this.base({classes})}>
      {this.props.children}
    </div>
  )
}
```

## API

For documentation on the added methods and available options, see the README files for the included modules:

- [react-callback-register](https://github.com/jamesknelson/react-callback-register)
- [react-c](https://github.com/jamesknelson/react-c)
- [react-passthrough](https://github.com/jamesknelson/react-passthrough)

## Example

This is an example of typical usage, with `propTypes` defined using the proposed
ES7 static properties syntax. Note how `@base.on` can be used in place of the `on` decorator from **react-callback-register**.

```jsx
import React, {Component, PropTypes} from 'react'
import base from 'react-base'


@base("app", {passthrough: {force: ['disabled']}})
class Selectable extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
  }


  @base.on('click')
  select() {
    if !(this.props.disabled) this.props.onSelectItem(this.props.value)
  }


  render() {
    const classes = {
      active: this.props.active,
    }

    return (
      <div {...this.base({classes})}>
        <div className={this.c("inner")}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
```
