const json = {
    type: 'div',
    props: { id: 'hello', class: 'foo'},
    children: [
        {type: 'h1', children: 'Hello'},
        {type: 'p', children: [{type: 'span', props: {class: 'bar'}, children: 'World'}]}
    ]
}

const buildDOM = (json) => {
    if(!Array.isArray(json.children)) {
        const node = document.createElement(json.type);
        node.innerText = json.children;
        if(json.props){
            const props = json.props;
            if(props?.id){
                node.id = props.id;
            } 

            if(props.class){
                node.className = props.class;
            }
        }
        return node;
    }

    const parent = document.createElement(json.type);
    if(json.props){
            const props = json.props;
            if(props?.id){
                parent.id = props.id;
            } 

            if(props.class){
                parent.className = props.class;
            }
        }
    for(let i = 0; i < json.children.length; i++){
        const child = buildDOM(json.children[i]);
        parent.appendChild(child);
    }

    return parent;
}
const child = buildDOM(json)
console.log(child);
const root = document.getElementById('root');
root.appendChild(child);
