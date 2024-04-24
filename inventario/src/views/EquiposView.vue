<template>
  <v-container>
    <v-row class="text-center">
      <br />
      <br />

      <v-col cols="12" class="align-content-center">
        <h1>Captura de Inventario</h1>
        <br />
      </v-col>
      <v-col cols="12">
        <v-row justify="center" align="center">
          <!--Botones de capturas-->
          <v-col cols="auto">
            <v-dialog v-model="dialog" persistent max-width="1200px">
              <template v-slot:activator="{ on }">
                <v-btn class="me-2 text-none  mb-2" color="success" dark v-on="on" variant="flat">
                  <v-icon class="mr-3">mdi-desktop-tower-monitor</v-icon>
                  Equipos
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">Capturar Equipos</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>

                    <!--Contenedor de Elementos de Dialogo-->
                    <v-row align="center"
                    justify="start">
                      <!--Contenedores de Carga o Busquedas con CSV o texto-->
                          <!--Componente cargacon csv-->
                          <v-col cols="11">
                            <br>
                            <!-- <v-file-input show-size label="¿Desea cargar archivo con Datos?" 
                            @change="cargarArchivo"
                            accept="text/csv"

                            ></v-file-input> -->
                            <input class="mt-3" type="file" ref="fileupload" @change="onFileChange"
                            accept=".csv" label="File input"
                           
                            >

                           
                          </v-col>
                          <!-- <v-col cols="12">
                            <ul>
                              <li v-for="(item, index) in datosCSV" :key="index">
                                <p>Marca: {{ item.Marca }} -- Modelo: {{ item.Modelo }} -- Descripción: {{ item.Descripción }} -- No.Inventario: {{ item['No. Inventario Armonizado'] }}</p>
                              </li>
                            </ul>
                          </v-col> -->
                          <!--Componente busqueda de objeto-->
                          <v-col cols="11">
                            <v-row align="center"
                    justify="center">
                              <v-col cols="12">
                                <v-col cols="12">
                                  <v-autocomplete
                                  chips
                                  close
                                  v-model="activeItemsProductos"
                                  :items="inventarioEquiposAutocomplete"
                                  item-text="NumeroInventarioArmonizado"
                                  item-value="Id"
                                  label="¿El equipo se encuentra registrado?  Ingrese sus Datos"
                                  multiple
                                  
                                >
                               
                                
                                  <template v-slot:item="{ props, item }">
                                    <v-list-item v-bind="props" @click="toggleItem(item)">
                                      <v-list-item-action>
                                        <v-checkbox :input-value="isActive(item)" @input="toggleItem(item)"></v-checkbox>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title>{{ getAreaText(item.Area) }} -- {{  getEquipoText(item.Equipo) }} -- {{ getMarcaText(item.Marca) }} -- 
                                          {{ item.Modelo}} </v-list-item-title>
                                        <v-list-item-subtitle>{{ item.Descripcion }} -- {{ item.NumeroInventarioArmonizado }} -- IP: {{ item.IPEquipo }} </v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </template>
                                  </v-autocomplete>
                               
                                  <ul>
                                    <li v-for="(item, index) in activeItemsProductos" :key="index">
                                      <p>Equipo: {{ getEquipoText(item.Equipo) }} -- Marca: {{ getMarcaText(item.Marca) }} -- Modelo: {{ item.Modelo }} 
                                        -- Descripcion: {{ item.Descripcion }} -- No.Inventario: {{ item.NumeroInventarioArmonizado }} -- IP: {{ item.IPEquipo }}</p>
                                      <!-- Agrega más elementos aquí según tus necesidades -->
                                    </li>
                                  </ul>
                                </v-col>
                              </v-col>
                            </v-row>
                            <v-divider :thickness="2"></v-divider>
                          </v-col>

                            <!--Botones de selectores de caracteristicas-->
                           <!--Contenedor de Dialog de Agregar Equipo-->
                           <v-col cols="12" class="">
                            <v-row align="center"
                            justify="center">
                              <v-col cols="10">
                                <v-select class="" 
                                v-model="selectedItemEquipos" :items="activeItemsEquipos" 
                                item-value="ClasificacionEquipoId" item-text="ClasificacionEquipoDescripcion" 
                                label="Equipos" 
                                required></v-select>
                              </v-col>
                              <v-col cols="2" class="pt-6">
                                <v-btn class="" color="extrasOrfis" width="35" height="35" fab 
                                  @click.stop="dialogadd = true">
                                  <v-icon color="white" class="">mdi-plus</v-icon>
                                </v-btn>
                                <v-dialog v-model="dialogadd" max-width="290">
                                  <v-card>
                                    <v-card-title class="headline">Agregar Equipo</v-card-title>

                                    <v-card-text>
                                      <v-text-field v-model="inputEquipo" rules="" :counter="100" label="Tipo de Equipo"
                                        required></v-text-field>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="error" flat="flat" @click="dialogadd = false"><v-icon class="mr-1">
                                          mdi-close
                                        </v-icon>
                                        Cancelar
                                      </v-btn>
                                      <v-btn color="success" flat="flat" @click="dialogadd = false"><v-icon class="mr-1">
                                          mdi-plus
                                        </v-icon>
                                        Agregar 
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-col>
                            </v-row>
                          </v-col>
                          <!--Agregar Marca - Dialog-->
                          <v-col cols="12">
                            <v-row align="center"
                            justify="center">
                            <v-col cols="10">
                              <v-select class="mrl-15" v-model="selectedItemMarcas" :items="activeItems" 
                            item-value="MarcaId" item-text="MarcaDescripcion" 
                            label="Marcas" required>
                          </v-select>
                            </v-col>
                            <v-col cols="2" class="pt-6">
                              <v-btn  color="extrasOrfis" width="35" 
                              height="35" fab @click.stop="dialogaddm = true"
                                >
                                <v-icon color="white" class="">mdi-plus</v-icon>
                              </v-btn>
                              <v-dialog v-model="dialogaddm" max-width="290">
                                <v-card>
                                  <v-card-title class="headline">Agregar Marca</v-card-title>
                                  <v-card-text>
                                    <v-text-field v-model="inputMarca" rules="" :counter="100" label="Agregar Marca"
                                      required></v-text-field>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" flat="flat" @click="dialogaddm = false"><v-icon class="mr-1">
                                        mdi-close
                                      </v-icon>
                                      Cancelar
                                    </v-btn>
                                    <v-btn color="success" flat="flat" @click="dialogaddm = false"><v-icon class="mr-1">
                                        mdi-plus
                                      </v-icon>
                                      Agregar
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-col>
                          </v-row>
                          </v-col>
                          <!--Caracteristicas del Equipo-->
                          <!--Descripción del Equipo-->
                          <v-col cols="11">
                            <v-textarea auto-grow color="primary" label="Descripción del Equipo" v-model="descripDatos"
                              hint="Ingrese una descripción del equipo" rows="1"></v-textarea>
                          </v-col>
                          <!--Desscripción de Modelo-->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto" class="">                 
                                <v-text-field  v-model="valModelo" label="Modelo"
                                hint="Ingrese el modelo"
                                variant="underlined"></v-text-field> 
                          </v-col>
                          <!--Area-->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <!-- <v-text-field label="Área" single-line 
                            hint="Ingrese Área" v-model="areaForm"
                            ></v-text-field>  -->

                            <v-select class="mrl-15" v-model="areaForm" :items="activeItemsAreas" 
                            item-value="AreaId" item-text="AreaDescripcion" 
                            label="Areas" required>
                          </v-select>
                          </v-col>
                          <!--Ip Equipo-->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <v-text-field label="IP del Equipo" single-line 
                            hint="Ingrese IP del Equipo" v-model="IPEquipo"
                            ></v-text-field> 
                          </v-col>
                          <!--Persona Asignada-->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <v-text-field label="Persona Asignada" single-line
                            hint="Ingrese Persona ASignada" v-model="perasigForm"
                            ></v-text-field>
                          </v-col>
                           <!--Contenedor de Licitación-->
                           <v-col xl="4" lg="4" md="4" sm="12" xs="12">
                            <v-text-field label="Licitación"
                            hint="Ingrese Licitiación" v-model="licitaForm"
                            ></v-text-field>
                          </v-col>
                           <!-- Selector de Fecha Compra-->
                          <v-col cols="4">
                            <v-menu
                            ref="menuCompra1"
                            v-model="menuCompra1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateCompra"
                                label="Ingrese la fecha de compra"
                                prepend-icon="mdi-calendar-range"
                                readonly

                                v-bind="attrs"
                                locale="es"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                            locale="es"
                              ref="picker"
                              v-model="dateCompra"
                              max="2150-01-01"
                              min="1950-01-01"
                              @change="save"
                            ></v-date-picker>
                          </v-menu>
                          </v-col>
                           <!-- Selector de Fecha Garantía-->
                           <v-col cols="4">
                            <v-menu
                            ref="menuGarantia"
                            v-model="menuGarantia"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="dateGarantia"
                                label="Ingrese la fecha de Garantía"
                                prepend-icon="mdi-calendar-range"
                                readonly

                                v-bind="attrs"
                                locale="es"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                            locale="es"
                              ref="pickers"
                              v-model="dateGarantia"
                              max="2150-01-01"
                              min="1950-01-01"
                              @change="save2"
                            ></v-date-picker>
                          </v-menu>
                          </v-col>
                           <!--Nombre del Equip-->
                           <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <v-text-field label="Nombre del Equipo" single-line 
                            hint="Ingrese nombre del equipo"
                            v-model="nomEquipo" ></v-text-field>
                          </v-col>
                          <!--No Serie-->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <v-text-field label="No. Serie" single-line 
                            hint="Ingrese Número de Serie"
                            v-model="noSerie"></v-text-field>
                          </v-col>
                             <!--No Inv -->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <v-text-field  label="No. Inventario" single-line
                            hint="Ingrese Número de Inventario"
                            v-model="noInventario"
                           >
                          </v-text-field>
                          </v-col>
                           <!--No Inv Armoni-->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <v-text-field label="No. Inv. Armonizado" v-model="noInvArmonizado"
                            hint="Ingrese Número de Inventario Armonizado"
                            :rules="rules"
                            single-line 
                            type="tel"
                            maxlength="19"
                            ></v-text-field>


                          </v-col>
                          <!--Estado-->
                          <v-col xl="4" lg="4" md="4" sm="auto" xs="auto">
                            <v-text-field label="Estado" single-line value="Activo" disabled></v-text-field>
                          </v-col>



                    </v-row>

                  </v-container>
                  <small>Verifique que la información sea correcta</small>
                  <h4>FCSI-19</h4>
                 
                </v-card-text>
                <!--Botones de Dialog Captuar Equipos**-->
                <v-card-actions class="">
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="dialog = false" class="mb-3 ">
                    <v-icon class="mr-1">mdi-close</v-icon>
                    Cancelar</v-btn>
                  <v-btn color="success" text @click="cargarDatosTabla" class="mb-3 ml-5">
                    <v-icon class="mr-1">mdi-content-save-all</v-icon>
                    Agregar Productos</v-btn>
                  <br>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <!--*********************** Tabla de Datos *************************************-->
          <v-col cols="auto">
            <v-btn color="success" border class="text-none  mb-2" variant="text">
              <v-icon class="mr-3">mdi-microsoft-windows-classic</v-icon>
              Software
            </v-btn>
          </v-col>         
        </v-row>
        <br>
      </v-col>

      <v-col cols="12" class="align-content-center">
        <v-data-table :headers="headers" :items="inventario" class="elevation-1">
          <template v-slot:item.acciones="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editarItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="eliminarItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:item.Equipo="{ item }">
            {{ getEquipoText(item.Equipo) }}
          </template>
          <template v-slot:item.Marca="{ item }">
            {{ getMarcaText(item.Marca) }}
          </template>

          <template v-slot:item.Area="{ item }">
            {{ getAreaText(item.Area) }}
          </template>

          <template v-slot:item.Activo="{ item }">
            {{ getActivoText(item.Activo) }}
          </template>
           <template v-slot:item.FechaCompra="{ item }">
            {{ formatDate(item.FechaCompra) }}
          </template>
          <template v-slot:item.FechaVencimientoGarantia="{ item }">
            {{ formatDate(item.FechaVencimientoGarantia) }}
          </template> 
        </v-data-table>
      </v-col>

      <v-dialog v-model="dialogEditar" max-width="600px">
        <v-card>
          <v-card-title>Editar Equipo</v-card-title>
          <v-card-text>
            <v-select class="" 
            v-model="itemEditado.Equipo" :items="activeItemsEquipos" 
            item-value="ClasificacionEquipoId" item-text="ClasificacionEquipoDescripcion" 
            label="Equipo" 
            required></v-select>
<!-- 
            <v-select class="" 
                                v-model="selectedItemEquipos" :items="activeItemsEquipos" 
                                item-value="ClasificacionEquipoId" item-text="ClasificacionEquipoDescripcion" 
                                label="Equipo" 
                                required></v-select> -->
<!-- 
                                <v-select class="mrl-15" v-model="selectedItemMarcas" :items="activeItems" 
                            item-value="MarcaId" item-text="MarcaDescripcion" 
                            label="Marcas" required>
                          </v-select> -->

          <v-select class="mrl-15" v-model="itemEditado.Marca" :items="activeItems" 
          item-value="MarcaId" item-text="MarcaDescripcion" label="Marcas" required>
          </v-select> 
            <!-- <v-text-field :value="getMarcaText(itemEditado.Marca)" label="Marca" @input="updateMarcaText($event)">
            </v-text-field> -->
            <v-text-field v-model="itemEditado.Modelo" label="Modelo"
            required></v-text-field>
            <v-text-field v-model="itemEditado.Descripcion" label="Descripción"></v-text-field>
            <v-text-field v-model="itemEditado.NombreEquipo" label="Nombre Equipo"></v-text-field>
            <v-text-field v-model="itemEditado.IPEquipo" label="IP del Equipo"></v-text-field>
            <v-text-field v-model="itemEditado.ClaveProducto" label="No. Serie"></v-text-field>
            <v-text-field v-model="itemEditado.NumeroInventario" label="No. Inventario"></v-text-field>
            <v-text-field v-model="itemEditado.NumeroInventarioArmonizado" 
            label="No. Inventario Armonizado"
            :rules="rules"
            ></v-text-field>            
            <v-select class="mrl-15" v-model="itemEditado.Area" 
            :items="activeItemsAreas" item-value="AreaId" 
            item-text="AreaDescripcion" label="Areas" required></v-select>
            <v-text-field v-model="itemEditado.AsignadoA" label="Asignado a"></v-text-field>
            <v-text-field v-model="itemEditado.Licitacion" label="licitación"></v-text-field>
            <v-select v-model="itemEditado.Activo" 
            :items="activeItemsEstado"
            item-value="valor" 
            item-text="texto"
            label="Estado"></v-select>
            <!--Fecha de Compra-->
            <v-menu
              ref="menuForm"
              v-model="menuForm"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="itemEditado.FechaCompra"
                  label="Fecha de Compra"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  locale="es"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="itemEditado.FechaCompra"
                locale="es"
                
                max="2150-01-01"
                min="1950-01-01"
                @change="save3"
              ></v-date-picker>
            </v-menu>
            <!--Fecha de Garantía-->
            <v-menu
              ref="menuForm2"
              v-model="menuForm2"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="itemEditado.FechaVencimientoGarantia"
                  label="Fecha de Garantía"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  locale="es"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="itemEditado.FechaVencimientoGarantia"
                locale="es"
                
                max="2150-01-01"
                min="1950-01-01"
                @change="save4"
              ></v-date-picker>
            </v-menu>
            <!-- <v-date-picker v-model="itemEditado.FechaCompra" label="Fecha de Compra" scrollable></v-date-picker>
            <v-date-picker v-model="itemEditado.FechaVencimientoGarantia" label="Fecha de Garantía" scrollable></v-date-picker>
     -->
            <!-- Agrega más campos de edición aquí -->
            <h3>FCSI-19</h3> 
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="guardarEdicion">Guardar</v-btn>
            <v-btn color="blue darken-1" text @click="dialogEditar = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--Botones de acciones de guardado sobre datos de Tabla
      v-if="inventario && inventario.length > 0"
      -->
      <v-col cols="12" >

        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn color="error" text @click="clenaData()" class="">
              <v-icon class="mr-1">mdi-close</v-icon>
              Limpiar Datos
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn color="success" text @click="saveDataOnBd()" class="">
              <v-icon class="mr-3">mdi-content-save-all</v-icon>
              Guardar Inventario
            </v-btn>
          </v-col>
        </v-row>



      </v-col>
      <v-col cols="auto"> </v-col>
      <h3>FCSI-19</h3> 
      <v-row>
        <br>
        <!-- <p><small> Fecha de Registro: {{ dateCompra }} </small></p>
        <p><small>Ultima Modificación: {{ dateCompra }}</small></p> -->
      </v-row>
     
      <br>
      <br>
    </v-row>
  </v-container>
</template>
<style>

.swal2-title {
  font-family: Arial, sans-serif; 
  font-size: 28px; 
  color: black; 
}

.swal2-em {
  font-family: Arial, sans-serif; 
  font-size: 18px; 
  color: black; 
}

/*
.swal2-html-container p {
  font-family: Arial, sans-serif; 
  font-size: 16px; 
}

 .swal2-button {
  background-color: #4CAF50; 
  color: white; 
}

.swal2-deny-button {
  background-color: #f44336; 
  color: white; 
}

 .btn-success {
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  font-family: Arial, sans-serif;
 
} 

.personal1 {
  background-color: #008000;
  border-radius: 8px;
  color:#008000;                                                                                         ;
  font-size: 16px;
  font-family: Arial, sans-serif;
  padding: 8px 16px;
  margin-right: 10px;
} 
*/

.entendido{
  font-size: 16px;
  font-family: Arial, sans-serif;
  color:#FFFFFF; 
  box-shadow: none;  
  margin-right: 10px;
}

</style>
<script>
import axios from 'axios';
import moment from 'moment';
import Swal from 'vue-sweetalert2';
import { VueMaskDirective } from 'v-mask'
import { pctEncChar } from 'uri-js';
   const Papa = require('papaparse');
export default {
  name: "CapEquipos",

  data: () => ({

    //Reglas de campos
    rules: [
      value => !!value || 'Campo Requerido.',
      value => (value && value.length >= 3) || 'Minimo 3 caracteres',
      value => /^[0-9-]+$/.test(value) || 'Solo se permiten números y un único signo "-"',
      value => /^[0-9]{3}00001000[0-9]{2}-[0-9]{5}$/.test(value) || 'Formato inválido',
     
      ],

///DATOS REALES ****************
 variablesVacias: [],
        //Valores de Tabla - Presentación 
        headers: [
        //    { text: 'No.', align: '', sortable: true, value: 'Id' },
            { text: 'Equipo', align: 'left', sortable: true, value: 'Equipo' },
            { text: 'Marca', value: 'Marca' , sortable: true,},
            { text: 'Modelo', value: 'Modelo' , sortable: true,},
            { text: 'Descripción', value: 'Descripcion' , sortable: true,},
            { text: 'Nombre Equipo', value: 'NombreEquipo' , sortable: true,},
            { text: 'IP de Equipo', value: 'IPEquipo' , sortable: true,},
            { text: 'No. Serie', value: 'ClaveProducto' , sortable: true,},
            { text: 'No. Inventario', value: 'NumeroInventario', sortable: true, width: '200px' },
            { text: 'No. Inv. Armonizado', value: 'NumeroInventarioArmonizado', sortable: true, width: '200px' },
            { text: 'Área', value: 'Area' , sortable: true,},
            { text: 'Persona Asignada', value: 'AsignadoA', sortable: true, },
            { text: 'Licitacion', value: 'Licitacion', sortable: true, },
            { text: 'Estado', value: 'Activo' , sortable: true,},
            { text: 'Fecha de Compra', value: 'FechaCompra' , sortable: true, width: '150px',align: 'center'},
            { text: 'Fecha de Garantía', value: 'FechaVencimientoGarantia' , sortable: true,width: '150px',align: 'center'},
            { text: 'Acciones', value: 'acciones', sortable: true,},
          ], //titulos de tabla

          //Valores de Tabla - Llenado de Tabla
          inventario: [

          ],

          //Dialogos de editar y eliminar datos de tabla 
          dialogEditar: false,
          itemEditado: {},

        // Dialogo de Ventana de Equipos 
        dialog: false, 


      //Campos para carga de CSV
      datosCSV: [],


        // Valor de v-autocomplete - > Busqueda de datos
       datosBusquedaAutocomplete: "", 
       inventarioEquiposAutocomplete: [],
       equiposSeleccionados: [],
       activeItemsProductos: [], 


      //Valores de Formularios
      descripDatos: '',//Descripción 
      
      IPEquipo: '',
      perasigForm: '',
      licitaForm: '',
      noSerie:'',
      noInventario: '',
      noInvArmonizado: '',
      nomEquipo: '',
      menuForm: false,
      menuForm2: false,
      Tipo: 'Equipo',

      //Valores de COmbo Box 
       //Valor de Equipos
       datosEquipos: [],
      selectedItemEquipos: null,
      activeItemsEquipos: [], 
      
      //Valor de Marcas
      datosMarcas: [],
      selectedItemMarcas: null,
      activeItems: [], 
      //Valores de Areas
      activeItemsAreas: [],
      areaForm: null, 

      //Valor Modelos 
      valModelo: '',

      //valores de estado 
      activeItemsEstado: [
        {
          valor: true,
          texto: 'Activo'
        },
        {
          valor: false,
          texto: 'Inactivo'
        }
      ], 

      //Valores de la fecha
      menuCompra1: false,
      dateCompra: new Date().toISOString().substr(0, 10),
      menuGarantia: false,
      dateGarantia: new Date().toISOString().substr(0, 10),


        //valore de sweetalert
        respuesta: false,


//Valores de fielinput
fileinput: "",
    filename: "",
    titulosArc: '',
    cabeceras: [],
    datos: [],

      //DATOS DE PRUEBA *********************************************************************


    //List de datos del autocompletar
    
    autoUpdate: true,
    friends: [ { id: 1, name: 'Sandra Adams', group: 'Group 1' }],
    isUpdating: false,
    name: 'Midnight Crew',

    people: [
      // TODO: https://github.com/vuetifyjs/vuetify/issues/15721
      // { header: 'Group 1' },
      { id: 1, name: 'Sandra Adams', group: 'Group 1' },
  { id: 2, name: 'Ali Connors', group: 'Group 1' },
  { id: 3, name: 'Trevor Hansen', group: 'Group 1' },
      { id: 4, name: 'Tucker Smith', group: 'Group 1', },
      // { divider: true },
      // { header: 'Group 2' },
      { id: 5, name: 'Britta Holt', group: 'Group 2', },
      { id: 6,name: 'Jane Smith ', group: 'Group 2', },
      { id: 7,name: 'John Smith', group: 'Group 2', },
      { id: 8,name: 'Sandra Williams', group: 'Group 2', },
    ],
    title: 'The summer breeze',
    timeout: null,


 
    //Valores de Fecha

  //  dateCompra: new Date().toISOString().substring(0, 10),
    // dateFormatted: formatDate(new Date().toISOString().substring(0, 10)),


    menuCompra: false,
    // //Valores de Datapickers - Valor fecha compra
    // date: new Date().toISOString().substr(0, 10),
    //   dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    //   menu1: false,
    //   menu2: false,
    //Valores de Datapickers - Valor garantía

    
    //Dialogo de Agregar equipo
    dialogadd: false,
    inputEquipo: '',
    comboboxEquipos: [
      "Telefono IP",
      "Laptop",
      "Computadora de Escritorio"
    ],
    //Agregar Marca
    dialogaddm: false,
    inputMarca: '',
    comboboxMarcas: [
      "Dell",
      "Acer",
      "Hp"
    ],
    //Agregar Modelo
    dialogaddmodel: false,
    inputModelo: '',
    comboboxModelos: [
      "Compaq",
      "xtra",
      "Presario"
    ],
    
    
  
  }),
  filters: {
    formatDateCompra(value) {
      // const date = new Date(value);
      // return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      const date = new Date(value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
    }
  },
  watch: {
    'itemEditado.estado': function(newEstado, oldEstado) {
    // Actualizar itemEditado.Estado según el estado seleccionado
    this.itemEditado.Estado = newEstado === 'Activo' ? 1 : 2;
    },
    isUpdating(val) {
      clearTimeout(this.timeout)

      if (val) {
        this.timeout = setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    menu2 (val) {
      val && setTimeout(() => (this.$refs.pickers.activePicker = 'YEAR'))
    },
    
  },
  created() {
    
    this.fetchData();
  },
  computed: {
    formattedFechaCompra: {
    get() {
      if (!this.itemEditado.FechaCompra) {
        return null;
      }
      return new Date(this.itemEditado.FechaCompra).toISOString().substr(0, 10);
    },
    set(value) {
      console.log("valor compra:"+value);
      this.itemEditado.FechaCompra = value;
    },
    },
    formattedFechaGarantia: {
    get() {
      if (!this.itemEditado.FechaVencimientoGarantia) {
        return null;
      }
      return new Date(this.itemEditado.FechaVencimientoGarantia).toISOString().substr(0, 10);
    },
    set(value) {
      console.log("valor garantía "+value);
      console.log("hopli");
      this.itemEditado.FechaVencimientoGarantia = value;
    },
    },
    dateCompraFormatted() {
      return this.formatDate(this.dateCompra);
    },
    dateGarantiaFormatted() {
      return this.formatDate(this.dateGarantia);
    }
  },
  methods: {

    //reglas de campos
    validarFormatoNoInventario(value) {
      const regex = /^[0-9]{3}00001[0-9]{4}-[0-9]{5}$/;
      return regex.test(value) || 'Formato inválido';
    },

    //Metodos Reales - ASYNC
    async fetchData() {
      try {
        //Recupera los datos para ser buscados en el autocomplete

        //Recupera Productos Registrado en Orfis
        const responseProductosOrfis = await fetch('http://localhost:3000/productosOrfis');
        const dataProductosOrfis = await responseProductosOrfis.json();
        this.inventarioEquiposAutocomplete = dataProductosOrfis;


        //Recupera Equipos - Nombre nada más
        const responseEquipos = await fetch('http://localhost:3000/equipos');
        const dataEquipos = await responseEquipos.json();
        this.activeItemsEquipos = dataEquipos;


        //Recupera Marcas
        const response = await fetch('http://localhost:3000/marcas');
        const data = await response.json();
        this.activeItems = data;

        //Recupera Areas 
        const responseAreas = await fetch('http://localhost:3000/areas');
        const dataAreas = await responseAreas.json();
        this.activeItemsAreas = dataAreas;




        //const jsonObject = JSON.parse(this.activeItems)

       // console.log(this.activeItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    

    filtrarEquipos(texto) {
            // Filtrar los datos basados en el texto ingresado
            this.inventarioEquiposAutocomplete = this.inventarioEquiposAutocomplete.filter(item =>
                // item.Descripcion.includes(texto)
                // || item.Equipo.includes(texto)
                // || item.Marca.includes(texto)
                 item.Equipo.includes(texto)
            );
          //  console.log(texto);
    },

    isActive(item) {
        return this.activeItemsProductos.findIndex(equipo => equipo.Id === item.Id) !== -1;
    },

    toggleItem(item) {
        const foundIndex = this.equiposSeleccionados.findIndex(equipo => equipo.Id === item.Id);
        if (foundIndex !== -1) {
            // El item ya está en equiposSeleccionados, lo eliminamos
            this.equiposSeleccionados.splice(foundIndex, 1);
            // También lo eliminamos de activeItemsProductos si está presente
            this.activeItemsProductos = this.activeItemsProductos.filter(activeItem => activeItem.Id !== item.Id);
        } else {
            // El item no está en equiposSeleccionados, lo agregamos
            this.equiposSeleccionados.push(item);
            // Agregamos item a activeItemsProductos
            this.activeItemsProductos.push(item);
        }
       // console.log(this.equiposSeleccionados);
       // console.log(this.activeItemsProductos);
    },

    // //verifica si hay inventario para mostrar los botones de guardado
    // hasInventory() {
    //   return this.inventario && this.inventario.length > 0;
    // },

    //Limpia los datos
    clenaData(){
      this. inventario = [];
      this.descripDatos = '';
        this.areaForm = '';
        this.perasigForm = '';
        this.licitaForm = '';
        this.dateCompra = '';
        this.dateGarantia = '';
        this.selectedItemEquipos = '';
        this.selectedItemMarcas = '';
        this.valModelo = '';
        this.dateCompra = '';
        this.dateGarantia = '';
        this.nomEquipo = '';
        this.noSerie = '';
        this.noInventario = '';
        this.noInvArmonizado = '';
        this.IPEquipo=''; 
        this.activeItemsProductos = [];
        this.equiposSeleccionados = [];
    },

    //Guarda los datos en la base de Datos
    // saveDataOnBd(){
    //  //console.log("Guardando datos en Base de Datos");

    //  this.$swal({
    //    customClass: {
    //        confirmButton: "entendido",
    //        denyButton: "entendido"
    //      },
    //     buttonsStyling: true,
    //     title: "¿Está seguro que desea guardar estos datos?",
    //     html:
    //         '¡¡Una vez realizado este proceso no se puede revertir!! </em>',
    //     //  showCancelButton: true,
    //     focusConfirm: false,
    //     showDenyButton: true,
    //     confirmButtonText: "Guardar Inventario",
    //     confirmButtonColor: '#008000',
    //     denyButtonText: `Cancelar`,
    //   }).then((result) => {
    //     /* Si confirman el guardado */
    //     if (result.isConfirmed) {

          

    //       //Si se logran guardar los datos 
    //       if(this.respuesta!=false){
    //         this.$swal({
    //         customClass: {
    //             confirmButton: "entendido",
    //         },
    //         buttonsStyling: true,
    //             title: "¡Inventario Guardado!",
    //             icon: "success" ,
    //             confirmButtonText: "Entendido",
    //             confirmButtonColor: '#008000',
    //             focusConfirm: false,
    //           });
    //       }
    //       //sino se pueden guardar los datos 
    //       else{
    //         this.$swal({
    //         customClass: {
    //             confirmButton: "entendido",
    //         },
    //       buttonsStyling: true,
    //           title: "¡No se pudo registrar el inventario!",
    //           html:
    //           'Contactese con Subdirección de Infraestructura Tecnológica y Servicios Informáticos extensión 1073 </em>',
    //           icon: "error" ,
    //           confirmButtonText: "Enterado",
    //           confirmButtonColor: '#ff0000',
    //           focusConfirm: false,
    //         }
    //       );
    //       }


    //     } 
    //     //Si le dan en cancelar - proceso antes de guardar
    //     else if (result.isDenied) {
    //       this.$swal({
    //         customClass: {
    //             confirmButton: "entendido",
    //         },
    //     buttonsStyling: true,
    //         title: "¡No se guardo ningún cambio!",
    //         icon: "info" ,
    //         confirmButtonText: "Entendido",
    //         confirmButtonColor: '#ff0000',
    //         focusConfirm: false,
    //       }
    //       );


    //     }
    //   });
    // },


    // saveDataOnBd() {
    // // Validación y lógica anterior...

    // this.$swal({
    //     customClass: {
    //         confirmButton: "entendido",
    //         denyButton: "entendido"
    //     },
    //     buttonsStyling: true,
    //     title: "¿Está seguro que desea guardar estos datos?",
    //     html: '¡¡Una vez realizado este proceso no se puede revertir!! </em>',
    //     //  showCancelButton: true,
    //     focusConfirm: false,
    //     showDenyButton: true,
    //     confirmButtonText: "Guardar Inventario",
    //     confirmButtonColor: '#008000',
    //     denyButtonText: `Cancelar`,
    // }).then((result) => {
    //     /* Si confirman el guardado */
    //     if (result.isConfirmed) {
    //         // Hacer la petición a la API
    //         fetch('http://10.0.230.142:3000/agregarProducto', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(req.body)
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Error al enviar datos a la API');
    //                 this.$swal({
    //                 customClass: {
    //                     confirmButton: "Enterado",
    //                 },
    //                 buttonsStyling: true,
    //                 title: "¡Inventario Guardado!",
    //                 icon: "error",
    //                 confirmButtonText: "Entendido",
    //                 confirmButtonColor: '#008000',
    //                 focusConfirm: false,
    //             });
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log(data);
    //             // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje al usuario
    //             this.$swal({
    //                 customClass: {
    //                     confirmButton: "entendido",
    //                 },
    //                 buttonsStyling: true,
    //                 title: "¡Inventario Guardado!",
    //                 icon: "success",
    //                 confirmButtonText: "Entendido",
    //                 confirmButtonColor: '#008000',
    //                 focusConfirm: false,
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error al enviar datos a la API:', error.message);
    //             // Manejar el error, mostrar un mensaje al usuario, etc.
    //             this.$swal({
    //                 customClass: {
    //                     confirmButton: "entendido",
    //                 },
    //                 buttonsStyling: true,
    //                 title: "¡No se pudo registrar el inventario!",
    //                 html: 'Contactese con Subdirección de Infraestructura Tecnológica y Servicios Informáticos extensión 1073 </em>',
    //                 icon: "error",
    //                 confirmButtonText: "Enterado",
    //                 confirmButtonColor: '#ff0000',
    //                 focusConfirm: false,
    //             });
    //         });

    //     } 
    //     else if (result.isDenied) {
    //         this.$swal({
    //             customClass: {
    //                 confirmButton: "entendido",
    //             },
    //             buttonsStyling: true,
    //             title: "¡No se guardo ningún cambio!",
    //             icon: "info",
    //             confirmButtonText: "Entendido",
    //             confirmButtonColor: '#ff0000',
    //             focusConfirm: false,
    //         });
    //     }
    // });
    // },

//     saveDataOnBd(){
//  //console.log("Guardando datos en Base de Datos");

//  this.$swal({
//    customClass: {
//        confirmButton: "entendido",
//        denyButton: "entendido"
//      },
//     buttonsStyling: true,
//     title: "¿Está seguro que desea guardar estos datos?",
//     html:
//         '¡¡Una vez realizado este proceso no se puede revertir!! </em>',
//     //  showCancelButton: true,
//     focusConfirm: false,
//     showDenyButton: true,
//     confirmButtonText: "Guardar Inventario",
//     confirmButtonColor: '#008000',
//     denyButtonText: `Cancelar`,
//   }).then((result) => {
//     /* Si confirman el guardado */
//     if (result.isConfirmed) {

//       // Hacer la petición HTTP para guardar los datos
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ inventario })
//       };
//       fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
//       //axios.post('http://10.0.230.142:3000/agregarProducto', this.inventario)
//         .then(response => {
//           console.log(response.data);
//           // const { message, existeDuplicado } = response.data;
//           // console.log(message);
//           // if(existeDuplicado){
//           //   this.$swal({
//           //       customClass: {
//           //           confirmButton: "Enterado",
//           //       },
//           //       buttonsStyling: true,
//           //           title: "¡No se pudo guardar el inventario!",
//           //           html: message,
//           //           icon: "error" ,
//           //           confirmButtonText: "Entendido",
//           //           confirmButtonColor: '#008000',
//           //           focusConfirm: false,
//           //         });
//           // }
//           // // Si la petición se completó con éxito
//           // else if (response.status === 200) {
//           //   this.$swal({
//           //     customClass: {
//           //         confirmButton: "entendido",
//           //     },
//           //     buttonsStyling: true,
//           //         title: "¡Inventario Guardado!",
//           //         icon: "success" ,
//           //         confirmButtonText: "Entendido",
//           //         confirmButtonColor: '#008000',
//           //         focusConfirm: false,
//           //       });
//           // } else {
//           //   // Si hubo un error al guardar los datos
//           //   this.$swal({
//           //     customClass: {
//           //         confirmButton: "entendido",
//           //     },
//           //   buttonsStyling: true,
//           //       title: "¡No se pudo registrar el inventario!",
//           //       html:
//           //       'Contactese con Subdirección de Infraestructura Tecnológica y Servicios Informáticos extensión 1073 </em>',
//           //       icon: "error" ,
//           //       confirmButtonText: "Enterado",
//           //       confirmButtonColor: '#ff0000',
//           //       focusConfirm: false,
//           //     }
//           //   );
//           // }

//         })
//         .catch(error => {
//           console.error(error);
//           // Manejar el error
//         });

//     } 
//     //Si le dan en cancelar - proceso antes de guardar
//     else if (result.isDenied) {
//       this.$swal({
//         customClass: {
//             confirmButton: "entendido",
//         },
//     buttonsStyling: true,
//         title: "¡No se guardo ningún cambio!",
//         icon: "info" ,
//         confirmButtonText: "Entendido",
//         confirmButtonColor: '#ff0000',
//         focusConfirm: false,
//       }
//       );


//     }
//   });
// },
    // saveDataOnBd(){
    //   this.$swal({
    //     customClass: {
    //       confirmButton: "entendido",
    //       denyButton: "entendido"
    //     },
    //     buttonsStyling: true,
    //     title: "¿Está seguro que desea guardar estos datos?",
    //     html: '¡¡Una vez realizado este proceso no se puede revertir!! </em>',
    //     focusConfirm: false,
    //     showDenyButton: true,
    //     confirmButtonText: "Guardar Inventario",
    //     confirmButtonColor: '#008000',
    //     denyButtonText: `Cancelar`,
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       const requestOptions = {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(this.inventario)
    //       };

    //       fetch("http://10.0.230.142:3000/agregarProducto", requestOptions)
    //         .then(response => {
            
    //          console.log(response.message);
    //           if (!response.ok) {
    //             throw new Error("Error al guardar los datos");
    //           }
    //           else if(response.status===400){
    //             this.$swal({
    //             customClass: {
    //               confirmButton: "Enterado",
    //             },
    //             buttonsStyling: true,
    //             title: "¡Error con inventario!",
    //             html:'',
    //             icon: "error" ,
    //             confirmButtonText: "Entendido",
    //             confirmButtonColor: '#008000',
    //             focusConfirm: false,
    //           });
    //           }
    //           return response.json();
    //         })
    //         .then(data => {
    //           this.$swal({
    //             customClass: {
    //               confirmButton: "entendido",
    //             },
    //             buttonsStyling: true,
    //             title: "¡Inventario Guardado!",
    //             icon: "success" ,
    //             confirmButtonText: "Entendido",
    //             confirmButtonColor: '#008000',
    //             focusConfirm: false,
    //           });
    //         })
    //         .catch(error => {
    //           console.error(error);
    //           this.$swal({
    //             customClass: {
    //               confirmButton: "Enterado",
    //             },
    //             buttonsStyling: true,
    //             title: "¡No se pudo guardar el inventario!",
    //             icon: "error" ,
    //             confirmButtonText: "Entendido",
    //             confirmButtonColor: '#008000',
    //             focusConfirm: false,
    //           });
    //         });
    //     } 
    //     else if (result.isDenied) {
    //       this.$swal({
    //         customClass: {
    //           confirmButton: "Entendido",
    //         },
    //         buttonsStyling: true,
    //         title: "¡No se guardo ningún cambio!",
    //         icon: "info" ,
    //         confirmButtonText: "Entendido",
    //         confirmButtonColor: '#ff0000',
    //         focusConfirm: false,
    //       });
    //     }
    //   });
    // },
//     saveDataOnBd() {
//   this.$swal({
//     customClass: {
//       confirmButton: "entendido",
//       denyButton: "entendido"
//     },
//     buttonsStyling: true,
//     title: "¿Está seguro que desea guardar estos datos?",
//     html: '¡¡Una vez realizado este proceso no se puede revertir!! </em>',
//     focusConfirm: false,
//     showDenyButton: true,
//     confirmButtonText: "Guardar Inventario",
//     confirmButtonColor: '#008000',
//     denyButtonText: `Cancelar`,
//   }).then((result) => {
//     if (result.isConfirmed) {
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(this.inventario)
//       };

//       fetch("http://10.0.230.142:3000/agregarProducto", requestOptions)
//         .then(response => {
//           console.log(response);
//           if (!response.ok) {
//             throw new Error("Error al guardar los datos");
//           } 
//           else if (response.status === 400) {
//             return response.json().then(data => {
//               this.$swal({
//                 customClass: {
//                   confirmButton: "Enterado",
//                 },
//                 buttonsStyling: true,
//                 title: "¡Error con inventario!",
//                 html: data.message,
//                 icon: "error",
//                 confirmButtonText: "Entendido",
//                 confirmButtonColor: '#008000',
//                 focusConfirm: false,
//               });
//             });
//           } 
//           else if (response.status === 200){
//             this.$swal({
//               customClass: {
//                 confirmButton: "entendido",
//               },
//               buttonsStyling: true,
//               title: "¡Inventario Guardado!",
//               icon: "success",
//               confirmButtonText: "Entendido",
//               confirmButtonColor: '#008000',
//               focusConfirm: false,
//             });
//           }
//         })
//         .catch(error => {
//             console.error(error);
//             this.$swal({
//               customClass: {
//                 confirmButton: "Enterado",
//               },
//               buttonsStyling: true,
//               title: "¡No se pudo guardar el inventario** !",
//               icon: "error",
//               confirmButtonText: "Entendido",
//               confirmButtonColor: '#008000',
//               focusConfirm: false,
//             });
//         });
//     } else if (result.isDenied) {
//       this.$swal({
//         customClass: {
//           confirmButton: "Entendido",
//         },
//         buttonsStyling: true,
//         title: "¡No se guardo ningún cambio!",
//         icon: "info",
//         confirmButtonText: "Entendido",
//         confirmButtonColor: '#ff0000',
//         focusConfirm: false,
//       });
//     }
//   });
// },


    saveDataOnBd() {
      this.$swal({
        customClass: {
          confirmButton: "entendido",
          denyButton: "entendido"
        },
        buttonsStyling: true,
        title: "¿Está seguro que desea guardar estos datos?",
        html: '¡¡Una vez realizado este proceso no se puede revertir!! </em>',
        focusConfirm: false,
        showDenyButton: true,
        confirmButtonText: "Guardar Inventario",
        confirmButtonColor: '#008000',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        //console.log(this.inventario);
        if (result.isConfirmed) {
          console.log(JSON.stringify(this.inventario));
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              //si necesitas editar información aquí puedes
              this.inventario
              )
          };

          fetch("http://10.0.230.142:3000/agregarProducto", requestOptions)
            .then(response => {
              console.log(response);
             // console.log(response.data);
              // if (!response.ok) {
              //   throw new Error("Error al guardar los datos");
              // } else 
              if (response.status === 400) {
                return response.json().then(data => {
                  this.$swal({
                    customClass: {
                      confirmButton: "Enterado",
                    },
                    buttonsStyling: true,
                    title: "¡Error con inventario--!",
                    html: data.message,
                    icon: "error",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: '#008000',
                    focusConfirm: false,
                  });
                });
              } else  if (response.status === 200) {
                
                
                this.$swal({
                  customClass: {
                    confirmButton: "entendido",
                  },
                  buttonsStyling: true,
                  title: "¡Inventario Guardado!",
                  icon: "success",
                  confirmButtonText: "Entendido",
                  confirmButtonColor: '#008000',
                  focusConfirm: false,
                });

                this.clenaData();
                this.fetchData();
               // window.location.reload();
              }
            })
            .catch(error => {
              console.error(error);
              this.$swal({
                customClass: {
                  confirmButton: "Enterado",
                },
                buttonsStyling: true,
                title: "¡No se pudo guardar el inventario!",
                icon: "error",
                confirmButtonText: "Entendido",
                confirmButtonColor: '#008000',
                focusConfirm: false,
              });
            });
        } 
        else if (result.isDenied) {
          this.$swal({
            customClass: {
              confirmButton: "Entendido",
            },
            buttonsStyling: true,
            title: "¡No se guardo ningún cambio!",
            icon: "info",
            confirmButtonText: "Entendido",
            confirmButtonColor: '#ff0000',
            focusConfirm: false,
          });
        }
      });
    },


    cargarDatosTabla() {
        if (this.activeItemsProductos.length > 0  && this.descripDatos != '') {
          // Hay elementos seleccionados en el autocomplete y también hay datos en el formulario
          
          // Utiliza los datos del formulario
          const nuevoItemFormulario = {

            Estado: 1,
            Descripcion: this.descripDatos,
            Area: this.areaForm,
            AsignadoA: this.perasigForm,
            //fechaCompra: this.dateCompra,
            //fechaGarantia: this.dateGarantia,
            Equipo: this.selectedItemEquipos,
            Marca: this.selectedItemMarcas,
            Modelo: this.valModelo,
            NombreEquipo: this.nomEquipo,
            ClaveProducto: this.noSerie,
            NumeroInventario: this.noInventario,
            NumeroInventarioArmonizado: this.noInvArmonizado,
           // FechaCompra: this.dateCompra,
           // FechaVencimientoGarantia: this.dateGarantia,

            
            FechaCompra: (() => {
          const date = new Date(this.dateCompra);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const year = date.getFullYear();
          return `${year}-${month}-${day}`;
        })(),
        FechaVencimientoGarantia: (() => {
          const date = new Date(this.dateGarantia);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const year = date.getFullYear();
          return `${year}-${month}-${day}`;
        })(),



            IPEquipo: this.IPEquipo,
            Licitacion: this.Licitacion,
            Activo: true,
            Tipo: this.Tipo,
            FHCreado: new Date().toISOString(),
            CreadoPor: '19',
            FHModificado: new Date().toISOString(),
            ModificadoPor: '19',

          };
          // Agrega los datos del formulario a la tabla
          this.inventario.push(nuevoItemFormulario);
          console.log('Cargando los datos 0...');
          console.log(this.inventario);
        } 
        else if (this.activeItemsProductos.length > 0) {
          // Hay elementos seleccionados en el autocomplete
         // console.log("Hay datos en el autocomplete");

          // Filtra los elementos seleccionados en el autocomplete que no están en la tabla
          const nuevosItemsAutocomplete = this.equiposSeleccionados.filter(item => 
          !this.inventario.some(existingItem => existingItem.Id === item.Id))
                                                                  .map(item => ({ 
                                                                    ...item, Estado: 1,
                                                                  Tipo: this.Tipo,
                                                                  Activo: true,
                                                                  FHCreado: new Date().toISOString(),
            CreadoPor: '19',
            FHModificado: new Date().toISOString(),
            ModificadoPor: '19',
            FechaCompra: (() => {
                  const date = new Date(item.FechaCompra);
                  const month = date.getMonth() + 1;
                  const day = date.getDate();
                  const year = date.getFullYear();
                  return `${year}-${month}-${day}`;
                })(),
            FechaVencimientoGarantia: (() => {
              const date = new Date(item.FechaVencimientoGarantia);
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const year = date.getFullYear();
              return `${year}-${month}-${day}`;
            })(),
           }));

          // Agrega los elementos seleccionados en el autocomplete a la tabla
          this.inventario.push(...nuevosItemsAutocomplete);
          console.log('Cargando los datos 1...');
          console.log(this.inventario);
        } 
        else if (this.descripDatos != '') {
          // Solo hay datos en el formulario
          //console.log("Hay datos en el formulario");

          // Utiliza los datos del formulario
          const nuevoItemFormulario = {
            
            Estado: 1,
            Descripcion: this.descripDatos,
            Area: this.areaForm,
            AsignadoA: this.perasigForm,
            fechaCompra: this.dateCompra,
            fechaGarantia: this.dateGarantia,
            Equipo: this.selectedItemEquipos,
            Marca: this.selectedItemMarcas,
            Modelo: this.valModelo,
            NombreEquipo: this.nomEquipo,
            ClaveProducto: this.noSerie,
            NumeroInventario: this.noInventario,
            NumeroInventarioArmonizado: this.noInvArmonizado,
            //FechaCompra: this.dateCompra ? new Date(this.dateCompra).toISOString() : null,
            //FechaVencimientoGarantia: this.dateGarantia ? new Date(this.dateGarantia).toISOString() : null,
          //  FechaCompra: new Date().toISOString(),
           // FechaVencimientoGarantia: this.dateGarantia,
              FechaCompra: (() => {
              const date = new Date(this.dateCompra);
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const year = date.getFullYear();
              return `${year}-${month}-${day}`;
            })(),
            FechaVencimientoGarantia: (() => {
              const date = new Date(this.dateGarantia);
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const year = date.getFullYear();
              return `${year}-${month}-${day}`;
            })(),
            IPEquipo: this.IPEquipo,
            Licitacion: this.Licitacion,
            Activo: true,
            Tipo: this.Tipo,
            FHCreado: new Date().toISOString(),
            CreadoPor: '19',
            FHModificado: new Date().toISOString(),
            ModificadoPor: '19',
          };

          // Agrega los datos del formulario a la tabla
          this.inventario.push(nuevoItemFormulario);

          console.log('Cargando los datos 2...');
          console.log(this.inventario);
        }else if(this.titulosArc != '' && this.cabeceras.length > 0 && this.datos.length > 0){
          //si se cargan datos mediante el uso de CSV
          
          this.inventario = this.datos;
          console.log('Cargando los datos 3...');
          console.log(this.datos);
        }
    //     titulosArc: '',
    // cabeceras: [],
    // datos: [],

        // Limpiar los campos del formulario
        this.descripDatos = '';
        this.areaForm = '';
        this.perasigForm = '';
        this.licitaForm = '';
        this.dateCompra = '';
        this.dateGarantia = '';
        this.selectedItemEquipos = '';
        this.selectedItemMarcas = '';
        this.valModelo = '';
        this.dateCompra = '';
        this.dateGarantia = '';
        this.nomEquipo = '';
        this.noSerie = '';
        this.noInventario = '';
        this.noInvArmonizado = '';
        this.IPEquipo=''; 
        this.Tipo='';
        this.datos;
        this.dialog = false; // Cierra el diálogo
    },

    editarItem(item) {
      // Clona el objeto para no modificarlo directamente
      this.itemEditado = { ...item,
        estado: 1,
        Tipo: this.Tipo,
        // FechaCompra: (() => {
        //   const date = new Date(item.FechaCompra);
        //   const month = date.getMonth() + 1;
        //   const day = date.getDate();
        //   const year = date.getFullYear();
        //   return `${month}/${day}/${year}`;
        // })(),
        // FechaVencimientoGarantia: (() => {
        //   const date = new Date(item.FechaCompra);
        //   const month = date.getMonth() + 1;
        //   const day = date.getDate();
        //   const year = date.getFullYear();
        //   return `${month}/${day}/${year}`;
        // })(),
        Activo: true,
            FHModificado: new Date().toISOString(),
            ModificadoPor: '19'
      };

      // Convierte las cadenas de fecha en objetos de fecha
     // this.itemEditado.FechaCompra = this.convertirAFecha(this.itemEditado.FechaCompra);
     // this.itemEditado.FechaVencimientoGarantia = this.convertirAFecha(this.itemEditado.FechaVencimientoGarantia);
  
      // Abre el diálogo de edición
      this.dialogEditar = true;
       // Agregar salida de consola para verificar
       console.log('Item clonado:', this.itemEditado);
    },

    getEquipoText(value) {
     return this.activeItemsEquipos.find(equipo => equipo.ClasificacionEquipoId === value)?.ClasificacionEquipoDescripcion || '';
    },
    getMarcaText(value) {
       return this.activeItems.find(marca => marca.MarcaId === value)?.MarcaDescripcion || '';
    },

    getAreaText(value) {
     return this.activeItemsAreas.find(area => area.AreaId === value)?.AreaDescripcion || '';
    },

    getActivoText(value) {
     return this.activeItemsEstado.find(estado => estado.valor === value)?.texto || '';
    },
    
    formatDate(dateString) {
      console.log(dateString);
      const date = new Date(dateString);

      // Check for valid date and handle invalid formats
      if (!(date instanceof Date && !isNaN(date))) {
        return 'Fecha inválida';
      }
      // Format the date in the user's preferred locale (adjust locale as needed)
      return date.toLocaleDateString('es-MX'); // Use 'es-MX' for Mexican Spanish locale
    },

    
    convertirAFecha(dateString) {
      // Si dateString ya es un objeto de fecha, devolverlo tal cual
      if (dateString instanceof Date) {
        return dateString;
      }
      
      // Si no es un objeto de fecha, intentar convertirlo
      try {
        return new Date(dateString);
      } catch (error) {
        console.error('Error al convertir la cadena de fecha en objeto de fecha:', error);
        return null;
      }
    },
    
    guardarEdicion() {

    const equipo = this.itemEditado.Equipo;
    const marca = this.itemEditado.Marca;
    const area = this.itemEditado.Area;
   
      this.verificaCampos();
    
    console.log("tiene area: "+area);
    console.log("tiene marca: "+marca);
    console.log("tiene equipo: "+equipo);

    console.log("tiene variable: "+this.variablesVacias);
    if (equipo === null || !marca== null || !area== null ||
    equipo === '' || !marca=== 'null' || !area== ''
    ) {
        // Aquí puedes mostrar un mensaje de error o manejar la validación de alguna otra forma
       // console.error('Falta completar algunos campos obligatorios');

        this.$swal({
                    customClass: {
                      confirmButton: "Enterado",
                    },

                    buttonsStyling: true,
                    title: "¡Error con Edición!",
                    html: 'Los siguiente campos necesitan seleccionar un dato: </em>'+this.variablesVacias,
                    icon: "error",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: '#008000',
                    focusConfirm: false,
                  });
        return;
    }

    const index = this.inventario.findIndex(i => i.Id === this.itemEditado.Id);
      if (index !== -1) {
        // Aquí puedes actualizar el objeto en this.inventario
        this.inventario[index] = this.itemEditado;
        this.$set(this.inventario, index, this.itemEditado); 
      }
      this.dialogEditar = false;
    },

    verificaCampos(){
      if (this.itemEditado.Equipo === null || this.itemEditado.Equipo === '') {
        this.variablesVacias.push('equipo');
    }

    if (this.itemEditado.Marca === null || this.itemEditado.Marca === '') {
      this.variablesVacias.push('marca');
    }

    if (this.itemEditado.Area === null || this.itemEditado.Area === '') {
      console.log("falta areaaaaa")
      this.variablesVacias.push('area');
    }
    },

    eliminarItem(item) {
      const index = this.inventario.findIndex(i => i.Id === item.Id);
      if (index !== -1) {
        this.inventario.splice(index, 1); // Elimina el elemento del array
       // this.activeItemsProductos.splice(index, 1);
        this.equiposSeleccionados.splice(index, 1);
        this.activeItemsProductos = this.activeItemsProductos.filter(activeItem => activeItem.Id !== item.Id);
         
      }
    },

    // formatDate(date) {
    //   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    //   return date.toLocaleDateString('en-US', options);
    // },

    save(dateCompra) {
     // this.dateCompra = new Date(dateCompra);

    // Convierte la fecha al formato YYYY-MM-DD
    const fechaConvertida = new Date(dateCompra).toISOString().substr(0, 10);
    //const fechaConvertida = `${dateCompra.getDate()}-${dateCompra.getMonth() + 1}-${dateCompra.getFullYear()}`;    
    // Aquí puedes realizar cualquier acción que necesites con la fecha
    // Por ejemplo, asignarla a una variable en data
    this.fechaCompraSeleccionada = fechaConvertida;
     //console.log("Fecha seleccionada:",  this.fechaCompraSeleccionada);
    // Cierra el menú
    this.menuCompra1 = false;
    },


    save2(dateGarantia) {
      const fechaConvertida2 = new Date(dateGarantia).toISOString().substr(0, 10);
      this.fechaGarantiaSeleccionada = fechaConvertida2;
      //console.log("Fecha seleccionada:",  this.fechaGarantiaSeleccionada);
      // Cierra el menú
      this.menuGarantia = false;
    },
   save3(dateCambio1) {
    //const fechaConvertida3 = new Date(dateCambio1).toISOString().substr(0, 10);
    const fechaConvertida3 = dateCambio1;
    this.itemEditado.FechaCompra = fechaConvertida3;
    console.log("Fecha seleccionada:", this.itemEditado.FechaCompra);

    // Cierra el menú de fecha
    this.menuForm = false;
    },
    save4(dateCambio) {
      const fechaConvertida4 = new Date(dateCambio).toISOString().substr(0, 10);
      this.itemEditado.FechaVencimientoGarantia = fechaConvertida4;
      //console.log("Fecha seleccionada:", this.itemEditado.FechaCompra);

      // Cierra el menú de fecha
      this.menuForm2 = false;
    },

/*  
onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createInput(files[0]); 
      this.archivoM = e.target.files[0];
    },
    createInput(file) {      
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
       // console.log(this.file.split('.').pop());
      });
      promise.then(
        result => {
          this.$swal({
                 icon: 'load',
                title: 'Cargando Archivo...',
                timer: 3000,
                timerProgressBar: true,
                confirmButtonText: '...',
                html:
                  '</em>',
                showCancelButton: false, // There won't be any cancel button
                showConfirmButton: false, // There won't be any confirm button 
                
              },
        ),

          this.filename = file.name;
          if(file.name.split('.').pop()=='csv' || file.name.split('.').pop()=='geojson'|| file.name.split('.').pop()=='CSV' || file.name.split('.').pop()=='GEOJSON' ){
            //console.log("Archivo Valido")
            if (file.name.split('.').pop()=='csv' || file.name.split('.').pop()=='CSV') {
              this.titulosArc = '';
              this.cabeceras = [];
              this.datos = [];
              //Validación de Campo CVE_GEO
              if (this.titulosArc = this.fileinput.slice(0,this.fileinput.indexOf('\n')).includes('CVE_GEO') == true) {
               //Funciona y recupera los titulos de un CSV
                this.titulosArc = this.fileinput.slice(0,this.fileinput.indexOf('\n'))
                this.cabeceras = this.titulosArc.split(',').map(x=> { return {text:x, value:x , sortable: true,}})
                  let data;
                  try {
                      data = Papa.parse(this.fileinput, {
                        header: true,
                          dynamicTyping: true,
                          delimiter: ",",
                          linebreak: "\n",
                      });
                     // console.log(data.data);
                      this.datos = data.data
                  } catch (err) {
                      console.log(err);
                  }

                  

              } else {
                this.$swal({
                    icon: 'error',
                    title: 'SIN CLAVE CVEGEO',
                    text: 'El archivo debe contener el Campo CVEGEO de lo contrario no se puede cargar la información ¡FAVOR DE CARGAR OTRO ARCHIVO!',
                    confirmButtonText: 'Entendido', 
                  });
                  this.file = '',
                this.fileinput = ''
                this.files = ''
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
              }


            } 
            else if (file.name.split('.').pop()=='geojson' || file.name.split('.').pop()=='GEOJSON'){
              this.titulosArc = '';
              this.cabeceras = [];
              this.datos = [];
              let prueba1 = JSON.parse(this.fileinput)
              var v1;
              for (var i = 0; i < 1; i++) {
                  v1 = JSON.stringify(prueba1.features[i].properties)
                  if (v1.includes('CVEGEO') == true) {
                    this.titulosArc = Object.keys(prueba1.features[i].properties).map(
                      function(key, index) {
                         return {text:key, value:key , sortable: true,}
                      },
                    );     
                    this.cabeceras = this.titulosArc
                   // console.log(this.cabeceras = this.titulosArc)      
                     //Lectura de Valores GEOJSON Y MUESTRA DE DATOS EN TABLA
                      for (var i = 0; i < prueba1.features.length; i++) {
                             // console.log(prueba1.features[i].properties)
                              this.datos.push(prueba1.features[i].properties)
                      }
                } else {
                  this.$swal({
                    icon: 'error',
                    title: 'SIN CLAVE CVEGEO',
                    text: 'El archivo debe contener el Campo CVEGEO de lo contrario no se puede cargar la información ¡FAVOR DE CARGAR OTRO ARCHIVO!',
                    confirmButtonText: 'Entendido', 
                  });
                  this.file = '',
                this.fileinput = ''
                this.files = ''
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
                }
            }
            }
          }else{
           // alert("Por favor ingrese un archivo con extencion 'csv' o 'geojson'")
            this.$swal({
                    icon: 'error',
                    title: 'ARCHIVO INCORRECTO',
                    text: 'Por favor ingrese un archivo con extencion csv o geojson',
                    confirmButtonText: 'Entendido', 
                  });
                this.file = '',
                this.fileinput = ''
                this.files = ''
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    
    onUpload(){
      //Variables de cargar
      
    if (this.autor!= null &&
      this.ftinfo!= null &&
      this.pr1!= null &&
      this.descripcion!= null &&
      this.nombreProyect!= null &&
      this.lvlgloce!= null &&
      this.perio != null &&
      this.ntdat != null &&
      this.nombreDataset!= null &&
      this.date != null
      ||
      this.autor!= '' &&
      this.ftinfo!= '' &&
      this.pr1!= '' &&
      this.descripcion!= '' &&
      this.nombreProyect!= '' &&
      this.lvlgloce!= '' &&
      this.perio != '' &&
      this.ntdat != '' &&
      this.nombreDataset!= '' &&
      this.date != ''
      ) {
        //BLOQUE DE CARGA EN STORAGE
      //console.log('archivos/'+this.archivoM.name)
      const storage = getStorage();
      const storageRef = ref(storage, 'archivos/' + this.archivoM.name);
      const metadata = {
        contentType: 'csv/geojson',
      };
      const uploadTask = uploadBytesResumable(storageRef, this.archivoM, metadata);
      uploadTask.on('state_changed',
        (snapshot) => {
       // console.log('Archivo Cargado');
         // alert('Proyecto Cargado en Sistema')
        },
        (error) => {
          console.log(error.message);
          alert('Error de Carga');
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //  console.log('Fase carga archivo completado')
          //  console.log('ARCHIVO DISPONIBLE EN: ', downloadURL);
            this.url = downloadURL;
          });
        }
      );
       
    } else {
      //alert('FAVOR DE LLENAR TODOS LOS CAMPOS SOLICITADOS')
      this.$swal({
                    icon: 'error',
                    title: 'CAMPOS INCOMPLETOS',
                    text: 'FAVOR DE LLENAR TODOS LOS CAMPOS SOLICITADOS',
                  });
    }

   

    },
*/

    onFileChange(e) {
  //    console.log(event.target.files);
   //   console.log(e.dataTransfer.files);

      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createInput(files[0]); 
      this.archivoM = e.target.files[0];
      console.log(this.archivoM);
    //  var files = e.target.files || e.dataTransfer.files;
     // if (!files.length) return;
     // this.createInput(files[0]); 
     // this.archivoM = e.target.files[0];
      // var files = event.target.files || e.dataTransfer.files;
      // console.log(JSON.stringify(event));
      // const file = event.target.files[1];
      // //const file = event.;
      // if (!file) {
      //   console.error("No se seleccionó ningún archivo.");
      //   return;
      // }

      // const reader = new FileReader();
      // reader.onload = () => {
      //   const csv = reader.result;
      //   const lines = csv.split('\n');
      //   const headers = lines[0].split(',');
      //   this.datosCSV = lines.slice(1).map(line => {
      //     const values = line.split(',');
      //     return headers.reduce((obj, header, index) => {
      //       obj[header.trim()] = values[index].trim();
      //       return obj;
      //     }, {});
      //   });
      // };
      // reader.readAsText(file);
    },

    createInput(file) {      
      let promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        var vm = this;
        reader.onload = e => {
          resolve((vm.fileinput = reader.result));
        };
        reader.readAsText(file);
       // console.log(this.file.split('.').pop());
      });
      promise.then(
        result => {
          this.$swal({
                 icon: 'load',
                title: 'Cargando Archivo...',
                timer: 1500,
                timerProgressBar: true,
                confirmButtonText: '...',
                html:
                  '</em>',
                showCancelButton: false, // There won't be any cancel button
                showConfirmButton: false, // There won't be any confirm button 
                
              },
        ),

          this.filename = file.name;
          if(file.name.split('.').pop()=='csv' ||  file.name.split('.').pop()=='CSV'){
            console.log("Archivo Valido")
            if (file.name.split('.').pop()=='csv' || file.name.split('.').pop()=='CSV') {
              this.titulosArc = '';
              this.cabeceras = [];
              this.datos = [];

                              
                // Mapear datos de los servicios para facilitar la búsqueda
                const areasMap = new Map(this.activeItemsAreas.map(area => [area.AreaDescripcion, area.AreaId]));
                const marcasMap = new Map(this.activeItems.map(marca => [marca.MarcaDescripcion, marca.MarcaId]));
                const equiposMap = new Map(this.activeItemsEquipos.map(equipo => [equipo.ClasificacionEquipoDescripcion, equipo.ClasificacionEquipoId]));
                console.log();
               //Funciona y recupera los titulos de un CSV
                this.titulosArc = this.fileinput.slice(0,this.fileinput.indexOf('\n'))
                this.cabeceras = this.titulosArc.split(',').map(x=> { return {text:x, value:x , sortable: true,}})
                let data;
                  try {
                      data = 
                      
                      // Papa.parse(this.fileinput, {
                      //   header: true,
                      //     dynamicTyping: true,
                      //     delimiter: ",",
                      //     linebreak: "\n",
                      // });



                      // Procesar el archivo CSV
                      Papa.parse(this.fileinput, {
                          header: true,
                          dynamicTyping: true,
                          delimiter: ",",
                          linebreak: "\n",
                          complete: function(results) {
                              // Sustituir valores de las columnas Marca, Equipo y Area
                              results.data.forEach(row => {
                                  // Sustituir valor de Marca
                                  if (row.Marca && marcasMap.has(row.Marca)) {
                                      row.Marca = marcasMap.get(row.Marca);
                                  }

                                  // Sustituir valor de Equipo
                                  if (row.Equipo && equiposMap.has(row.Equipo)) {
                                      row.Equipo = equiposMap.get(row.Equipo);
                                  }

                                  // Sustituir valor de Area
                                  if (row.Area && areasMap.has(row.Area)) {
                                      row.Area = areasMap.get(row.Area);
                                  }
                              });

                              // Aquí puedes usar los datos procesados como necesites
                             // console.log(results.data);
                          },
                          error: function(err) {
                              console.log(err);
                          }
                      });

                      console.log(data.data);
                      this.datos = data.data
                  } catch (err) {
                      console.log(err);
                  }
            } 
            
          }
          else{
           // alert("Por favor ingrese un archivo con extencion 'csv' o 'geojson'")
            this.$swal({
                    icon: 'error',
                    title: 'ARCHIVO INCORRECTO',
                    text: 'Por favor ingrese un archivo con extencion csv ',
                    confirmButtonText: 'Entendido', 
                  });
                this.file = '',
                this.fileinput = ''
                this.files = ''
                const input = this.$refs.fileupload;
                input.type = 'text';
                input.type = 'file';
          }
        },
        error => {
          console.log(error);
        }
      );
    },

  },
};
</script>
