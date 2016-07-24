import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';
import R from 'ramda';

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
          <StatefulComponent item={this.props.item} >
            <li>Here we go</li>
          </StatefulComponent>
          <StatelessComponent item={this.props.item} onComponentShouldUpdate={onComponentShouldUpdate} >
            <li>Here we go</li>
          </StatelessComponent>
        </div>

      </div>);
  }
}

const onComponentShouldUpdate = (domNode, lastProps, nextProps) => {
  console.log(lastProps, nextProps);
  console.log('items equal?', R.equals(lastProps.item, nextProps.item));
  console.log('children equal?', R.equals(lastProps.children, nextProps.children));
  console.log('children dom properties', lastProps.children.dom, nextProps.children.dom);
  return !R.equals(lastProps, nextProps);
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

class StatefulComponent extends Component {
  shouldComponentUpdate(nextProps) {
    return onComponentShouldUpdate(null, this.props, nextProps);
  }

  render() {
    const { item, children } = this.props;
    console.log('render');
    return (
      <div>
        <h2>Stateful stuff</h2>
        <p>{item.name}</p>
        <ul>
          {children}
        </ul>
      </div>
    );
  }
}

const demoItem = { name: 'foo' };

InfernoDOM.render(<Menu item={demoItem} />, document.body);
