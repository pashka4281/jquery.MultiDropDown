//MultiDD v1.0 2011
//by Paul Ser -- paul.work4281@gmail.com

(function($) {

    // Add .multiDropdown() function
    $.fn.multiDropdown = function (settings) {
        if( settings.items == undefined ) //items = [{name: 'test', val: 1}, {name: 'test2', val: 0}]
            throw '"items" parameter is not defined!'
        if( settings.current_items == undefined ) //current_items = "sales,pricing,checkout"
            throw '"current_items" parameter is not defined!'

        //
        // Variables
        //
        var current_items = []
        var input_name  = this.attr('name');
        var input_id    = this.attr('id');

        var wrapper     = $('<div class="multiDropdown-wrapper"></div>');
        var new_input   = $('<div id="'+ input_id + '-multiDropdown" class="multiDrop"  > </div>').appendTo(wrapper);
        
        var hidden      = $('<input type="hidden" name="'+input_name+'" value="" >').appendTo(new_input);

        var selected_items_area     = $('<div class="multiDropdown-selected-items-container">').appendTo(new_input);
        var selected_items_counter  = $('<span class="multiDropdown-selected-items-counter">').appendTo(selected_items_area).hide();
        var selected_items_list     = $('<ul class="multiDropdown-selected-items"></ul>').appendTo(selected_items_area);
        var dropArea                = $('<div class="multiDropdown-items-list-container"></div>').appendTo(wrapper);
        var drop_list               = $('<ul></ul>').appendTo(dropArea);
        

        $(settings.items).each(function(i, v){
            var curr_items = settings.current_items.split(',');
            var active = $.inArray(v.name, curr_items) != -1;
            $('<li '+(v.active ? 'class="selected"':"")+'><input type="checkbox" '+(active ? "checked":"")+'></input><span>'+v.name+'</span></li>').
            appendTo(drop_list);
            if(active)
                current_items.push(v.name);
        });
        
        var checkboxes = drop_list.find('input:checkbox');

        //
        // Events
        //
        checkboxes.click(function(){
            var tmp = [];
            if($(this).attr('checked') != undefined)
                $(this).parent().addClass('selected');    
            else
                $(this).parent().removeClass('selected');
            
            $(checkboxes).each(function(i,v){
                if($(v).attr('checked') != undefined)
                    tmp.push($(v).parent().find('span').html());
            });
            current_items = tmp;
            refresh_selected_items();
            setCounterValue(current_items.length);
        });

        new_input.click(function(){
            dropArea.toggleClass('collapsed');
            selected_items_counter.toggle();
            selected_items_list.toggle();
        });

        $('body').click(function(e){
            if( !$(e.target).parents().hasClass('multiDropdown-wrapper') ){
                dropArea.removeClass('collapsed');
                selected_items_counter.hide();
                selected_items_list.show();
            }
        });

        
        function refresh_selected_items(){
            selected_items_list.html('');
            $.each(current_items, function(i, v){
                $('<li id="'+v+'">'+v+'</li>').appendTo(selected_items_list);
            });
            hidden.val(current_items.join());
        }

        function setCounterValue(val){
            selected_items_counter.html(val.toString() + ' Tags selected' );
        }


        refresh_selected_items();
        this.replaceWith(wrapper);
        setCounterValue(current_items.length);
        return new_input;
    };
})(jQuery);
