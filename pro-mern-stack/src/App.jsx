const contentNode = document.getElementById('content');

// const issues = [{
//     Id: 1,
//     Status: 'open',
//     Owner: 'me',
//     Create: new Date('2018-8-1'),
//     Effect: 'okay',
//     Date: undefined,
//     Title: 'yes'
// },{
//     Id: 2,
//     Status: 'close',
//     Owner: 'me',
//     Create: new Date(2018/8/2),
//     Effect: 5,
//     Date: new Date('2018-08-12'),
//     Title: 'yes'
// }];


// const continents = ['Africa','America','Asia','Australia','Europe'];
// const message = continents.map(c => `Hello ${c}!`).join('\<br\/\>');

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placehold for the issue filter</div>
        )
    }
}

class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;

        return (
            <tr>
                <td >{issue.Id}</td>
                <td >{issue.Status}</td>
                <td >{issue.Create.toDateString()}</td>
                <td >{issue.Owner}</td>
                <td >{issue.Effect}</td>
                <td >{issue.Date?issue.Date.toDateString() : ''}</td>
                <td >{issue.Title}</td>
            </tr>
        );
    }
}

// 属性校验
// 类的静态成员只允许为函数，所以在类声明外定义
// IssueRow.PropTypes = {
//     issue_id: React.PropTypes.number.isRequiered,
//     issue_title: React.PropTypes.string
// }
// // 提供默认的属性值
// IssueRow.PropTypes = {
//     issue_id: '-----1-----'
// }

class IssueTable extends React.Component {
    render() {
        const issueRows = this.props.issues.map(issue => <IssueRow key = {issue.Id} issue = {issue}/>);
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Create</th>
                        <th>Effect</th>
                        <th>Completation Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                    <tbody>{issueRows}</tbody>
            </table>
        )
    }
}

class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.issueAdd;
        this.props.createIssue({
            Owner: form.owner.value,
            Title: form.title.value,
            Status: 'New',
            Create: new Date()
        });
        form.owner.value = "";
        form.title.value = "";
    }

    render() {
        return (
            <div>
                <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="owner"/>
                <input type="text" name="title" placeholder="title"/>
                <button>Add</button>
                </form>
            </div>
        )
    }
}
class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: []};
        this.createTestIssue = this.createTestIssue.bind(this);
        setTimeout(this.createTestIssue,2000);
    }
    createIssue(newIssue) {
        const newIssues = this.state.issues.slice();
        newIssue.Id = this.state.issues.length + 1;
        newIssues.push(newIssue);
        this.setState({issues:newIssues});
    }
    createTestIssue() {
        this.createIssue({
            Status: 'New',Owner: 'me',Create:new Date(), Title:'title'
        });
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
       fetch('/api/issues').then(response =>{
           response.json();
       }).then(data => {
           console.log("Total count of records: ",data._metadata.total_count);
           data.records.forEach(issue => {
            issue.Create = new Date(issue.Create);
            if(issue.Date){
                issue.Date = new Date(issue.Date);
            }
           });
          this.setState({issue: data.records});
       }).catch(err => {
           console.log(err);
       });
    }
    render() {
        return (
           <div>
               <h1>Issue Tracker</h1>
               <IssueFilter />
               <hr/>
               <IssueTable issues={this.state.issues}/>
               <button onClick={this.createTestIssue}>Add</button>
               <hr/>
               <IssueAdd />
               <hr/>
           </div> 
        );
    }    
};

// const component = <p>{message}</p>;

ReactDOM.render(<IssueList/>,contentNode);