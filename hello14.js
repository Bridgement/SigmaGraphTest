import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export default class extends Component {
    @service lianaSession;
    
    get getAuthToken() {
        return this.lianaSession.authToken;
    }

    @computed('getAuthToken')
    get safeAuthToken() {
      return JSON.stringify(this.getAuthToken);
    }
}
