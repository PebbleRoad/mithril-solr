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
                        placeholder: "Start typing to see instant results"
                    }),
                    m('button', args.isSearching? 'Searching' : 'Search')
                ])
            ])
        }
    }
    

})(SolrWidget || {}, window);