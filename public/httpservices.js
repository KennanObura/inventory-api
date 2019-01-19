$('#confirm-delete').on('click', '.btn-ok', function (e) {

    var $modalDiv = $(e.delegateTarget);
    var id = $(this).data('itemid');

    console.log($(this))

    $modalDiv.addClass('loading');
    $.ajax({
        url: '/product/3',
        type: 'DELETE',
        success: function (result) {
            // Do something with the result
            $modalDiv.modal('hide').removeClass('loading');
        }
    })


});

// Bind to modal opening to set necessary data properties to be used to make request
$('#confirm-delete').on('show.bs.modal', function (e) {
    var data = $(e.relatedTarget).data();
    $('.title', this).text(data.recordTitle);
    $('.btn-ok', this).data('recordId', data.recordId);
});