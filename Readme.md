# Front end Interface to Solr Data Source

A simple UI for any Solr Endpoint. Just 6KB minified

1. Customizable search results listing
2. Support Faceting
3. Support URL hash or HTML5 pushstate
4. Runs on Mithril JS


## Install

1. Clone the repository
    
        git clone git@github.com:PebbleRoad/mithril-solr.git

2. Install bower dependency - Mithril JS
        
        bower install
   
2. Add the script tags in your html pages

        <div id="Search"></div>
        
        <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="bower_components/mithril/mithril.js"></script>
        <script src="mithril.solr.min.js"></script>

3. Initialize your Solr App

        <script>
          /**
           * Fields
           * @type {Object}
           */
          
          
          var fields = {
              title   : 'navigation_title_t',
              summary : 'document_config_summary_t',
              url     : 'navurl_s'
          };
          
          /**
           * Facets
           * @type {Object}
           */
          var facetFields = {
              'contenttype_s': 'Content type',
              'section_s': 'Section',
              'year_s': 'Year'
          }

          /**
           * Your App
           * @type {Object}
           */
          var app = {
              controller: function(){
          
                  this.endPoint = 'http://momcorp.internet.dynawebsite.com/solr/mom/lucid';
          
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
