;(function(SolrWidget, window, undefined){

    var pageOptions = {        
        ellipsis : '&hellip;',
        edges    : 2,
        limit    : 10
    }

    SolrWidget.Pagination = {

        controller: function(args){            

            /* Total pages */

            this.totalPages = function(perPage){

                return Math.ceil(args.numFound()/perPage)
            
            }.bind(this)

            /**
             * Page list
             */
            
            this.pageList = function(current, perPage){            
                
                var p = [],
                    totalPages = this.totalPages(perPage),
                    start = 0,
                    end = totalPages,
                    left = Math.max(parseInt(current) - pageOptions.edges, 0),
                    right = Math.min(parseInt(current) + pageOptions.edges, totalPages)                

                for(var i = start; i < end; i ++){
                    
                    if( i == 0 
                        || i == parseInt(totalPages) - 1 
                        || totalPages < pageOptions.limit){

                        p.push(i)

                    } else{

                        if(i == (right + 1) || i == (left - 1)) p.push(pageOptions.ellipsis)

                        if( i <= right && i >= left) p.push(i)
                    }
                }

                return p;

            }.bind(this);
          

        },
        

        view: function(ctrl, args){

            /* Page List */

            var pageList = ctrl.pageList(args.currentPage(), args.perPage()),
                totalPages = ctrl.totalPages(args.perPage());
            
            return m('nav.msolr-pages', {                
                style: {
                    display: pageList.length > 1?  '': 'none'
                }
            },[                
                m('a.previous', {
                    onclick: args.prevPage.bind(this, totalPages),
                    className: args.currentPage() == 0? 'page-disabled': ''
                }, 'Prev'),

                pageList.map(function(page){
                    
                    switch(page){
                        
                        case pageOptions.ellipsis:
                            return m('span.page-ellipsis', m.trust(page))
                            break;

                        default:
                            return m('a', {                                
                                onclick: args.changePage.bind(ctrl, parseInt(page)),
                                className: page == args.currentPage()? 'page-current': ''
                            }, parseInt(page) + 1)
                            break;

                    }
                    
                }),
                
                m('a.next', {
                    onclick: args.nextPage.bind(this, totalPages),
                    className: args.currentPage() == (totalPages - 1)? 'page-disabled': ''
                }, 'Next'),
            ]);
        }
    }
    

})(SolrWidget || {}, window);