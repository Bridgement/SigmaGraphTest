import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export default class extends Component {
    @service lianaSession;
    
    get getAuthToken() {
        return this.lianaSession.authToken;
    }

    get getScriptTokenHtml() {
      return `
        <script>
          var token = ${this.getAuthToken};
        </script>
      `
    }

    get getScriptHtml() {
      return `
      <script>
    function loadScript(url, callback){
        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState){  // For old versions of IE
            script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
            };
        } else {  // Other browsers
            script.onload = function(){
            callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.js", function(){
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js", function(){
            
            console.log("making request")
            fetch("http://localhost:3000/api/neo4j-graph/userGraph", {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ${this.getAuthToken}',
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((data) => {
                console.log("request made")
                console.log("data: ", data)
                var Graph = window.graphology;
                var sigma = window.Sigma
                var sigmaContainer = document.getElementById("sigma-container");

                var graph = new Graph();

                graph.addNode("John", { x: 0, y: 10, size: 5, label: "John", color: "blue" });
                graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary", color: "red" });

                graph.addEdge("John", "Mary");

                var renderer = new sigma(graph, sigmaContainer);
            })
        });
    });
</script>
`
    }
}
