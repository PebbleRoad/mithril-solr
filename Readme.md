# Front end Interface to Solr Data Source

A simple UI for any Solr Endpoint. Just 6KB minified

1. Customizable search results listing
2. Supports Faceting
3. Supports URL hash or HTML5 pushstate


## Install

1. Clone the repository
    
        git clone git@github.com:PebbleRoad/mithril-solr.git
   
2. Add the script tags in your html pages

        <div id="Search"></div>
                
        <script src="//cdnjs.cloudflare.com/ajax/libs/mithril/0.2.0/mithril.min.js"></script>
        <script src="mithril.solr.min.js"></script>

3. Initialize your Solr App

        <script>
          /**
           * Fields
           * @type {Object}
           */

          var fields = {
              title   : 'alternate_title',
              summary : 'abstract',
              url     : 'presentation_url'
          };
          
          /**
           * Facets
           * @type {Array}
           */
          
          var facetFields = [
            {
              name: 'region',
              displayName: 'Region',
              type: 'string'
            },
            {
              name: 'function',
              displayName: 'Function',
              type: 'string'
            },
            {
              name: 'localtype',
              displayName: 'Region',
              type: 'string'
            },
            {
              name: 'toDate',
              displayName: 'Date',
              type: 'date'
            }
          ]

          /**
           * Your App
           * @type {Object}
           */
          var app = {
              controller: function(){
          
                  this.endPoint = 'https://data.esrc.unimelb.edu.au/solr/FACP/select';
          
                  this.facetFields = facetFields;
          
                  this.fields = fields;
          
              },
              view: function(ctrl){
                  return [
                      m.component(SolrWidget, {                            
                          endPoint: ctrl.endPoint,
                          facetFields: ctrl.facetFields,
                          fields: ctrl.fields
                      })
                  ]
              }
          }
          
          /* Mount */
          
          m.route.mode = 'hash';
          m.route(document.getElementById('Search'), '/search', {
              '/search': app
          });
        </script>
