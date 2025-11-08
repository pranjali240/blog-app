import express from "express";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("home",{posts});
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", (req, res) => {
    const post = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };

    posts.push(post);
    res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const post = posts[index];

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit",{post, index});
});

app.post("/edit/:index",(req, res) => {
    const index = parseInt(req.params.index);
    const { title, content} = req.body;

    if(index >= 0 && index < posts.length){
        posts[index].title = title;
        posts[index].content = content;
    } else {
        return res.status(404).send("Post not found");
    }

    res.redirect("/");
});

app.post("/delete/:index",(req, res) => {
    const index = req.params.index;
    posts.splice(index, 1);
    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});