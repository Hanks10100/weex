/**
 * @fileOverview
 * WebAssembly Services
 */

import { loadWebAssembly } from './loader'

export default {
  create (id, env, config) {
    return {
      instance: {
        supportWebAssembly: () => !(typeof WebAssembly === 'undefined')
        loadWebassembly
      }
    }
  }
}
