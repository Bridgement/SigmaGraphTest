import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class extends Component {
    @service store;

    text = 'Hello, world!';
    
    get myStringToTemplate() {
        // this.store.peekAll('collection').forEach(element => {
        //     console.log(element)
        // });
        var collection = this.store.peekAll('collection').find(collection => collection.name === 'DbApplication');
        console.log(collection)
        return collection;
        // return `You\'ve selected {{collection}}.`;
    }

    get isContextSet() {
        // This will return true only if there is a record selected for sithCollection, shipCollection and that colorComponent selected value has been set
        return this.args.component.templatingHelper.isContextSet(
        this.myStringToTemplate,
        );
    }

    get myTitle() {
        // if (!this.isContextSet) {
        // return 'Please select a sith, a ship and a color first';
        // }

        return this.args.component.templatingHelper.injectVariablesIntoStringWithoutValidation(
        this.myStringToTemplate,
        { expectedType: 'String' },
        );
    }
}
