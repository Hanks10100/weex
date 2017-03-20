// import { validateStyles } from '../validator'

function trimTextNode (children) {
  if (Array.isArray(children)) {
    return children.filter(vnode => !!vnode.tag)
  }
  return children
}

export default {
  render (createElement) {
    /* istanbul ignore next */
    // if (process.env.NODE_ENV === 'development') {
    //   validateStyles('div', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    // const ms = this._getComponentStyle(this.$vnode.data)
    return createElement('html:div', {
      attrs: { 'weex-type': 'div' },
      on: this._createEventMap(),
      staticClass: 'weex-div weex-ct',
      // staticStyle: ms
      staticStyle: this._normalizeInlineStyles(this.$vnode.data)
    }, trimTextNode(this.$slots.default))
  }
}
