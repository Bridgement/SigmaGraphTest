import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
    @service lianaSession;
    
    get getAuthToken() {
        return this.lianaSession.authToken;
    }
}
