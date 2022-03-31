var app = new function (){ 
    this.el=document.getElementById('offres');
    this.offres=[];

    //Le READ
    this.FetchAll = function(){
        var data='';

        if (this.offres.length > 0){
            for(i=0; i < this.offres.length; i++){
                data+='<tr>';
                data+='<td>'+(i+1)+'. '+this.offres[i].substring(0,20)+ '(...)</td>';
                data+='<td><button onclick="app.Edit('+i+')"class="btn btn-warning">Edit</button></td> ';
                data+='<td><button onclick="app.Delete('+i+')"class="btn btn-danger">Delete</button></td> ';
                data+='<td class="skills">'+this.Search(i)+'</td>';
                data+='</tr>'
            }
        }
        this.Count(this.offres.length);
        return this.el.innerHTML = data; 
    };
    //Le CREATE/ADD
    this.Add = function (){
        el = document.getElementById('add-offres');
        var offre = el.value;
        if (offre){
            this.offres.push(offre.trim());
            el.value='';
            this.FetchAll();
        }

    };
    //Le EDIT
    this.Edit = function(item){
  
        var el = document.getElementById('edit-offres');
        el.value = this.offres[item]
        document.getElementById('edit-box').style.display = 'block';
        self=this;

        document.getElementById('save-edit').onsubmit = function (){
            var offre = el.value;
            console.log(offre);
            if(offre){
                self.offres.splice(item, 1, offre.trim());
                self.FetchAll();
                CloseInput();
                console.log(self.offres[item]);
                console.log(self.offres);
            }
        }

                
    };
    //Le DELETE
    this.Delete= function (item){
        this.offres.splice(item,1)
        this.FetchAll();
        console.log(this.offres);
    };
    //Pour compter
    this.Count = function(data){
        var el=document.getElementById('counter');
        var name = 'Offres';
        if(data){
            if(data ==1){
                name = 'Offre';
            }
            el.innerHTML = data+ ' '+name;
        }
        else{
            el.innerHTML= "Pas des "+ name;
        }
    };

    //Resume des competences
    this.Search = function(item){ 
    var list =  ['react', 'php', 'node','sql', 'html', 'java'];
    string = this.offres[item];
    console.log(string);
    var res =  list
        // .map((skill)=> string.toLowerCase().includes(skill) ? skill : '')
        .map((skill)=> string.toLowerCase().match(skill))
        // .filter(x => x !== '');
        .filter(x => x !== null)
        .join(', ');
    console.log(res);
    return res;

}


    

}

app.FetchAll();


function CloseInput(){
    document.getElementById('edit-box').style.display = 'none';
}

