import express, {Request, Response} from "express"

const app = express()
const port = 3000

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hellow World")
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})