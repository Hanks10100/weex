// import 'lazyimg'
import '../../browser/render/gesture'

import '../../../shared/arrayFrom'
import '../../../shared/objectAssign'
import '../../../shared/objectSetPrototypeOf'

import 'core-js/modules/es6.object.to-string'
import 'core-js/modules/es6.string.iterator'
import 'core-js/modules/web.dom.iterable'
import 'core-js/modules/es6.promise'

export * from './viewport'

import { registerStaticStyles } from './css'
import { init } from '../modules'
import weex from './weex'

init(weex)

window.weex = weex
window.__register_static_styles__ = registerStaticStyles
window.global = window
