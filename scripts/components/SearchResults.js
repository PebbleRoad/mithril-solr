;(function(SolrWidget, window, undefined){

    SolrWidget.SearchResults = {

        controller: function(){


        },

        noResults: function(docs, args){
            
            if(docs.length < 1 && args.q() && !args.isSearching){
                return m('.msolr-no-results', 'Your search did not return any results.')
            }
        },

        view: function(ctrl, args){ 

            var docs = args.docs();

            return m('.msolr-results', [
                m('ul', [
                    docs.map(function(doc){

                        return m('li', [
                            m('h3', m('a', {href: doc[args.fields.url] }, doc[args.fields.title])),
                            m('.summary', [
                                m('p', doc[args.fields.summary])
                            ])
                        ])
                    })
                ]),
                this.noResults(docs, args)
            ])
        }
    }
    

})(SolrWidget || {}, window);