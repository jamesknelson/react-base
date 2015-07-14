# react-base

React-base is a base class for your react components which is designed to make
your life easier.

When you extend `Base('namespace')` and add `{...this.baseProps({classes})}` to the root
of your rendered content, you get:

- A class added based on the provided namespace and the class name
- More classes added based on the passed in object, all namespaced with the
  root class
- Any passed-in class name will be smartly merged with the above
- If you've tagged any callbacks with `@Base.on`, these will be smartly merged
  with any callbacks passed via `this.props`
- Any props not specified in `propTypes` will be passed through

## API

Inheriting from Base(namespace) will give you the following:

- `this.baseClasses(...)`
- `this.c(...)`
- `@Base.on(...events)`
- `this.baseCallbacks`
- `this.baseProps({classes = {}, omitKnownPropTypes = true})`

## Example

This is an example of typical usage. `propTypes` is defined using the proposed
static properties from ES7):

```
import React, {PropTypes} from 'react'
import Base from 'react-base'


class Selectable extends Base("ui") {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
  }


  @Base.on('click')
  select() {
    this.props.onSelectItem(this.props.value)
  }


  render() {
    return (
      <div {...this.baseProps({classes: {active}})}>
        <div className={this.c("inner")}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
```
