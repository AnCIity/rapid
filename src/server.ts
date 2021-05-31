import 'reflect-metadata'
import http from 'http'

class Rapid {
  private middleware: (req, res) => void = () => {}

  constructor() {}
  listen(port: number, cb: () => void) {
    const server = http.createServer((req, res) => {
      this.middleware(req, res)
    })

    return server.listen(port, cb)
  }
  use(middlewareFn: (req, res) => void) {
    this.middleware = middlewareFn
    return this
  }
}

const app = new Rapid()

app.use((req, res) => {
  res.writeHead(200)
  res.end('A request come in')
})

app.listen(3000, () => {
  console.log('Server listen on port http://localhost:3000')
})
