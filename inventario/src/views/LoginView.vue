<template>
    <v-container>
     <v-row align="center" justify="center" class="mt-15">
        <!--Elementos Visuales de logos-->
       <v-col cols="6">

        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-img class="mr-15" src="../assets/orfis.png" height="auto" width="auto"></v-img>
            </v-col>

            <v-col cols="auto">
                <h2 class="mt-10">
                    Órgano de Fiscalización Superior del Estado de Veracruz  
                 </h2>
            </v-col>

            <v-col cols="auto">
                <h4>
                    Dirección General del Centro de Información para la Fiscalización Superior
                 </h4>
            </v-col>

        </v-row>

         

       </v-col>
       <!--Elemnentos de Inicio de sesion-->
       <v-col cols="6">
         <v-row align="center" justify="center" class="ml-8">
           
            <v-col cols="10">
                <v-text-field
                    v-model="correo"
                    :rules="[rules.required, rules.email]"
                    label="Ingrese Correo"
                    hint="Correo@orfis.gob.mx"
                ></v-text-field>
            </v-col>

            <v-col cols="10">
                <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi mdi-eye-outline' : 'mdi-eye-off-outline'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Ingrese Contraseña"
                counter
                @click:append="show1 = !show1"
            ></v-text-field>
            </v-col>

         
            <v-btn color="success">Iniciar Sesión</v-btn>
            <v-col cols="auto">

            </v-col>



         </v-row>
       </v-col>
     </v-row>
     <v-row align="center" justify="start">
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <p class="ml-8">
            Versión 0.01 - Ultima Actualización: 06/Febrero/2024
        </p>
     </v-row>
     
    </v-container>
   </template>
   
   <script>
   
   export default {
     data: () => ({

        //Datos para inicio de sesion
        correo: '',
        password: '',
        show1: false,
        rules: {
            min: v => v.length >= 8 || 'Min 8 characteres',
          emailMatch: () => ('El correo y la contraseña ingresados no coinciden'),
          required: value => !!value || 'Campo Requerido.',
          counter: value => value.length <= 30 || 'Max 30 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Correo Invalidado .'
          }
        }
       }),
   };
   </script>