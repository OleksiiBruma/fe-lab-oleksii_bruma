'use strict';


var body = document.querySelectorAll('html body');
var checkbox = document.getElementById('details_block');

$(function () {
    var open_details =function open_detailsFunction(){
        var temporary = $(body).find('.form-holderArea .formMain #details_block');
        temporary.after("<div class=\"details\" id=\"details\"><p><textarea style=width:493px; id=\"txtArea\"></textarea></p></div>");
        $(body).find('.form-holderArea .formMain #txtArea').css('width: 420px');
        $('#txtArea').height('80px')
        $('#txtArea').css('max-height', '100px');
        $('#txtArea').css('max-width', '493px')
        $('#txtArea').css('min-width', '493px');
    }

    //
    checkbox.checked= false;

    function is_checkbox_clicked  (){
        if($('#details_block').is(':checked')){ open_details();}
        else {
            var k = document.getElementsByClassName('details');
            $(k).remove();
        }
    }

    $('#name').on('change', function( ){
    if ($('#name').val().length < 3){
            $('#name').addClass('error');
        }else {
            $('#name').removeClass('error');
        }
    });

    $('#second_name').on('change',function() {
        if ($('#second_name').val().length < 3) {
            $('#second_name').addClass('error');
        } else{
            $('#second_name').removeClass('error');
        }
    });


    $('.SubmitButton').click(function( e ) {

        e.preventDefault();

        if($('#name').val().length < 3){
            $('#name').addClass('error');
        }else {
            $('#name').removeClass('error');}

        if  ( $('#second_name').val().length < 3){
            $('#second_name').addClass('error');
        } else{
            $('#second_name').removeClass('error');
        }

        if($('#name').val().length >= 3 && $('#second_name').val().length >= 3){

            $('body').append('<div class="success-PopUpOverlay" id=\"success-PopUpOverlay\"></div><div class="successHolder"><span></span>thanks for your request!</div>');
            $('body').find('.successHolder').append('<button>Close</button>');
            $('body').find('.successHolder > span').html($('#name').val() + ',<br><br>');


            initializeClose_button();
            var css_properties ={"width": "200px", "position": "absolute", "height": "100px", "background": "white"}

            $('.successHolder').css(css_properties);


        }
    });

    /* initializing close button*/
    function initializeClose_button(){
        $('html body .successHolder button').click(function(){
            $('#success-PopUpOverlay').remove();
            $('.successHolder').remove();
        });
    };

    $('#details_block').on('click', is_checkbox_clicked);

});
