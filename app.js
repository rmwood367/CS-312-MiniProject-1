const express = require ('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// keep the blog posts in the session 
let posts = [];

// Route to render index.ejs
app.get('/', (req, res) => 
{
  res.render('index', { posts: posts });
});

// Route to the create a post page
app.get('/posts', (req, res) => 
{
  res.render('posts');
});


app.post('/posts', (req, res) => 
{
  const post = {
    //post creation format
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date()
  };
  posts.push(post);
  res.redirect('/');
});

// Route to open the edit page
app.get('/blogposts/edit/:id', (req, res) =>
 {
  const postId = req.params.id;
  const post = posts[postId];
  res.render('edit', { post: post, id: postId });
}
)
;

// Route to handle the updates
app.post('/posts/edit/:id', (req, res) => 
{
  const postId = req.params.id;
  posts[postId] = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  res.redirect('/');
}
);

// Route to handle post deletion
app.post('/posts/delete/:id', (req, res) => 
{
  const postId = req.params.id;
  posts.splice(postId, 1);
  res.redirect('/');
}
);


// initialize the server
app.listen(3000, () => 
{
  console.log('website initalized at http://localhost:3000');
});