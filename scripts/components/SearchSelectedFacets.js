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

                    var split = facet.value.split(':'),
                        type = split[0],
                        name = split[1]

                    group[type] = group[type] || [];
                    
                    group[type].push({
                        name: name,
                        value: type + ':' + name
                    })
                });

                return group
            }
            
            

            
        },
        facetList: function(arr, type, args){

            return arr.map(function(f){                

                return m('li', f.name, [
                    m('a', {
                        onclick: args.removeFacet.bind(this, f)
                    }, ' x Remove')
                ])
            })

        },

        view: function(ctrl, args){

            var facets = [],
                g = ctrl.groups(args.selectedFacets);

            for(var i in g){
                if(g.hasOwnProperty(i)){

                    facets.push(
                        m('.msolr-selected-facet', [
                            m('h5', args.facetFields[i]),
                            SolrWidget.SearchSelectedFacets.facetList(g[i], i, args)
                        ])
                    )
                }
            }

            

            return m('.msolr-selected-facets', [
                    facets
                ])
            
           
        }
    }
    

})(SolrWidget || {}, window);