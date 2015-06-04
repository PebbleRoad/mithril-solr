;(function(SolrWidget, window, undefined){

    SolrWidget.SearchForm = {

        controller: function(){


        },

        view: function(ctrl, args){ 

            return m('.msolr-form', [
                m('form', {
                    onsubmit: args.onSubmit
                },[
                    m('input', {
                        type: "text",
                        defaultValue: args.q(),
                        onchange: m.withAttr('value', args.q),
                        placeholder: "Enter a keyword"
                    }),
                    m('button', args.isSearching? 'Searching' : 'Search')
                ]),
                m('h3', {
                    style: {
                        display: args.numFound() > 0? '' : 'none'
                    }
                },args.numFound() + ' results found for ' + args.q())
            ])
        }
    }
    

})(SolrWidget || {}, window);