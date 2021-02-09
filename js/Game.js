//create table
function createtiles(numberoftiles){
    for(i=0; i<numberoftiles; i++){
        var tile = document.createElement('div')
        document.getElementById('Gamecon').appendChild(tile)
        tile.setAttribute('id', i)
        tile.setAttribute('class', 'tile')
        tilevalue(numberoftiles)
    }
}

function tilevalue(numberoftiles){
    for(i=0; i<numberoftiles; i++){
        var i = Array()
    }
}