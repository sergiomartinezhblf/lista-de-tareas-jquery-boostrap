export class Tarea{
    constructor(titulo,id,estado,tiempo_inicio,tiempo_final){
        this.titulo = titulo
        this.id = id
        this.estado = estado
        this.tiempo_inicio = tiempo_inicio
        this.tiempo_final = tiempo_final
        
    }
    
    iniciarTarea(){
       this.tiempo_inicio = Date.now()
    } 

    //METODO PARA MOSTRAR LA DURACIÓN CADA SEGUNDO
    mostrarDuracion(){
        let duracion  
        let interval_duracion = setInterval(()=>{
            duracion = Math.floor((Date.now()-this.tiempo_inicio)/1000)
        },1000)   

        //INTERVALO QUE AGREGA LAS CLASES PARA CAMBIAR LOS COLORES DE LAS TAREAS
        setInterval(()=>{
        $(`.duracion-${this.id}`).text(`${this.crono(duracion)}`)
        duracion>29? $(`.tarea-${this.id}`).addClass("bg-warning-subtle border-warning text-warning-emphasis") : ""
        duracion>59? $(`.tarea-${this.id}`).addClass("bg-danger-subtle border-danger text-danger").removeClass("text-warning-emphasis") : ""
        },1000)

        //FUNCION PARA DETENER LA DURACIÓN AL CLICK EN EL BOTON DE COMPLETAR TAREA
        $("ul").on("click",".bi-check-circle", (e)=>{
            let id_tarea = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
            this.id==id_tarea? clearInterval(interval_duracion) :""
        })

        //FUNCION PARA DETENER LA DURACIÓN AL CLICK EN EL BOTON DE CANCELAR TAREA
        $("ul").on("click",".bi-x-circle", (e)=>{
            let id_tarea = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id
            this.id==id_tarea? clearInterval(interval_duracion) :""
        })

    }

    //METODO PARA CONVERTIR LA DURACION A FORMATO DE TIEMPO
    crono(duracion){
        let seg,min,hrs
        hrs=parseInt((duracion/60)/60)
        //3600 son los segundos que tiene una hora
        let resto_hrs = duracion-(3600*hrs) 
        min=parseInt(resto_hrs/60)
        let resto_min = resto_hrs-(min*60)
        seg=resto_min
        if(seg<10) seg="0"+seg
        if(min<10) min="0"+min
        return `${hrs}:${min}:${seg}`
    }

    //METODO PARA AGREGAR LA TAREA AL ARRAY DE LA LISTA DE TAREAS
    agregarALista(tareas){
      tareas.push(this)
      return tareas
    }

    //METODO PARA CANCELAR LA TAREA
    eliminarTarea(tareas,tarea){
        /*Esto eliminaria la tarea pero lo que necesitamos es solo cambiar el estado a cancelada
        let indice_eliminar= tareas.indexOf(tarea)
        tareas.splice(indice_eliminar,1)*/
        tarea.estado="cancelada"
        tarea.tiempo_final=null
        console.log(tarea)
        $(`li.tarea-${tarea.id}`).hide()
       
        
    }

    //METODO PARA COMPLETAR LAS TAREAS 
    completarTarea(tarea){
        tarea.estado="completada"
        tarea.tiempo_final= Date.now()
        $(`span.titulo-${tarea.id}`).addClass("completada")
      }
    
      //METODO PARA MOSTRAR TODAS LAS TAREAS
      static mostrarTodas(){
        $("#titulo_tareas").text("Todas las Tareas")  
        $("#list-tareas").show()
        $("#list-completadas").hide()
        $("#list-pendientes").hide() 
        $("#list-canceladas").hide()
      }
    
      //METODO PARA MOSTRAR LAS TAREAS COMPLETADAS
      static mostrarCompletadas(tareas){
       let tareas_completadas= tareas.filter(el=>el.estado=="completada")
       console.log(tareas_completadas)
       $("#titulo_tareas").text("Tareas Completadas")
       $("#list-completadas").show()
       $("#list-completadas").empty()
       $("#list-tareas").hide()
       $("#list-pendientes").hide() 
       $("#list-canceladas").hide() 
       if(tareas_completadas.length==0) 
         $("#list-completadas").append(`<li class="fs-3">No hay tareas completadas</li>`)
       $.each(tareas_completadas,(index,el)=>{
          console.log(index,el.titulo)
          $("#list-completadas").append(`
            <li data-id="${el.id}" class="col-12 col-md-9 tarea-${el.id} bg-success-subtle bg-primary-subtle border border-success border-2 text-success mx-auto ">
          <div class="d-flex justify-content-between align-items-center">
          <div>
              <span class="fs-3 titulo-${el.id} completada">${el.id}- ${el.titulo}</span>
          </div>
          <div class="fs-2 d-flex">
              <span class="duracion-${el.id} pe-3"></span>
              <div class="btn-accion mx-1"><i class="bi bi-check-circle"></i></div>
              <div class="btn-accion mx-1"><i class="bi bi-x-circle"></i></div>
          </div>
          </div>     
      </li>`
          )
        
       })
      }

      //METODO PARA MOSTRAR LAS TAREAS PENDENTES
      static mostrarPendientes(tareas){
        let tareas_pendientes= tareas.filter(el=>el.estado=="activa")
        console.log(tareas_pendientes)
        $("#titulo_tareas").text("Tareas Pendientes")
        $("#list-pendientes").show()
        $("#list-pendientes").empty()
        $("#list-tareas").hide()
        $("#list-completadas").hide() 
        $("#list-canceladas").hide() 
        if(tareas_pendientes.length==0) $("#list-pendientes").append(`<li class="fs-3">No hay tareas pendientes</li>`)
        $.each(tareas_pendientes,(index,el)=>{
           console.log(index,el.titulo)
           $("#list-pendientes").append(`
             <li data-id="${el.id}" class="col-12 col-md-9 tarea-${el.id} bg-success-subtle bg-primary-subtle border border-success border-2 text-success mx-auto ">
           <div class="d-flex justify-content-between align-items-center">
           <div>
               <span class="fs-3 titulo-${el.id}">${el.id}- ${el.titulo}</span>
           </div>
           <div class="fs-2 d-flex">
               <span class="duracion-${el.id} pe-3"></span>
               <div class="btn-accion mx-1"><i class="bi bi-check-circle"></i></div>
               <div class="btn-accion mx-1"><i class="bi bi-x-circle"></i></div>
           </div>
           </div>     
       </li>`
           )                      
        })
        
      }

      //METODO PARA MOSTRAR LAS TAREAS CANCELADAS
      static mostrarCanceladas(tareas){
        let tareas_canceladas= tareas.filter(el=>el.estado=="cancelada")
        console.log(tareas_canceladas)
        $("#titulo_tareas").text("Tareas Canceladas")
        $("#list-canceladas").show()
        $("#list-canceladas").empty()
        $("#list-tareas").hide()
        $("#list-completadas").hide() 
        $("#list-pendientes").hide() 
        if(tareas_canceladas.length==0) $("#list-canceladas").append(`<li class="fs-3">No hay tareas canceladas</li>`)
        $.each(tareas_canceladas,(index,el)=>{
           console.log(index,el.titulo)
           $("#list-canceladas").append(`
             <li data-id="${el.id}" class="col-12 col-md-9 tarea-${el.id} bg-success-subtle bg-primary-subtle border border-success border-2 text-success mx-auto ">
           <div class="d-flex justify-content-between align-items-center">
           <div>
               <span class="fs-3 titulo-${el.id}">${el.id}- ${el.titulo}</span>
           </div>
           <div class="fs-2 d-flex">
               <span class="duracion-${el.id} pe-3"></span>
               <div class="btn-accion mx-1"><i class="bi bi-check-circle"></i></div>
               <div class="btn-accion mx-1"><i class="bi bi-x-circle"></i></div>
           </div>
           </div>     
       </li>`
           )   
        })

      }
}