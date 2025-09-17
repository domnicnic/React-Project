
function customRender(reactElement, container){
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    domElement.setAttribute('href'. reactElement.props.href)
    domElement.setAttribute('target', reactElement.props.target)
    container.appendChild(domElement);
}

const reactElement = {
   type: 'a',
   props: {
    href: 'http://google.com',
    target: '__blank'
   },
   children: 'Click me to visit Google' 
}
const mainContainer = document.querySelector('#root');
costomRender(reactElement, mainContainer);