import './style.scss';

if ('undefined' != typeof window.jQuery ) {

    $.fn.jselect_search = function ( options ) {
      let settings = $.extend({
            placeholder : 'Search here',
            fillable : false,
            searchable : true,
            on_top_edge : false,
            on_bottom_edge : false,
            on_change : false,
            }, options );

      let debounce = function(func, wait, immediate) {

        var timeout;

        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
      }

      return $(this).each(function(){
        let placeholder = ( typeof $(this).attr('data-placeholder')  != 'undefined' ?  $(this).attr('data-placeholder') : settings.placeholder );
        $(this).addClass('select-search')
          .append( `<a href="#" class="trigger"></a>
            <div class="sub-wrapper"><div class="select-search-sub">
              ${( settings.searchable ? '<input class="select-search-input" type="text" placeholder="'+placeholder+'" name="select_search_'+$(this).index()+'">' : '')}
              <ul></ul>
            <div></div>`).find('.select-search-sub ul').on('scroll',function(){
              //visible height + pixel scrolled = total height 
              if( this.offsetHeight + this.scrollTop == this.scrollHeight){
                if( settings.on_bottom_edge && typeof settings.on_bottom_edge == 'function' ){
                  settings.on_bottom_edge(this);
                }
              }

              if( this.scrollTop == 0 ){
                if( settings.on_top_edge && typeof settings.on_top_edge == 'function' ){
                  settings.on_top_edge(this);
                } 
              }
            });

        let _default_text = $(this).find('select option:selected').text();

        $(this).find('.trigger').text(_default_text);

        $(this).find('select option').each(function(){
          if( $(this).val() != '' ){
            $(this).closest('.select-search').find('.select-search-sub ul').append('<li><a href="#" data-value="'+$(this).val()+'">'+$(this).text()+'</a></li>');
          }
        });
        $(this).find('.trigger').on('click',function(e){
          e.preventDefault();
          if( $(this).closest('.select-search').hasClass('active') ){
            $(this).closest('.select-search').removeClass('active');
          }else{
            $(this).closest('.select-search').find('.select-search-sub li').show();
            $(this).closest('.select-search').addClass('active').find('.select-search-sub input').val('');
            
          }
        });

        $(this).find('select').on('change',function(){
          if( settings.on_change && typeof settings.on_change == 'function' ){
            settings.on_change($(this));
          }
        });

        $(this).find('.select-search-sub input').on('input', debounce( function(){
          if( settings.searchable && typeof settings.searchable != 'function' ){
            let v = $(this).val().toLowerCase();
            $(this).closest('.select-search').find('.select-search-sub ul li').hide().filter(function() {
                  let n = $(this).find("a").text().toLowerCase();
                  return n.indexOf(v) > -1;
            }).fadeIn(200);
          }

          if( settings.searchable && typeof settings.searchable == 'function' ){
            settings.searchable($(this).val());
          }
        },500));

        $(this).find('.select-search-sub input').on('keydown',function(e){
          if ( (e.keyCode == 32 || e.which == 13 || e.keyCode == 13 ) && settings.fillable ) {
            $(this).closest('.select-search').find('.trigger').text($(this).val());
            $(this).closest('.select-search').find('.select-search-sub ul').append('<li><a href="#" data-value="'+$(this).val()+'">'+$(this).val()+'</a></li>');
            $(this).closest('.select-search').find('select').append('<option value="'+$(this).val()+'">'+$(this).val()+'</option>').val($(this).val());
            $('.select-search.active').removeClass('active')
          }
        });
      });
    };

    //event click j menu listener
    $(document).on("mousedown touchstart", function(e) {
        var dp = $('.select-search-sub:visible,.clear-btn,.trigger');
        if (!dp.is(e.target) && dp.has(e.target).length === 0) {
          $('.select-search.active').removeClass('active')
        }
    });


    $(document).on('click','.select-search-sub ul li a',function(e){
      e.preventDefault();
      $(this).closest('.select-search').find('select option[value="'+$(this).attr('data-value')+'"]').prop('selected',true).closest('select').trigger('change');
      $('.select-search.active').removeClass('active')
      .find('.trigger').html('<span class="clear-btn"></span> '+$(this).text()).find('span.clear-btn').on('click',function(e){
        e.stopPropagation();
        $(this).closest('.select-search').find('select').val('');
        $(this).closest('.trigger').html( $(this).closest('.select-search').find('select option[value=""]').text());
      });
    });
}