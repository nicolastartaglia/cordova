/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);



function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

$(document).ready(function(){
    $('.sidenav').sidenav();
});

var app = new function() {
    
    this.el = document.getElementById('countries');
    this.countries = [];

    // compte le nombre d'éléments d'un tableau
    this.count = function(data)  {
        var el = document.getElementById('counter');
        if (data > 1) {
            el.innerHTML = data + " countries";
        } else if (data == 0) {
            el.innerHTML = "No country";
        } else {
            el.innerHTML = data + " country";
        }
    }

    // afficher tous les pays
    this.fetchAll = function() {
        var data = '';
        for (var i=0 ; i < this.countries.length ; i++){
            data += '<tr>';
            data += '<td><div class="contenu">' + this.countries[i] + '</div></td>';
            data += '<td><div class="contenu"><button class="btn waves-effect waves-light indigo darken-4" onclick="app.edit('+i+')">Edit</button></div></td>';
            data += '<td><div class="contenu"><button class="btn waves-effect waves-light indigo darken-4" onclick="app.delete('+i+')">Delete</button></div></td>';
            data += '</tr>';
        }
        this.count(this.countries.length);
        if (this.countries.length == 0){
            return this.el.innerHTML = "Insérez un pays";
        } else {
            return this.el.innerHTML = data;
        }
    }

    // ajouter un élément au tableau
    this.add = function() {
        var el = document.getElementById('add-name');
        var country = el.value;
        if (country) {
            this.countries.push(country.trim());
            el.value = '';
            this.fetchAll();
        }

    }

    // mise à jour d'un élément
    this.edit = function(item) {
        var el = document.getElementById('edit-name');
        el.value = this.countries[item];
        document.getElementById("spoiler").style.display = "block";

        var self = this;
        document.getElementById("saveEdit").onsubmit = function() {
            var country = el.value;
            if (country) {
                self.countries.splice(item, 1, country.trim());
                self.fetchAll();
                closeInput();
            }
        }
    }

    // supprimer un élément du tableau
    this.delete = function(item) {
        this.countries.splice(item, 1);
        this.fetchAll();
    }
}

app.fetchAll();

function closeInput() {
    document.getElementById("spoiler").style.display = "none";
}