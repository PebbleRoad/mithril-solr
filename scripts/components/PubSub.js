;(function(SolrWidget, window, undefined){

    SolrWidget.eventsMixin = function(target) {
    
        var _subscriptions = [];
     
        target.broadcast = function(type, payload) {
            var ev = new CustomEvent(type, {
                detail: payload,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(ev);
        };
     
        target.subscribe = function(type, callback, capture) {
            _subscriptions.push([type, callback, capture]);
            document.addEventListener(type, callback, capture || false);
        };
     
        target.ignore = function(type, callback, capture) {
            _subscriptions.splice(_subscriptions.indexOf([type, callback, capture]), 1);
            document.removeEventListener(type, callback, capture || false);
        };
     
        // save a reference to a possible present unload method
        var _savedUnload = (target.onunload)? target.onunload : null;
        
        target.onunload = function() {
            while (_subscriptions.length) {
                document.removeEventListener.apply(document, _subscriptions.pop());
            }
            _savedUnload && _savedUnload();
        };
     
        return target;
    }
    

})(SolrWidget || {}, window);