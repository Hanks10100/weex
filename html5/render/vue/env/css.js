import '../styles/reset.css'
import '../styles/components.css'

import { toCSSText } from '../utils'
import { validateStyles } from '../validator'

function getSelector (key, scopeId) {
  if (scopeId === '@GLOBAL') {
    return `.${key}`
  }
  return `.${key}[${scopeId}]`
}

/**
 * Genearte <style>
 * @param {String} scopeId
 * @param {Array} cssMaps
 */
export function registerStaticStyles (scopeId, cssMaps) {
  if (Array.isArray(cssMaps)) {
    applyToDOM(cssMaps.map(css => {
      const styles = []
      for (const key in css) {
        if (process.env.NODE_ENV === 'development') {
          validateStyles(css[key])
        }
        styles.push(`${getSelector(key, scopeId)}{${toCSSText(css[key])}}`)
      }
      return styles.join(' ')
    }))
  }
}

function createStyleElement (cssText) {
  const $css = document.createTextNode(cssText)
  const $style = document.createElement('style')
  $style.type = 'text/css'
  $style.setAttribute('data-type', 'weex-styles')
  $style.appendChild($css)
  return $style
}

export function applyToDOM (styleList) {
  if (styleList.length) {
    const $head = document.head || document.getElementsByTagName('head')[0]
    styleList.map(createStyleElement).forEach($style => {
      $head.appendChild($style)
    })
  }
}
