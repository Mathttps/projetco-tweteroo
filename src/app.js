import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors()); 

app.use(express.json()); 


const users = [];
const tweets = [];


app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    return res.status(400).json({ message: 'Bad Request' });
  }


  users.push({ username, avatar });

  res.json({ message: 'OK' });
});


app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    return res.status(400).json({ message: 'Bad Request' });
  }


  const userExists = users.some((user) => user.username === username);
  if (!userExists) {
    return res.status(401).json({ message: 'UNAUTHORIZED' });
  }


  tweets.push({ username, tweet });

  res.json({ message: 'OK' });
});


app.get('/tweets', (req, res) => {
  const last10Tweets = tweets.slice(-10).reverse().map((tweet) => {
    const user = users.find((u) => u.username === tweet.username);
    return {
      username: tweet.username,
      avatar: user ? user.avatar : '',
      tweet: tweet.tweet,
    };
  });

  res.json(last10Tweets);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
