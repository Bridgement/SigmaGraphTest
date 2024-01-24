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
            body: JSON.stringify({
                data: {
                    attributes: {
                        ids: [29345]
                    }
                }
            }),
            headers: {
                "Authorization": `Bearer ${this.getAuthToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
}
