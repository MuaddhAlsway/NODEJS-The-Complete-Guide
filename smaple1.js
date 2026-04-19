const http = require('http') // Node core module → create HTTP server
const fs = require('fs')     // File system module → read/write files

// Create server → runs for every incoming request
const server = http.createServer((req, res) => {
    const url = req.url        // Requested route (e.g. "/", "/message")
    const method = req.method  // HTTP method (GET, POST, etc.)

    // Route: Home page → return form
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter message</title></head>')
        // Form sends POST request to /message
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" placeholder="Enter your message"><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end() // End response
    }

    // Route: Handle form submission
    if (url === '/message' && method === 'POST') {
        const body = [] // Store incoming data chunks

        // Listen for incoming data (stream)
        req.on("data", (chunk) => {
            body.push(chunk) // Collect chunks
        })

        // When all data is received
        req.on("end", () => {
            // Combine chunks → convert Buffer → string
            const parsedBody = Buffer.concat(body).toString()

            // Extract actual message from "message=..."
            const message = parsedBody.split("=")[1]

            // Save message to file (blocking - not ideal for production)
            fs.writeFileSync('message.txt', message)

            // Redirect user back to home page
            res.writeHead(302, { 'Location': '/' })
            return res.end()
        })

        // IMPORTANT:
        // Do NOT send response here
        // Response must wait until 'end' event finishes
    }

    // Default response (fallback route)
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    res.end()
})

// Start server on port 3000
server.listen(3000)