import express, { Request, Response } from 'express'
import itemsCategoryController from "./controllers/ItemsCategory.controller";

const app = express()
const port = process.env.PORT || 8080


app.use(express.json());
app.use(express.static("public"));


app.get('/', (_req: Request, res: Response) => {
	return res.send('Express Typescript on Vercel 5')
})

app.get('/ping', (_req: Request, res: Response) => {
	return res.send('pong 🏓')
})
app.use("/items_category", itemsCategoryController);
app.listen(port, () => {
	return console.log(`Server is listening on ${port}`)
})
