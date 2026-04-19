const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    // HOME PAGE
    if (url === "/" && method === "GET") {
        res.write("<html>")
        res.write("<head><title>Going to admin</title></head>")
        res.write("<body>")
        res.write('<form action="/admin" method="POST">')
        res.write('<button type="submit">Go to admin</button>')
        res.write("</form>")
        res.write("</body>")
        res.write("</html>")
        return res.end()
    }

    // ADMIN PAGE (SHOW FORM)
    if (url === "/admin" && method === "POST") {
        res.write("<html>")
        res.write("<head><title>The page</title></head>")
        res.write("<body>")

        res.write('<form action="/signIn" method="POST">')
        res.write('<input type="text" name="username" placeholder="USERNAME">')
        res.write('<input type="password" name="password" placeholder="Your password">')
        res.write('<button type="submit">Sign in</button>')
        res.write("</form>")

        res.write("</body>")
        res.write("</html>")
        return res.end()
    }

    // SIGN IN (HANDLE FORM DATA)
    if (url === "/signIn" && method === "POST") {
        const body = []

        req.on("data", (chunk) => {
            body.push(chunk)
        })

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString()

            // Extract username/password safely
            const message = parsedBody.split("=")[1]

            fs.writeFileSync("message.txt", message)

            res.writeHead(302, { Location: "/" })
            return res.end()
        })
    }

    // 404 FALLBACK
    res.write("<html>")
    res.write("<head><title>404</title></head>")
    res.write("<body><h1>Page Not Found</h1></body>")
    res.end()
})

server.listen(3000)