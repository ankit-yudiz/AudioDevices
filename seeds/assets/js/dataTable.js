$(document).ready(function () {
    $('#deviceTable').DataTable({
        "paging": true,
        "pageLength": 10,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "type": "POST",
            "url": "/api/v1/audioServices/devicePagination"
        },
        "columns": [{
            "data": "_id"
        }, {
            "data": "sName"
        }, {
            "data": "sModel"
        }, {
            "data": "sBrand"
        }, {
            "data": "sMicrophone"
        }, {
            "data": "sColor"
        }, {
            "data": "nItem_wgt"
        }, {
            "data": "nPrice"
        }]
    });
});
