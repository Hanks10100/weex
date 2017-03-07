export function request (url) {
  if (typeof fetch === 'function') {
    return fetch(url)
  }
  if (typeof weex !== 'undefined' && weex.requireModule) {
    return new Promise((resolve, reject) => {
      weex.requireModule('stream').fetch({
        method: 'GET',
        type: 'text',
        url
      }, res => res.ok ? resolve(res) : reject(res))
    })
  }

  // TODO: throw error
  return new Promise()
}

function string2array (str) {
  const array = new Uint8Array(str.length)
  for (let i = 0, n = str.length; i < n; i++) {
    array[i] = str.charCodeAt(i)
  }
  return array
}

function string2buffer (str) {
  const buffer = new ArrayBuffer(str.length)
  const bufferView = new Uint8Array(buffer)
  for (let i = 0, n = str.length; i < n; i++) {
    // the return value of charCodeAt is UTF-16 code, which is betwee [0, 65536)
    // but Uint8Array only takes [0, 256)
    // It only works well for wasm bytes.
    bufferView[i] = str.charCodeAt(i)
  }
  return buffer
}

export function toBuffer (response) {
  if (typeof response.arrayBuffer === 'function') {
    return response.arrayBuffer()
  }
  return string2buffer(response.data)
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
