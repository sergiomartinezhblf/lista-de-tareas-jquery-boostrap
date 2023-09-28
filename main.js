import { Tarea } from "./claseTarea.js"
let tareas = []
let id = 0
$(document).ready(()=>{
  
   $("#list-completadas").hide() 
   $("#list-pendientes").hide() 
   $("#list-canceladas").hide() 
   $("#list-tareas").empty()
   $("form").on("submit",(e)=>{
      e.preventDefault()
      let titulo = $("input").val()
      
      $("#list-tareas").show()
      $("#list-pendientes").hide()
      $("#list-completadas").hide() 
      $("#list-canceladas").hide()   
      id++
      let tarea = new Tarea(titulo,id,"activa")
      tarea.iniciarTarea()
      console.log(tarea)
      tareas = tarea.agregarALista(tareas)
      console.log(tareas)

      $("#list-tareas").append(`

      <li data-id="${tarea.id}" class="col-12 col-md-9 tarea-${tarea.id} bg-success-subtle bg-primary-subtle border border-success border-2 text-success mx-auto ">
          <div class="d-flex justify-content-between align-items-center">
          <div>
              <span class="fs-3 titulo-${tarea.id}">${tarea.id}- ${tarea.titulo}</span>
          </div>
          <div class="fs-2 d-flex">
              <span class="duracion-${tarea.id} pe-3"></span>
              <div class="btn-accion mx-1 check"><i class="bi bi-check-circle"></i></div>
              <div class="btn-accion mx-1 x"><i class="bi bi-x-circle"></i></div>
          </div>
          </div>     
      </li>

      `)
      $("input").val("")
      tarea.mostrarDuracion()

      $("ul").on("click",".bi-x-circle",(e)=>{
        let id_tarea = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id 
        let tarea_actual = tareas.find(el=>el.id==id_tarea)
        tarea_actual? (
            console.log(tarea_actual),
            tarea.eliminarTarea(tareas,tarea_actual),
            console.log(tareas)
        ):""
       })  

       $("ul").on("click",".bi-check-circle", (e)=>{
        let id_tarea = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
        console.log(id_tarea)
        let tarea_actual= tareas.find(el=>el.id==id_tarea)
        tarea_actual? tarea.completarTarea(tarea_actual) : ""       
      })
    
   })
    

   $("#btn-completadas").click(()=>{
      Tarea.mostrarCompletadas(tareas)
   })

   $("#btn-pendientes").click(()=>{
    Tarea.mostrarPendientes(tareas)
   })

   $("#btn-canceladas").click(()=>{
    Tarea.mostrarCanceladas(tareas)
   })

   $("#btn-todas").click(()=>{
    Tarea.mostrarTodas(tareas)
   })



})