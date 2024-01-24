export default class extends Component {
    @service router;
    @service lianaSession;

    get getAuthToken() {
        return this.lianaSession.authToken;
    }
  
    @action
    impersonate() {
        fetch("https://api.bridgement.com/forest/actions/impersonate?timezone=Africa%2FJohannesburg", {
            method: "POST",
            body: {
                data: {
                    attributes: {
                        ids: [
                            29345
                        ]
                    }
                }
            },
            headers: {
                "Authorization": `Bearer ${this.getAuthToken}`,
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            console.log(data) 
        })

    //   const newRecord = this.store.createRecord('forest-product', {
    //     // Fill it with all the properties we need
    //     'forest-name': 'TV'
    //   });
  
    //   try {
    //     await newRecord.save();
  
    //     // The name of the collection here is the technical name not the one displayed in the UI
    //     const collection = this.store.peekAll('collection').find(collection => collection.name === 'product');
    //     this.router.transitionTo(
    //       'project.rendering.data.collection.list.view-edit.details',
    //       collection.id,
    //       // This is not a mistake, you have to specify the collection twice
    //       collection.id,
    //       newRecord.id,
    //     );
    //   } catch (error) {
    //     this.errorHandler.handleRequestFailure(error, 'Could not create product');
    //   }
    // }

    
  };
}