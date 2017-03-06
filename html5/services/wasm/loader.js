export function request (url) {
  if (typeof fetch === 'function') {
    return fetch(url)
  }
  if (typeof weex !== 'undefined' && weex.requireModule) {
    const stream = weex.requireModule('stream')
    return new Promise((resolve, reject) => {
      stream.fetch({
        url,
        type: 'text'
      }, res => {
        res.ok ? resolve(res) : reject(res)
      })
    })
  }

  // TODO: error
  return new Promise()
}

export function toBuffer (response) {
  if (typeof response.arrayBuffer === 'function') {
    return response.arrayBuffer()
  }
  // TODO: convert binary to buffer
  return new ArrayBuffer(1)
}

export function adaptApis (instance) {
  const apis = {}
  for (const key in instance.exports) {
    apis[key.replace(/^\_/, '')] = instance.exports[key]
  }
  return apis
}

export function loadWebAssembly (url, imports = {}) {
  return request(url)
    .then(toBuffer)
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      imports.env = imports.env || {}
      imports.env.memoryBase = imports.env.memoryBase || 0
      imports.env.tableBase = imports.env.tableBase || 0
      if (!imports.env.memory) {
        imports.env.memory = new WebAssembly.Memory({ initial: 256 })
      }
      if (!imports.env.table) {
        // In the MVP, the only valid element type is "anyfunc"
        imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
      }
      return new WebAssembly.Instance(module, imports)
    })
    .then(adaptApis)
}
