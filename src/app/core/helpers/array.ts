export function arrayRemoveByAttr(arr: Array<any>, attr: any, value: any): Array<any> {
  let i = arr.length;
  while (i--) {
     if ( arr[i]
         && arr[i].hasOwnProperty(attr)
         && (arguments.length > 2 && arr[i][attr] === value ) ) {

         arr.splice(i, 1);

     }
  }
  return arr;
}

