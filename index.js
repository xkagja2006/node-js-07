const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

//applicatwion/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jiyoung:wldud123@cluster0.4r7wd.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected'))
.catch(error => console.log(err))

//간단한 라우트!
app.get('/', (req, res) => {
  res.send('Hello World!!!!~~')
})

app.post('/register', (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면 
  //그것을을 DB에 넣어준다.
  // {
  //   id: "hello",
  //   password: "123"
  // }
  const user = new User(req.body)   //bodyParser이용해 req에 id와 pw를 받아들임
  user.save((err,userInfo) => {
    if(err) return res.json({succes : false, err})
    return res.status(200).json({
        success : true
    })
  })
})

app.listen(port, () => 
  console.log(`Example app listening on port ${port}`)
)