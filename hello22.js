import Component from '@ember/component';

export default Component.extend({
  loadScript(url) {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';

      script.onload = resolve;
      script.onerror = reject;
      script.src = url;

      document.head.appendChild(script);
    });
  },
  get getAuthToken() {
      return this.lianaSession.authToken;
  },

  get getGraphData() {
    fetch("http://localhost:3000/api/neo4j-graph/userGraph", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${this.getAuthToken}`,
            'Content-Type': 'application/json'
        }
    }).then((data) => {
       console.log(data) 
    })
  },

  async didInsertElement() {
    this._super(...arguments);

    try {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.js');
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js');

      const Graph = window.graphology;
      const Sigma = window.Sigma;

      this.getGraphData()

      let graph = new Graph();
      graph.addNode("John", { x: 0, y: 10, size: 5, label: "John", color: "blue" });
      graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary", color: "red" });
      graph.addEdge("John", "Mary");

      const div = document.createElement('div');
      div.className = 'sigma-container';
      div.style.height = '500px';
      div.style.width = '100%';

      // Append the div to the component's element
      this.element.appendChild(div);

      new Sigma(graph, div);
    } catch (error) {
      console.error('Error loading scripts:', error);
    }
  }
});
