import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

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
                "data": {
                  "attributes": {
                    "values": {},
                    "ids": [
                      "66703"
                    ],
                    "collection_name": "DbUser",
                    "parent_collection_name": "DbJuristicEntity",
                    "parent_collection_id": "66114",
                    "parent_association_name": "Users",
                    "all_records": false,
                    "all_records_subset_query": {
                      "fields[DbUser]": "Id,CreatedOn,LastLoginDate,email,JuristicEntity,RegistrationStep,Name,Surname,IdIsActiveDirector,decision,internal rejection reason,date decided,IdNumberPassport,Country,Mobile,UTMSource,UTMMedium,UTMCampaign,UTMTerm,UTMContent,AdGroupId,ReferralPage,Attribution,HowDidYouFindUs,AccountManager,SessionData,LeadProviderTrackingId,SalesforceContactId,LeadProviderSource,UserInterfaceVersion,Partner",
                      "fields[JuristicEntity]": "RegisteredName",
                      "fields[AccountManager]": "Email",
                      "fields[Partner]": "Id",
                      "page[number]": 1,
                      "page[size]": 10,
                      "sort": "-Id",
                      "timezone": "Africa/Johannesburg"
                    },
                    "all_records_ids_excluded": [],
                    "smart_action_id": "230988d0-4355-11ea-b9f6-03fffe8748e7",
                    "signed_approval_request": null
                  },
                  "type": "custom-action-requests"
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
            return fetch("https://app.bridgement.com/api/users/login", {
              method: "POST",
              body: JSON.stringify(data.webhook.body),
              headers: data.webhook.headers
          })
        }).then(()=> {
          console.log('done')
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
}
