
function init(){
  var dropDown = d3.select("#selDataset");

  d3.json("samples.json").then(function(data) {
      console.log(data);

      data.names.forEach(function(name){
        dropDown.append("option").text(name).property("value");
      })

  });
}

function optionChanged(id){
  plotInfo(id);
  getInfo(id);
}


function getInfo(id){
  d3.json("samples.json").then(function(data){
    var selectedID = data.metadata.filter(person => person.id == id)[0];
    //console.log(selectedID);
    var personID = selectedID.id.toString();
    var ethnicity = selectedID.ethnicity;
    var gender = selectedID.gender;
    var age = selectedID.age;
    var location = selectedID.location;
    var bbType = selectedID.bbType;
    var wFreq = selectedID.wfreq;
    //console.log(personID);
    //var str = "";
    //Object.entries(selectedID).forEach(([key,value]) => {
    //    str += `<br>${key}:${value}</br>`;
    //});
    console.log(personID);
    //return personID;

    var demographicInfo = d3.select("#sample-metadata");
      demographicInfo.html("");
      Object.entries(selectedID).forEach(([key, value]) => {   
        demographicInfo.append("h5").text(`${key}: ${value}`);  
        //console.log();  
      });
  }) 
} 

function plotInfo(id){
  d3.json("samples.json").then(function(data) {
    var sampleData = data.samples.filter(sample => sample.id.toString()===id)[0];
    console.log(sampleData);

    var sValues = sampleData.sample_values.slice(0,10).reverse();
    var sOTUID = sampleData.otu_ids.slice(0,10).reverse();
    var OTU_id = sOTUID.map(s => "OTU " + s);
    var labels = sampleData.otu_labels.slice(0,10).reverse();
    

    var trace1 = {
      x: sValues,
      y: OTU_id,
      type: "bar",
      orientation: "h",
      text: labels
    }

    var trace2 = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids
      },
      text: sampleData.otu_labels

    }

    var layout1 = {
      title: `"Top 10 OTU for ${id}"`
    }
    
    

    var layout2 = {
      xaxis: {title: "OTU ID"}
    }
    
    
    var data1 = [trace1];
    var data2 = [trace2];

    Plotly.newPlot("bar", data1, layout1);

    Plotly.newPlot("bubble", data2, layout2);
});
}
init();
