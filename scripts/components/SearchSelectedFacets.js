;(function(SolrWidget, window, undefined){

    SolrWidget.SearchSelectedFacets = {

        controller: function(args){

            var self = this;

            this.selections = args.selectedFacets || [];

            /**
             * Group facets based on value
             */
            

            this.groups = function(facets){

                var group = [];            
            
                facets.map(function(facet){
                    
                    var idx = facet.value.indexOf(':'),                        
                        type = facet.value.substr(0, idx)
                        value = facet.value.substr(idx + 1)
                    
                    group[type] = group[type] || [];
                    
                    group[type].push({
                        name: type,
                        fullValue: type + ':' + value,
                        value: value,
                    })
                });

                return group
            }
            
        },
        facetList: function(arr, args){

            return arr.map(function(f){                
                return m('li', SolrWidget.SearchSelectedFacets.facetDisplay(f), [
                    m('a', {
                        onclick: args.removeFacet.bind(this, f)
                    }, ' x Remove')
                ])
            })

        },

        facetDisplay: function(f){
            
            switch(SolrWidget.vm.getFacetProp(f.name, 'type')){

                case 'string':
                    return SolrWidget.vm.sanitize(f.value);
                    break;

                case 'date':                    
                    return new Date(SolrWidget.vm.sanitize(f.value)).getFullYear();
                    break;
            }
        },

        view: function(ctrl, args){

            var facets = [],
                g = ctrl.groups(args.selectedFacets);

            for(var i in g){
                if(g.hasOwnProperty(i)){                    
                    facets.push(
                        m('.msolr-selected-facet', [
                            m('h5', SolrWidget.vm.getFacetProp(i, 'displayName')),
                            SolrWidget.SearchSelectedFacets.facetList(g[i], args)
                        ])
                    )
                }
            }

            

            return m('.msolr-selected-facets', [ facets ])
            
           
        }
    }
    

})(SolrWidget || {}, window);