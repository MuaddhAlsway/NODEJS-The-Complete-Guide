const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" placeholder="Enter your message"><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY')

        // ✅ FIXED HERE
        res.writeHead(302, { 'Location': '/' })
        return res.end()
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    res.end()
})

server.listen(3000)