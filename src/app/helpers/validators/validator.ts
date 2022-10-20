import { FormControl } from '@angular/forms';


export const noPuedeSerCadiz = ( control: FormControl ) => {
    const value = control.value?.trim().toLowerCase();

    if ( value === 'cadiz' || value === 'cádiz') {
      return {
        noCadiz: true
      }
    }
    return null;
}



//   noPuedeSerCadiz( control: FormControl ): any {
//     // console.log( control);
    
//     const value = control.value?.trim().toLowerCase();

//     if ( value === 'cadiz' || value === 'cádiz') {
//       return {
//         noCadiz: true
//       }
//     }
//     return null;

//   }