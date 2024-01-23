import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
    @service lianaSession;
    
    get getAuthToken() {
        console.log(this.lianaSession.authToken)
        console.log(this.auth)
        return this.lianaSession.authToken;
    }
}
