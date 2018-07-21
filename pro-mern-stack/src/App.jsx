const contentNode = document.getElementById('content');

const continents = ['Africa','America','Asia','Australia','Europe'];
const message = continents.map(c => `Hello ${c}!`).join('\<br\/\>');

const component = <p>{message}</p>;
ReactDOM.render(component,contentNode);