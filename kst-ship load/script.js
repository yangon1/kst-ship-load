window.onload = function () { 
    //Check the support for the File API support 
    if (window.File && window.FileReader && window.FileList && window.Blob) {
 	
        var fileSelected = document.getElementById('txtfiletoread');
     	fileSelected.addEventListener('change', function (e) { 
            //Get the file object 
            var fileTobeRead = fileSelected.files[0];
            //Initialize the FileReader object to read the file 
            var fileReader = new FileReader(); 
            
            fileReader.onload = function (e) { 
                // console.log(fileReader);
                var strSplit = fileReader.result.split(/n| /);
                console.log(strSplit);
                for ( var i in strSplit ) {
                    // console.log(i);
                    var tmp = document.getElementById(i);
                    tmp.innerText = strSplit[i];
                }
            } 
            
            fileReader.readAsText(fileTobeRead); 

        }, false);
    } 
    else { 
        alert("Files are not supported"); 
    } 
}