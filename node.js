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
       const body = []
       req.on("data", (chunk) => {
        console.log(chunk)
        body.push(chunk)
       })
       req.on("end",()=>{
        const parsedBody = Buffer.concat(body).toString()
        console.log(parsedBody)
        const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt', message, err =>{
                 res.writeHead(302, { 'Location': '/' })
        return res.end()
            })
       })

        // ✅ FIXED HERE
       
    }

    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    res.end()
})

server.listen(3000)