const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));//express 的中间件 express.static 
app.use(bodyParser.json());

const issues = [{
    Id: 1,
    Status: 'open',
    Owner: 'me',
    Create: new Date('2018-8-1'),
    Effect: 'okay',
    Date: undefined,
    Title: 'yes'
},{
    Id: 2,
    Status: 'close',
    Owner: 'me',
    Create: new Date(2018/8/2),
    Effect: 5,
    Date: new Date('2018-08-12'),
    Title: 'yes'
}];

app.get('/api/issues',(req,res)=>{
    const metadata = { total_count : issues.length };
    res.json({ _metadata: metadata, records: issues });
});
app.post('/api/issues',(req,res)=>{
    const newIssue = req.body;
    newIssue.Id = issues.length + 1;
    newIssue.Create = new Date();
    if(!newIssue.status) {
        newIssue.status = 'New';
    }
    issues.push(newIssue);
    res.json(newIssue);
});


app.listen(3001,function(){
    console.log('App started on port 3001');
});
