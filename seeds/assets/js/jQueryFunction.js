$(document).ready(function (){
    var jData = {}
    $("#insertButton").click(function() {
        jData.sName = $("#sName").val();
        jData.sModel = $("#sModel").val();
        jData.sBrand = $("#sBrand").val();
        jData.sConnectorType = $("#sConnectorType").val();
        jData.sMicrophone = $("#sMicrophone").val();
        jData.sColor = $("#sColor").val();
        jData.nWeight = $("#nWeight").val();
        jData.nPrice = $("#nPrice").val();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(jData),
            url: "/api/v1/audioServices/insertAudioDevice"
        })
        .done(function(data, textStatus, jqXHR){ 
            alert("Success: " + textStatus); 
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            alert("Error while inserting the record");
        });
    });
});

// action="/api/v1/audioServices/insertAudioDevice" method="POST"
