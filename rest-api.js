const express = require('express');
const app = express();
const port = 3000;

let data = [
    {
        "name": "alex",
        "age": "23",
    },
    {
        "name": "ben",
        "age": "33",
    },
    {
        "name": "nishang",
        "age": "28",
    },
    {
        "name": "bob",
        "age": "24",
    },
    {
        "name": "michael",
        "age": "43",
    },
    {
        "name": "john",
        "age": "76",
    },
    {
        "name": "kyle",
        "age": "12",
    },
    {
        "name": "jenny",
        "age": "20",
    }
]

app.get('/getData', (req, res) => {
    try {
        const { page, sort } = req.query;
        let limit = 2;
        let start = ((page - 1) * limit);
        let end = start + limit;
        let results = data;

        if (sort) {
            // sorting by age
            if (sort == "age") {
                results = results.sort((a, b) => {
                    return a.age - b.age;
                })
            }
        }

        // adding pagination
        results = results.slice(start, end);

        res.status(200).json(results);
    }
    catch (e) {
        console.log("error :>>", e);
        res.status(500).json(e);
    }
});

app.listen(port, () => console.log(`Rest API is available on port ${port}!`));