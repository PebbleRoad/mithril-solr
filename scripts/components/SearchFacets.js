;(function(SolrWidget, window, undefined){

    SolrWidget.SearchFacets = {

        controller: function(){


        },
        facetList: function(fArray, type, args){

            var list = [];

            for(var i = 0; i < fArray.length; i+=2){
                
                if(fArray[i+1] > 0){
                    list.push(
                        m('li', m('a', {
                            href:"#",
                            onclick: args.onSelect.bind(this, type, fArray[i])
                        }, fArray[i], [
                            m('span.msolr-facet-count', fArray[i+1])                    
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

                        for(var type in rawFacet){
                            if(rawFacet.hasOwnProperty(type)){

                                rawFacet[type].length && facetFieldArray.push(
                                    m('.facet-field', [

                                        m('h3', args.facetFields[type]),                                        
                                        this.facetList(rawFacet[type], type, args)
                                    ])
                                )

                            }
                        }
                    }



                }
            }

            return m('.msolr-filters', [
                facetFieldArray
            ])
        }
    }
    

})(SolrWidget || {}, window);