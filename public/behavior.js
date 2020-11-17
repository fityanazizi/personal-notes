$(document).ready(function(){
    let idUpdate = "";
    //note input
    $('#input').hide();
    $('#updateInput').hide();
    $('#showInput').click(function(){
        $('#input').show();
        $('#showInput').hide();
    });
    //ajax
    //display all notes
    $.get('/notes', function(data, status){
        $(data.rows).each(function(i, val){
            let contents = 
                '<div class="card mt-1">'+
                    '<div class="row">'+
                        '<div class="col-onefive" style="word-wrap: break-word; padding:0 5px;">'+
                            '<h2>'+val.Title+'</h2>'+
                            '<p>'+val.Content+'</p>'+
                        '</div>'+
                        '<div class="col-5 mt-1 mb-1" style="padding:0 5px;">'+
    '<button class="button-blue full" id="update'+val.Note_ID+'"'+' style="display: inline-block; margin:2px">Update</button>'+
    '<button class="button-red full" id="delete'+val.Note_ID+'"'+' style="display: inline-block; margin:2px">Delete</button>';+
                        '</div>'+
                    '</div>'+
                '</div>'
            $('#notes').append(contents);
        });
    });
    //post note
    $('#createNote').click(function(){
        /*
        $.post('/create',
            {
                Title: $('#title').val().toString(),
                Content: $('#content').val().toString()
            }
        );*/
        $.ajax({
            url: '/create',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "Title": $('#title').val().toString(),
                "Content": $('#content').val().toString()
            }),
            success: function(){
                $('#notes').empty();
                $.get('/notes', function(data, status){
                    $(data.rows).each(function(i, val){
                        let contents = 
                '<div class="card mt-1">'+
                    '<div class="row">'+
                        '<div class="col-onefive" style="word-wrap: break-word; padding:0 5px;">'+
                            '<h2>'+val.Title+'</h2>'+
                            '<p>'+val.Content+'</p>'+
                        '</div>'+
                        '<div class="col-5 mt-1 mb-1" style="padding:0 5px;">'+
    '<button class="button-blue full" id="update'+val.Note_ID+'"'+' style="display: inline-block; margin:2px;">Update</button>'+
    '<button class="button-red full" id="delete'+val.Note_ID+'"'+' style="display: inline-block; margin:2px;">Delete</button>';+
                        '</div>'+
                    '</div>'+
                '</div>'
            $('#notes').append(contents);
                    });
                });
                $('#input').hide();
                $('#showInput').show();
            }
        });
    });
    $(document).on('click', 'button', function(){
        let idStr = $(this).attr('id').toString();
        //delete
        let idDelete = idStr.substr(6);
        if(idStr.includes('delete')){
            alert(`deleted`);
            $.ajax({
                url: '/delete/'+idDelete,
                type: 'POST',
                //contentType: 'application/json',
                success: function(){
                    $('#notes').empty();
                    $.get('/notes', function(data, status){
                        $(data.rows).each(function(i, val){
                            let contents = 
                    '<div class="card mt-1">'+
                        '<div class="row">'+
                            '<div class="col-onefive" style="word-wrap: break-word; padding:0 5px;">'+
                                '<h2>'+val.Title+'</h2>'+
                                '<p>'+val.Content+'</p>'+
                            '</div>'+
                            '<div class="col-5 mt-1 mb-1" style="padding:0 5px;">'+
        '<button class="button-blue full" id="update'+val.Note_ID+'"'+' style="display: inline-block; margin: 2px;">Update</button>'+
        '<button class="button-red full" id="delete'+val.Note_ID+'"'+' style="display: inline-block; margin: 2px;">Delete</button>';+
                            '</div>'+
                        '</div>'+
                    '</div>'
                $('#notes').append(contents);
                        });
                    });
                }
            });
        }else{
            //update
            idUpdate = idStr.substr(6);
            $('#showInput').hide();
            $('#input').show();
            $('#input').find('#createNote').hide();
            $('#updateInput').show();
        }
        
    });
    $('#updateInput').click(function(){
        $.ajax({
            url: '/edit/'+idUpdate,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "Title": $('#title').val().toString(),
                "Content": $('#content').val().toString()
            }),
            success: function(){
                $('#notes').empty();
                $.get('/notes', function(data, status){
                    $(data.rows).each(function(i, val){
                        let contents = 
                '<div class="card mt-1">'+
                    '<div class="row">'+
                        '<div class="col-onefive" style="word-wrap: break-word;">'+
                            '<h2>'+val.Title+'</h2>'+
                            '<p>'+val.Content+'</p>'+
                        '</div>'+
                        '<div class="col-5 mt-1 mb-1">'+
    '<button class="button-blue" id="update'+val.Note_ID+'"'+' style="display: inline-block; margin:0 2px;">Update</button>'+
    '<button class="button-red" id="delete'+val.Note_ID+'"'+' style="display: inline-block; margin:0 2px;">Delete</button>';+
                        '</div>'+
                    '</div>'+
                '</div>'
            $('#notes').append(contents);
                    });
                });
                $('#showInput').show();
                $('#input').hide();
                $('#updateInput').hide()
            }
        });
    });
    /*
    $('button').click(function(){
        let idDelete = $(this).attr('id');
        
        /*
        $.ajax({
            url: '/delete/'+$(idDelete).val().toString(),
            type: 'POST',
            //contentType: 'application/json',
            success: function(){
                $('#notes').empty();
                $.get('/notes', function(data, status){
                    $(data.rows).each(function(i, val){
                        $('#notes').append('<h2>'+val.Title+'</h2>'+
                            '<p>'+val.Content+'</p>'+
                            '<button class="button-red" id='+val.Note_ID+'>Delete</button>');
                    });
                });
            }
        });*/
    //});
});