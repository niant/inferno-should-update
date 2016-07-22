
import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  render() {
    const displayMenu = this.state.menuOpen? '': 'display:none;';
    return (
      <div>
        <button onClick={this.toggleMenu}>Toggle menu</button>
        <div style={displayMenu}>
          <StatelessComponent item={this.props.item} onComponentShouldUpdate={onComponentShouldUpdate} >
            <li>Here we go</li>
          </StatelessComponent>
        </div>
      </div>);
  }
}

const onComponentShouldUpdate = (domNode, lastProps, nextProps) => {
  // lastProps.children will not exist, but newProps.children does
  // is it meant to be like so? in stateful component it behaves differently
  const isEqualProps = (nextProps.item === lastProps.item && nextProps.children === lastProps.children);
  console.log('should update?', lastProps, nextProps, !isEqualProps);
  return !isEqualProps;
}

const StatelessComponent = ({ item, children }) => {
  console.log('render');
  return (
    <div>
      <h2>Stateless stuff</h2>
      <p>{item.name}</p>
      <ul>
        {children}
      </ul>
    </div>
  );
}

const demoItem = { name: 'foo' };

InfernoDOM.render(<Menu item={demoItem} />, document.body);
