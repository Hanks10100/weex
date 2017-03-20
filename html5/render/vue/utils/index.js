export * from './func'
export * from './event'
export * from './component'
export * from './lazyload'
export * from './style'
export * from './type'

import { normalize } from './flex'

/**
 * Create a cached version of a pure function.
 */
export function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delmited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached(str => {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
})

/**
 * Capitalize a string.
 */
export const capitalize = cached(str => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /([^-])([A-Z])/g
export const hyphenate = cached(str => {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
})

export function camelToKebab (name) {
  if (!name) { return '' }
  return name.replace(/([A-Z])/g, function (g, g1) {
    return `-${g1.toLowerCase()}`
  })
}

export function appendStyle (css, styleId, replace) {
  let style = document.getElementById(styleId)
  if (style && replace) {
    style.parentNode.removeChild(style)
    style = null
  }
  if (!style) {
    style = document.createElement('style')
    style.type = 'text/css'
    styleId && (style.id = styleId)
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  style.appendChild(document.createTextNode(css))
}

export function nextFrame (callback) {
  const runner = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || (cb => setTimeout(cb, 16))
  runner(callback)
}

/**
 * add flex prefixes for compatibility conisderation.
 */
export function normalizeStyles (style) {
  const styles = normalize(style)

  const realStyle = {}
  for (const key in styles) {
    const name = hyphenate(key)
    let value = styles[key]

    // TODO: add more reliable check
    if (typeof value === 'number' && value !== 'line-height') {
      // TODO: support more units
      value += 'px'
    }

    realStyle[name] = value
  }
  return realStyle
}

// TODO: prefix or hack
export function generateCSSText (key, value) {
  return `${hyphenate(key)}:${value};`
}

export function toCSSText (object, rewriter = generateCSSText) {
  let cssText = ''
  if (object) {
    const styles = normalizeStyles(object)
    for (const key in styles) {
      cssText += rewriter(key, styles[key])
    }
  }
  return cssText
}
