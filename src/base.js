import invariant from 'invariant'
import c from 'react-c'
import callbackRegister from 'react-callback-register'
import passthrough from 'react-passthrough'


base.on = callbackRegister.on
export default function base(prefix, options = {}) {
  return function decorator(component) {
    invariant(!component.prototype.base, "@base must be applied to a class with no `base` property")

    callbackRegister(component)
    c(prefix)(component)
    passthrough(options.passthrough)(component)
      
    component.prototype.base = function base({passthrough = {}, classes = {}, callbacks = true} = {}) {
      return Object.assign(
        passthrough === false ? {} : this.passthrough(passthrough),
        {className: classes === false ? '' : this.cRoot(classes),
         ref: 'base'},
        callbacks === false ? {} : this.callbacks
      )
    }
  }
}
