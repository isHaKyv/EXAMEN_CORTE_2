import express from 'express';
import { Request, Response } from 'express';
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let alumnosMessages: string[] = [];
let docentesMessages: string[] = [];

app.post('/send', (req: Request, res: Response) => {
    const { message, type } = req.body;
    if (type === 'alumno') {
        alumnosMessages.push(message);
    } else if (type === 'docente') {
        docentesMessages.push(message);
    }
    res.status(200).send('Message sent');
});

app.get('/events/alumnos', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    setInterval(() => {
        res.write(`data: ${JSON.stringify(alumnosMessages)}\n\n`);
    }, 1000);
});

app.get('/events/docentes', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    setInterval(() => {
        res.write(`data: ${JSON.stringify(docentesMessages)}\n\n`);
    }, 1000);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto:${port}`);
});
