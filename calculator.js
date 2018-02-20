var $k = jQuery.noConflict();

$k(document).ready(function(){
	
	


$k("div#container_graph_res").hide();
$k("div#container_graph_avg_res").hide();

     var surface_area;
     var building_height;

     var electric_price;
     var district_heating_price;
     var oil_price;

     var indoor_temp;

     var bulding_type_default_val=1;
     var heating_type_default_val=2;

    $k("#div_electric_price").show();   
    $k("#div_heating_price").hide();
    $k("#div_oil_price").hide(); 


    $k("input[id=building_type][value="+bulding_type_default_val+"]").prop('checked', true);
    $k("input[id=heating_type][value="+heating_type_default_val+"]").prop('checked', true);

    heating_type=$k("input[type='radio'][id^='heating_type']:checked").val(); 
    building_type=$k("input[type='radio'][id^='building_type']:checked").val();

 
                    $k("#slider-temp").slider({
                    // range: "min",
                    value: 10,
                    min: 1,
                    max: 30,
                    slide: function (event, ui) {
                    $k("#input_temp").val(ui.value);
                    },
                    change: function () { 
                    calculate();                 
                    }
                    });
                    $k("#input_temp").val($k("#slider-temp").slider("value"));                  



                    $k("#slider-indoor-temp").slider({                    
                    value: 20,
                    min: 10,
                    max: 22,
                    slide: function (event, ui) {
                    $k("#input_indoor_temp").val(ui.value);
                    },
                    change: function () {
                    calculate();
                    }
                    });
                    $k("#input_indoor_temp").val($k("#slider-indoor-temp").slider("value"));
                    calculate();
   }

   });










function calculate(){

 avg_temp=$k("#input_temp").val();
 surface_area=$k("#input_surface").val();
 building_height=$k("#input_height").val();
 electric_price=$k("#input_electric_price").val();
 district_heating_price=$k("#input_heating_price").val();
 oil_price=$k("#input_oil_price").val();
 indoor_temp=$k("#input_indoor_temp").val();


 $k.ajax
    ({ 

      url: "http://localhost/test/innenco_new2/calculation/calculate.php",
      type: "POST",
      data: {building_type_val:building_type,heating_type_val:heating_type,avg_temp_val:avg_temp,surface_area_val:surface_area,building_height_val:building_height,electric_price_val:electric_price,district_heating_price_val:district_heating_price,oil_price_val:oil_price,indoor_temp_val:indoor_temp}, 
     
        success: function(str)
        {    

if(check_for_number(str)){ 


 var concat_res=str+'%';
$k("#calc_res_1").val(concat_res);
$k('#result_div_2').load(self);
$k('#result_div_2').load(self);


$k("div#container_graph").hide();
$k("div#container_graph_res").show();

cks_summary=$k.cookie("cks_summary");
cks_varme=$k.cookie("cks_varme");


cks_summary=cks_summary.replace(/\[|\]/g, "");
cks_varme=cks_varme.replace(/\[|\]/g, "");

 
cks_summary=JSON.parse("["+cks_summary+"]");
cks_varme=JSON.parse("["+cks_varme+"]");


var calculator_result = [ 
              { "name"  : "Traditional", "data" : cks_summary },
              { "name"  : "Innenco", "data" : cks_varme }             
]     


Highcharts.setOptions({
    colors: ['#008CCE', '#1C191B']
});

Highcharts.chart('container_graph_res', {
    
    chart: {      
        type: 'column'
    },
    title: {
        text: '<span style="font-size:1em;color:#2D7CB6;font-weight:700;">COST ANALYSIS</span>'
    },
    subtitle: {
        text: ''
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: calculator_result
});

/* Container Avg graph  */


$k("div#container_graph_avg").hide();
$k("div#container_graph_avg_res").show();


cks_summary_avg=$k.cookie("cks_summary_avg");
cks_varme_avg=$k.cookie("cks_varme_avg");

cks_summary_avg=JSON.parse("["+cks_summary_avg+"]");
cks_varme_avg=JSON.parse("["+cks_varme_avg+"]");


var calculator_avg_result = [ 
              { "name"  : "Traditional", "data" : cks_summary_avg },
              { "name"  : "Innenco", "data" : cks_varme_avg }             
]     


Highcharts.setOptions({
    colors: ['#008CCE', '#1C191B']
});


Highcharts.chart('container_graph_avg_res', {
   chart: {
        type: 'column',
         inverted: true
    },
    title: {
        text: '<span style="font-size:1em;color:#2D7CB6;font-weight:700;">HEATING ENERGY USE</span><br /><span style="font-size:0.7em;color:#2D7CB6;font-weight:700;">(Excluding hot water)</span>'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            ''            
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    credits: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} kWh/m<sup>2</sup></b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: calculator_avg_result
});


} 

    }  // if ends 
    });  //  ajax ends 


     }
	 
	 
	



});
