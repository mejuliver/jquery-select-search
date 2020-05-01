import './style.scss';

if ('undefined' != typeof window.jQuery ) {

    $.fn.jselect_search = function ( options ) {
      let settings = $.extend({
            placeholder : 'Search here'
            }, options );

      return $(this).each(function(){
        let placeholder = ( typeof $(this).attr('data-placeholder')  != 'undefined' ?  $(this).attr('data-placeholder') : settings.placeholder );
        $(this).addClass('select-search')
          .append( `<a href="#" class="trigger"></a>
            <div class="sub-wrapper"><div class="select-search-sub">
              <input class="select-search-input" type="text" placeholder="${placeholder}" name="select_search_${$(this).index()}">
              <ul></ul>
            <div></div>`);

        let _default_text = $(this).find('select option:selected').text();

        $(this).find('.trigger').text(_default_text);

        $(this).find('select option').each(function(){
          if( $(this).val() != '' ){
            $(this).closest('.select-search').find('.select-search-sub ul').append('<li><a href="#" data-value="'+$(this).val()+'">'+$(this).text()+'</a></li>');
          }
        });
        $(this).find('.trigger').click(function(e){
          e.preventDefault();
          if( $(this).closest('.select-search').find('.select-search-sub').is(':visible') ){
            $(this).closest('.select-search').find('.select-search-sub').hide();
          }else{
            $(this).closest('.select-search').find('.select-search-sub input').val('');
            $(this).closest('.select-search').find('.select-search-sub ul li').show();
            $(this).closest('.select-search').find('.select-search-sub').show();
          }
        });

        $(this).find('.select-search-sub input').on('input', function() {
            let v = $(this).val().toLowerCase();
            console.log( v );
            $(this).closest('.select-search').find('.select-search-sub ul li').hide().filter(function() {
                let n = $(this).find("a").text().toLowerCase();
                return n.indexOf(v) > -1;
          }).fadeIn(200);
        });
      });
    };

    //event click j menu listener
    $(document).on("mousedown touchstart", function(e) {
        var dp = $('.select-search-sub:visible');
        if (!dp.is(e.target) && dp.has(e.target).length === 0) {
            $('.select-search-sub').hide();
        }
    });

    $(document).on('click','.select-search-sub ul li a',function(e){
        e.preventDefault();
        $(this).closest('.select-search').find('select option[value="'+$(this).attr('data-value')+'"]').prop('selected',true).closest('select').trigger('change');
        $(this).closest('.select-search').find('.trigger').text($(this).text());
        $(this).closest('.select-search-sub').hide();
      });
}