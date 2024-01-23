import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class HelloButtonComponent extends Component {
  text = 'Hello, world!';

  @action
  sayHello() {
    console.log('Hello, world!');
  }
}
