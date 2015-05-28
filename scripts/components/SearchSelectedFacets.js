;(function(SolrWidget, window, undefined){

    SolrWidget.SearchSelectedFacets = {

        controller: function(args){

            var self = this;

            this.selections = args.selectedFacets || [];

            /**
             * Group facets based on value
             */
            
            this.group = [];            
            
            this.selections.map(function(facet){

                var split = facet.value.split(':'),
                    type = split[0],
                    name = split[1]

                self.group[type] = self.group[type] || [];
                
                self.group[type].push({
                    name: name,
                    value: type + ':' + name
                })
            });

            

            this.getFacetName = function(value){

            }

            this.getFacetType = function(type){
                
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

            var facets = [];

            for(var i in ctrl.group){
                if(ctrl.group.hasOwnProperty(i)){

                    facets.push(
                        m('.msolr-selected-facet', [
                            m('h5', args.facetFields[i]),
                            SolrWidget.SearchSelectedFacets.facetList(ctrl.group[i], i, args)
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