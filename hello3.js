import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
    text = 'Hello, world!';
    
    get myStringToTemplate() {
        return `You\'ve selected {{collection1.selectedRecord.forest-fullname}}.`;
    }

    get isContextSet() {
        // This will return true only if there is a record selected for sithCollection, shipCollection and that colorComponent selected value has been set
        return this.args.component.templatingHelper.isContextSet(
        this.myStringToTemplate,
        );
    }

    get myTitle() {
        if (!this.isContextSet) {
        return 'Please select a sith, a ship and a color first';
        }

        return this.args.component.templatingHelper.injectVariablesIntoStringWithoutValidation(
        this.myStringToTemplate,
        { expectedType: 'String' },
        );
    }
}
