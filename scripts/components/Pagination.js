;(function(SolrWidget, window, undefined){

    var pageOptions = {        
        ellipsis : '&hellip;',
        edges    : 2,
        limit    : 10
    }

    SolrWidget.Pagination = {

        controller: function(args, e){            

            /* Current page */

            this.page = args.currentPage();

            /* Total pages */

            this.totalPages = function(){

                return Math.ceil(args.numFound()/args.perPage())
            }

            /**
             * Page list
             */
            
            this.pageList = function(){            

                var p = [],
                    start = 0,
                    end = this.totalPages(),
                    left = Math.max(parseInt(this.page) - pageOptions.edges, 0),
                    right = Math.min(parseInt(this.page) + pageOptions.edges, this.totalPages())
                

                for(var i = start; i < end; i ++){
                    
                    if( i == 0 
                        || i == parseInt(this.totalPages()) - 1 
                        || this.totalPages() < pageOptions.limit){

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
            
            return m('nav.msolr-pages', {                
                style: {
                    display: ctrl.pageList().length > 1?  '': 'none'
                }
            },[
                m('a.previous', {
                    onclick: args.prevPage.bind(this, ctrl.totalPages()),
                    className: ctrl.page == 0? 'page-disabled': ''
                }, 'Prev'),
                ctrl.pageList().map(function(page){
                    
                    switch(page){
                        
                        case pageOptions.ellipsis:
                            return m('span.page-ellipsis', m.trust(page))
                            break;

                        default:
                            return m('a', {                                
                                onclick: args.changePage.bind(ctrl, parseInt(page)),
                                className: page == ctrl.page? 'page-current': ''
                            }, parseInt(page) + 1)
                            break;

                    }
                    
                }),
                m('a.next', {
                    onclick: args.nextPage.bind(this, ctrl.totalPages()),
                    className: ctrl.page == (ctrl.totalPages() - 1)? 'page-disabled': ''
                }, 'Next'),
            ]);
        }
    }
    

})(SolrWidget || {}, window);