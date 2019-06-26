const fs = require('fs')
const opciones = require('./opciones')
const cursos = require('./cursos')
const yargs = require('yargs')
const argv = yargs
            .command('inscribir','Inscripcion a un curso de extension',opciones)
            .argv

const comandos = argv._
//Express
const express = require('express')
const app = express()
let textoServer= ''
let texto = ''

app.get('/', function (req, res) {
    res.send(textoServer)
})

app.listen(3000)

let imprimirCursos=()=>{
    texto = 'Cursos de Extension'
    textoServer +='<br>'+texto
    console.log(texto)
    for(let i=0; i<cursos.length; i++){
        setTimeout(function() { 
            imprimirCurso(cursos[i],i)
        }
        ,2000*(i+1));
    }
}

let imprimirCurso= (curso, index)=>{
    let {id,nombre,duracion,valor} =curso
    texto = (index+1)+'. El curso "'+nombre+'" tiene duracion de '+
            duracion+' horas, vale $'+valor+' pesos y su id es '+id+'.'
    console.log(texto)
    textoServer += '<br>'+texto
}

let crearArchivo=(curso,nombre,cedula)=>{
    let {duracion, valor, id} = curso
    texto = 'El estudiate: '+nombre+' con cedula: '+cedula+
                '\nse ha matriculado en el curso '+curso.nombre+
                '\ncon duracion de '+duracion+' horas, con valor'+
                '\n$'+valor+' pesos y id es '+id+'.'
    textoServer += '<br>'+texto
    
    fs.writeFile('matricula.txt',texto,(err)=>{
        if(err) throw err
        texto ='Se ha creado el Archivo de Matricula'
        console.log(texto)
        textoServer += '<br>'+texto
    })
}

let inscripcion =  () =>{
    let {id, nombre, cedula } = argv
    let bool = cursos.some((e)=>e.id==id)
    if(bool){
        let curso = cursos.find((e)=>{if(e.id == id)return e})
        crearArchivo(curso,nombre,cedula)
    }else{
        texto ='¡Este curso no existe!'
        console.log(texto)
        textoServer += '<br>'+texto
        imprimirCursos()
    }
}

if(comandos.includes('inscribir')){
    inscripcion()
}else{
    imprimirCursos()
}

