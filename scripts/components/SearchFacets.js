;(function(SolrWidget, window, undefined){

    SolrWidget.SearchFacets = {

        facetView: function(ctrl, facetArray, name, args){

            switch (SolrWidget.vm.getFacetProp(name, 'type')){

                case 'string':
                    return this.facetStringView(facetArray, name, args);
                    break;

                case 'date':
                    return this.facetDateView(facetArray, name, args);
                    break;
            }
        },
        facetStringView: function(facetArray, name, args){
            
            var list = [];

            for(var i = 0; i < facetArray.length; i+=2){
                
                if(facetArray[i+1] > 0){
                    list.push(
                        m('li', m('a', {
                            href:"#",
                            onclick: args.onSelect.bind(this, name, facetArray[i])
                        }, facetArray[i], [
                            m('span.msolr-facet-count', facetArray[i+1])                    
                        ]))
                    )   
                }
            }

            return m('ul', [list]);

        },
        facetDateView: function(facetArray, name, args){


            var list = [];

            for(var i = 0; i < facetArray.length; i+=2){
                
                if(facetArray[i+1] > 0){
                    list.push(
                        m('li', m('a', {
                            href:"#",
                            onclick: args.onSelect.bind(this, name, facetArray[i])
                        }, new Date(facetArray[i]).getFullYear(), [
                            m('span.msolr-facet-count', facetArray[i+1])                    
                        ]))
                    )   
                }
            }

            return m('ul', [list]);

        },

        view: function(ctrl, args){
            var facets = args.facets(),
                facetFieldArray = [];

            /**
             * Iterate through facets
             */
            
            for(var f in facets){
                if(facets.hasOwnProperty(f)){

                    /**
                     * Look for facet fields
                     */
                    
                    var rawFacet = facets[f];                    
                    
                    if(f == 'facet_fields'){

                        for(var name in rawFacet){
                            if(rawFacet.hasOwnProperty(name)){
                                
                                rawFacet[name].length && facetFieldArray.push(
                                    m('.facet-field', [
                                        m('h3', SolrWidget.vm.getFacetProp(name, 'displayName')),
                                        this.facetView(ctrl, rawFacet[name], name, args)
                                    ])
                                )

                            }
                        }
                    }



                }
            }

            return m('.msolr-filters', [ facetFieldArray ])
        }
    }
    

})(SolrWidget || {}, window);