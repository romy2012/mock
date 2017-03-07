const Handlebars = require('handlebars');
const $ = require('jquery');
// const fs = require('fs');
let com = require('./js/common');
let ManageImport = {
    config: require('../cache/config.json') || [],
    init() {
        com.registHelper();
        this.render();
        this.bindEvent();
    },
    bindEvent() {
        $('.container').on('click', '.edit', (e) => {
            let dom = $(e.target);
            let url = dom .data('key');
            com.openWin('src/editImport.html?url='+encodeURIComponent(url),{height:600,width:800});
            return false;
        });
        $('.container').on('click', '.del', (e) => {
            let dom = $(e.target);
            let url = dom .data('key');
            delete this.config[url];
            com.save(this.config).done(()=>{
                alert('ok');
                location.reload();
            });
            return false;
        });
    },
    render() {
        let complete = Handlebars.compile($('#temp').html());
        let _html = complete({ list: this.config });
        $('.container').html(_html);
    }
};

ManageImport.init();